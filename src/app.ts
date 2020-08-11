import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app: Application = express();

import authRoutes from './routes/auth';

// settings
app.set('port', process.env.PORT ? process.env.PORT : '');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    // Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    // Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,PATCH,POST,DELETE');
    app.use(cors());
    next();
});


// routes
app.use('/api/auth', authRoutes);


export default app;