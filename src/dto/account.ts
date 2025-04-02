import z from 'zod';
import { accountEntitySchema, accountScope } from '@/entities/account';

export const accountDTOSchema = accountEntitySchema
	.omit({
		_id: true
	})
	.extend({
		id: z.string()
	});

export const createAccountDTOSchema = accountDTOSchema.pick({
	name: true,
	scope: true
});

export const updateAccountDTOSchema = accountDTOSchema.pick({
	name: true,
	scope: true
});

export const accountsStatsDTOSchema = z.record(accountScope, z.number());

export type AccountDTO = z.infer<typeof accountDTOSchema>;
export type CreateAccountDTO = z.infer<typeof createAccountDTOSchema>;
export type UpdateAccountDTO = z.infer<typeof updateAccountDTOSchema>;
export type AccountsStatsDTO = z.infer<typeof accountsStatsDTOSchema>;
