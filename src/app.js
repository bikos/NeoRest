import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import { refreshFunction } from './service/getInfoService';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //
app.use('/neoInfo', routes.neoInfo);

// * Default option for other routes * //
app.use(function (req, res, next) {
  res.status(404);
  res.json({
    status: 404,
    title: 'Not Found',
    msg: 'Route not found',
  });
  next();
});

//### START POLLING DATA###//
refreshFunction();

export default app;
