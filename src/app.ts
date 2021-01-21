import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import * as swaggerDocument from './swagger.json'
import Routes from './routes/routes';
import { HttpStatus } from './middlewares/http.status';

const app: Application = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet())
app.use('/gym/user/avatar', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
});

// Swagger API
app.use('/gym/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/gym', Routes);


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Page not found',
        description: 'Check that a URL has been entered correctly'
    })
})


export default app;