import { Db, MongoClient } from 'mongodb';
import z from 'zod';
import { accountEntitySchema } from '@/entities/account';
import { logger } from '@/utils/logger';

let client: MongoClient;
let db: Db;

export const connectToDatabase = async (uri: string, dbName: string) => {
	if (client) {
		return;
	}

	client = new MongoClient(uri);
	await client.connect();

	db = client.db(dbName);

	logger.info('Connected to MongoDB');
};

export const closeDatabaseConnection = async () => {
	if (!client) {
		return;
	}

	await client.close();

	console.log('MongoDB connection closed');
};

export const accounts = () => {
	if (!db) {
		throw new Error('MongoDB not connected');
	}

	return client.db().collection<z.infer<typeof accountEntitySchema>>('accounts');
};
