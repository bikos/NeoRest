import { Router } from 'express';
import {
  getData,
  checkInputRequest,
} from '../service/getInfoService';

const router = Router();

router.post('/', async (req, res) => {
  console.log('validity verification');
  const validity = checkInputRequest(req.body);
  console.log('data extraction');
  const requestData = await getData(req.body);
  if (!validity.valid) {
    // we know the request sanitization failed, let's send back what exactly failed
    return res.send(validity.error);
  } else {
    // moving ahead with fetched data
    console.log('returning data');
    return res.send(requestData);
  }
});

export default router;
