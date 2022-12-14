import request from 'supertest';
import app from './app.js';

jest.setTimeout(10000);

describe('POST/neoInfo', () => {
  describe('given startDate endDate and Within Units', () => {
    // should respond with 200 status
    test('Should respond with a 200 status code', async () => {
      const response =await request(app)
        .post('/neoInfo')
        .send({
          dateStart: '2015-12-27',
          dateEnd: '2021-12-28',
          within: {
            value: 32000000,
            units: 'kilometers',
          },
        });
        expect(response.statusCode).toBe(200);
    });
    // should specify json in content type
    test("Should declare content/type in JSON object", async () =>{
        const response =await request(app)
        .post('/neoInfo')
        .send({
          dateStart: '2015-12-27',
          dateEnd: '2021-12-28',
          within: {
            value: 32000000,
            units: 'kilometers',
          },
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

    test('Should respond with a 400 status code when wrong JSON is sent', async () => {
        const response =await request(app)
          .post('/neoInfo')
          .send({
            dateEnd: '2021-12-28',
            within: {
              value: 32000000,
              units: 'kilometers',
            },
          });
          expect(response.statusCode).toBe(400);
      });

      test('Should respond with a 404 status code when wrong route is used', async () => {
        const response =await request(app)
          .post('/neoInfoh')
          .send({
            dateEnd: '2021-12-28',
            within: {
              value: 32000000,
              units: 'kilometers',
            },
          });
          expect(response.statusCode).toBe(404);
      });
      
  });

});


