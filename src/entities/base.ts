import { ObjectId } from 'mongodb';
import z from 'zod';

export const baseEntitySchema = z.object({
	_id: z.instanceof(ObjectId),
	createdAt: z.date(),
	updatedAt: z.date().optional()
});
