import { Router } from 'express';
import {
  getData,
  checkInputRequest,
} from '../service/getInfoService';

const router = Router();

router.post('/', async (req, res) => {
  const validity = checkInputRequest(req.body);
  const requestData = await getData(req.body);
  if (!validity.valid) {
    // we know the request sanitization failed, let's send back what exactly failed
    return res.status(400).send(validity.error);
  } else {
    // moving ahead with fetched data
    console.log('returning success data');
    return res.status(200).send(requestData);
  }
});

export default router;
