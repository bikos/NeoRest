import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';
import { refreshFunction } from './service/getInfoService';

const app = express();

app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //
app.use('/neoInfo', routes.neoInfo);

// * Start * //

//### START POLLING DATA###//
refreshFunction();

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
