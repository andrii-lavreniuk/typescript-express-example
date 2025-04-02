import { Router } from 'express';
import accounts from '@/controllers/accounts';
import { createAccountDTOSchema, updateAccountDTOSchema } from '@/dto/account';
import { validateBodyMiddleware, validateIdMiddleware } from '@/middlewares';

export const apiV1 = () => {
	const v1 = Router();
	const router = Router();

	v1.use('/api/v1', router);

	router.post('/accounts', validateBodyMiddleware(createAccountDTOSchema), accounts.createAccount);

	router.put(
		'/accounts/:accountId',
		validateIdMiddleware(['accountId']),
		validateBodyMiddleware(updateAccountDTOSchema),
		accounts.updateAccount
	);

	router.get('/accounts/stats', accounts.getAccountsStats);

	return v1;
};
