import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
	PORT = '3000',
	MONGO_CONNECTION_URL = 'mongodb://localhost:27017',
	MONGO_DB_NAME = 'testdb',
	LOG_FORMAT = ':status - :method :url',
	CORS_ORIGIN = 'http://localhost:3000',
	CORS_CREDENTIALS = 'true'
} = process.env;
