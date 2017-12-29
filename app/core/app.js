import express from 'express';
import { PORT } from './global';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '../routes/router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => console.log(`Run in port: ${PORT}`));

export default app;