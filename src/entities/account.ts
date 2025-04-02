import z from 'zod';
import { baseEntitySchema } from './base';

export const accountScope = z.enum(['account', 'prospect', 'child']);

export const accountEntitySchema = baseEntitySchema.extend({
	name: z.string(),
	scope: accountScope
});

export const createAccountEntitySchema = accountEntitySchema.pick({
	name: true,
	scope: true,
	createdAt: true
});

export const updateAccountEntitySchema = accountEntitySchema.pick({
	name: true,
	scope: true,
	updatedAt: true
});
