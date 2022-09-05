# REST API to Fetch Near Earth Objects 

## Requirements

- [node & npm](https://nodejs.org/en/)
- [git](https://www.robinwieruch.de/git-essential-commands/)
- API Key from https://api.nasa.gov/
- Update your key to .env file (if using just DEMO key make sure you follow NASA's API requirement)
- Get VS Code REST Client extension from https://marketplace.visualstudio.com/items?itemName=humao.rest-client


## Installation
- `git clone https://github.com/bikos/NeoRest.git`
- `cd NeoRest`
- `npm install`
- `npm start`
-  optional: include _.env_ in your _.gitignore_

Default key is Demo Key and it works. If you have API Key from NASA replace the default key in .env file.

For Unit Test
- `npm test`


## Testing Post Request

```
POST /neoInfo
Content-Type: application/json
{
  "dateStart": <START_ISO_DATE>,
  "dateEnd": <END_ISO_DATE>,
  "within": {
  "value": <DISTANCE>,
  "units": <UNIT> 
  }
}
```
| Parameter       | Type     | Required?  | Description  |
| -------------   |----------|------------|--------------|
| `START_ISO_DATE`      | string   | required   |Start Date in ISO Format ( YYYY-MM-DD)|
| `END_ISO_DATE`      | string   | required   | End Date in ISO Format (YYYY-MM-DD) |
| `DISTANCE`      | number   | required   | Distance from Earth in which NEO might be found|
| `UNIT`          | string   | required   | SI unit of distance, use `kilometers` |


```
A template for making POST request is included in the project.

- In Vscode install REST Client
- Open the test.http file inside the src folder
- Click on 'Send Request'
- See the response in adjacent screen.
```


Response of a successful request

```
{
  "asteroids": [
    {
      "name": "433 Eros (A898 PA)",
      "date": "2012-01-31",
      "distance": 26729521.135077033
    },
    {
      "name": "433 Eros (A898 PA)",
      "date": "2019-01-15",
      "distance": 31205919.274956476
    },
    {
      "name": "1566 Icarus (1949 MA)",
      "date": "2015-06-16",
      "distance": 8053781.761441007
    }]
 }   
 ```

| Parameter       | Type     | Description  |
| -------------   |----------|--------------|
| `asteroids`          | list     | List of asteroids  |
| `name`         | string   | Name of the asteroid |
| `date`       | string   | ISO date the object was closest to earth |
| `distance`        | number   | Distance between the asteroid and earth in Kilometers |




Please note the format of the JSON object and the header being sent as follows:

<img width="1308" alt="Screen Shot 2022-09-05 at 11 10 24 AM" src="https://user-images.githubusercontent.com/4242921/188487991-c9c68fe7-3e15-4b25-a57b-dde1244496d7.png">

