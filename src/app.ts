import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app: Application = express();

import Routes from './routes/routes';

// settings
app.set('port', process.env.PORT ? process.env.PORT : '');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    // Which site is allowed to connect, in the example below the "*" indicates that any site can connect
    res.header("Access-Control-Allow-Origin", "*");
    // What methods can the connection perform in the API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,PATCH,POST,DELETE');
    app.use(cors());
    next();
});

// routes
app.use('/app', Routes);


export default app;