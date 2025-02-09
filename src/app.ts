import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import setupSecurity from './middlewares/security';
import itemRoutes from './routes/item.routes';
import authRoutes from './routes/auth.routes';
import passport from 'passport';
import './config/passport';
import AppConfig from './config/app.config';
import { AppError } from './utils/appError';
import globalErrorHandler from './controllers/error.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';

const app = express();

if (AppConfig.NODE_ENV == 'production') {
  app.set('trust proxy', true);
}

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
