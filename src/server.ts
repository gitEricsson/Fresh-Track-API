import dotenv from 'dotenv';
import mongoose from 'mongoose';

process.on('uncaughtException', (err: Error): void => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.error(err.stack);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
import app from './app';
import AppConfig from './config/app.config';

const DB: string = AppConfig.db.uri.replace(
    '<PASSWORD>',
    AppConfig.db.options.pass
);

mongoose
    .connect(DB)
    .then(() => {
        console.log('DB connection successful!');
    })
    .catch((err: Error) => {
        console.error('DB connection error:', err);
    });

const port: string | number = AppConfig.server.port || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error): void => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});