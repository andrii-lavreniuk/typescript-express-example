import { Server } from 'http';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {
	CORS_CREDENTIALS,
	CORS_ORIGIN,
	LOG_FORMAT,
	MONGO_CONNECTION_URL,
	MONGO_DB_NAME,
	PORT
} from '@/config';
import { closeDatabaseConnection, connectToDatabase } from '@/db';
import { errorMiddleware, notFoundMiddleware } from '@/middlewares';
import { apiV1 } from '@/routes';
import { logger, stream } from '@/utils/logger';

let server: Server;

export const start = async () => {
	const app = express();

	app.use(morgan(LOG_FORMAT, { stream }));
	app.use(cors({ origin: CORS_ORIGIN, credentials: CORS_CREDENTIALS === 'true' }));
	app.use(hpp());
	app.use(helmet());
	app.use(compression());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(apiV1());

	app.use(notFoundMiddleware);
	app.use(errorMiddleware);

	await connectToDatabase(MONGO_CONNECTION_URL, MONGO_DB_NAME);

	return new Promise<void>((resolve, reject) => {
		server = app.listen(PORT, (err?: Error) => {
			if (err) {
				return reject(err);
			}

			logger.info(`Server is running on http://localhost:${PORT}`);

			resolve();
		});
	});
};

export const stop = async () => {
	await new Promise<void>((resolve, reject) => {
		if (!server) {
			return reject(new Error('Server is not running'));
		}

		server.close((err) => {
			if (err) {
				return reject(err);
			}

			logger.info('Server closed');

			resolve();
		});
	});

	await closeDatabaseConnection();
};
