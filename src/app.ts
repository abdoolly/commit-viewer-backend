require('dotenv').config();
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import indexRouter from './modules/git-caller/git-caller.api';
import { handleAxiosError } from './modules/git-caller/git-caller.service';
require('express-async-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/**
 * @description health check router
 */
app.get('/health', (req, res) => res.status(200).send('Server is running'));
app.use('/', indexRouter);

/**
 * @description express error handler
 * using the library 'express-async-errors' all async function
 * throwing errors will automatically come here
 * in which they are treated according to their specific cases
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.isAxiosError) {
        let { status, message } = handleAxiosError(err);
        return res.status(status).json({ message: message });
    }

    res.status(err.status || 500).json({ message: err.message });
    return next(err);
});

export default app;
