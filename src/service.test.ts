import {
    filterData,
    checkInputRequest,
  } from './service/getInfoService';
  import request from 'supertest';



  describe('NeoService', () => {
    it('Returns Invalid Time when non ISO time stamp is sent', () => {
        const inpRequest =  checkInputRequest(
            {
                dateStart: '04-02-1988',
                dateEnd: '2021-18-28',
                within: {
                  value: 32000000,
                  units: 'kilometers',
                },
              }
        )
        expect(inpRequest['error']).toEqual('Invalid Time');
    });


    
});