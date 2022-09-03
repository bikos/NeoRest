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

// * Start * //

//### START POLLING DATA###//
refreshFunction();

export default app;

