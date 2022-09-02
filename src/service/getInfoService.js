import axios from 'axios';
import { interval } from 'rxjs';
import { DateTime } from 'luxon';
import * as _ from 'lodash';

const dataSource = {
  data: [],
};

/**
 * Function that maintains the data from NASA API in the service
 *
 * @returns Promise
 */
const refreshFunction = () => {
  return new Promise(async (resolve, reject) => {
    if (dataSource.data.length) {
      resolve(dataSource.data);
    } else {
      await fetchInfo();
      resolve(dataSource.data);
      // now let's put observable to work to fetch data by HEART_BEAT
      // as per NASA's API documentation we cannot send request more than 1,000
      // requests per HOUR
      const hb =
        process.env.HEART_BEAT > 10000
          ? process.env.HEART_BEAT
          : 10000;
      interval(hb).subscribe((count) => {
        fetchInfo(count);
      });
    }
  });
};

/**
 * Function to fetch data from the API
 * @param {*} count Number of times the observer ran request
 */
async function fetchInfo(count) {
  try {
    console.log(count ? 'data set fetched ' + count : '');
    let result = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${process.env.API_KEY}`,
    );
    dataSource.data = result.data.near_earth_objects;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Public method to get Neo data
 * @param {*} fObj Filter parameters as Date, Distance and Unit
 * @returns Array of NEO names, as per filter provided
 */
async function getData(fObj) {
  if (checkInputRequest(fObj).valid) {
    // make sure that data is present with one fetchCall
    await refreshFunction();
    // we have copy of NEO data and our filters are valid, let's pull data according
    // to the filters
    const filteredData = filterData(fObj);
    return filteredData;
  }
  {
    return checkInputRequest(fObj);
  }
}

/**
 * Function that filters the NEO data against the Filter parameter and returns
 * the array of NEO names.
 * @param {*} fObj Filter parameters as Date, Distance and Unit
 * @returns Object contaning the array of NEO names
 */
function filterData(fObj) {
  // filter by date range.
  const tempData = _.cloneDeep(dataSource.data);
  const startTime = DateTime.fromISO(fObj.dateStart);
  const endTime = DateTime.fromISO(fObj.dateEnd);
  const distance = fObj.within.value;
  const returnObj = {
    asterioids: [],
  };

  // check each NEO's close_approach_data
  // Iterating through the available NEO's firt.
  _.each(tempData, (NEO) => {
    _.each(NEO.close_approach_data, (closeApp) => {
      // Now iterating through close_approach_data to see if the distance was closer in certain days
      const astTime = DateTime.fromISO(closeApp.close_approach_date);
      if (astTime >= startTime && astTime <= endTime) {
        // okay, we got the NEO in the time range
        // does it fullfill the distance requirement?
        if (+closeApp.miss_distance.kilometers <= distance) {
          returnObj.asterioids.push(NEO.name);
        }
      }
    });
  });

  return returnObj;
}

/**
 * Public method to verify if the request coming in is valid
 * @param {*} fObj Filter parameters as Date, Distance and Unit
 * @returns  Object containing valid (validity of request) flag and error message,if any
 */
function checkInputRequest(fObj) {
  // check valid date and vald time range.
  let returnObj = {
    valid: true,
    error: null,
  };
  const startTime = DateTime.fromISO(fObj.dateStart);
  const endTime = DateTime.fromISO(fObj.dateEnd);

  // 1. If is invalid date
  if (!(startTime.isValid && endTime.isValid)) {
    returnObj.valid = false;
    returnObj.error = 'Invalid Time';
  }

  // 2. if start time is greater than end time
  if (startTime > endTime) {
    // invalid time send
    returnObj.valid = false;
    returnObj.error = 'Invalid Time';
  }

  // check if additional distance parameters are coming
  if (fObj.within?.value) {
    // is the distance a number?
    const distance = fObj.within.value;
    if (isNaN(distance)) {
      returnObj.valid = false;
      returnObj.error = 'Invalid Distance';
    }
    const defaultUnit = 'kilometers';
    if (fObj.within.units !== defaultUnit) {
      returnObj.valid = false;
      returnObj.error = 'Invalid Units';
    }
  } else {
    returnObj.valid = false;
    returnObj.error = 'Invalid Distance';
  }
  return returnObj;
}

export { getData, checkInputRequest, refreshFunction };
