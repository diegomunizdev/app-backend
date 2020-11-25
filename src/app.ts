import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Routes from './routes/routes';
import { HttpStatus } from './middlewares/http.status';

const app: Application = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
});

// routes
app.use('/gym', Routes);


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Página não encontrada!'
    })
})


export default app;