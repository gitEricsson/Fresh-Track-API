import { configDotenv } from 'dotenv';

if (process.env.NODE_ENV !== 'production') configDotenv();

const AppConfig = {
  NODE_ENV: process.env.NODE_ENV,
  server: {
    port: process.env.PORT || '3000',
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/money_transfer',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.MONGODB_USER || '',
      pass: process.env.MONGODB_PASSWORD || '',
    },
  },
  jwt: {
    ACCESS_TOKEN_SECRET: String(process.env.JWT_ACCESS_SECRET || 'your-secret-key'),
    ACCESS_TOKEN_EXPIRY: String(process.env.JWT_ACCESS_EXPIRES_IN || '1h'),
    REFRESH_TOKEN_SECRET: String(
      process.env.JWT_REFRESH_SECRET || 'refresh-secret-key'
    ),
    REFRESH_TOKEN_EXPIRY: String(process.env.JWT_REFRESH_EXPIRES_IN || '7d'),
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  brevo: {
    username: process.env.BREVO_USERNAME || '',
    password: process.env.BREVO_PASSWORD || '',
  },
};

export default AppConfig;