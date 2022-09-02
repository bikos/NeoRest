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
- optional: include _.env_ in your _.gitignore_

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


Please note the format of the JSON object and the header being sent as follows:

<img width="1103" alt="Screen Shot 2022-09-01 at 10 43 05 PM" src="https://user-images.githubusercontent.com/4242921/188055926-0fda50c2-530c-48f2-9d17-2c71c59ca72a.png">

