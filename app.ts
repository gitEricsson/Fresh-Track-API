import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import setupSecurity from './src/middlewares/security';
import itemRoutes from './src/routes/item.routes';
import authRoutes from './src/routes/auth.routes';
import passport from 'passport';
import './src/config/passport';
import dotenv from 'dotenv';
import AppConfig from './src/config/app.config';
import { AppError } from './src/utils/appError';
import globalErrorHandler from './src/controllers/error.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.config';

// Load environment variables
dotenv.config();

const app = express();
const PORT = AppConfig.server.port || 3000;

// Middlewares
app.use(bodyParser.json());
setupSecurity(app);

// Initialize passport
app.use(passport.initialize());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));
});

app.use(globalErrorHandler);

export default app;