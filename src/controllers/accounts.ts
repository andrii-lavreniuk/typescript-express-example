import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import accounts from '@/services/accounts';

const createAccount = async (req: Request, res: Response) => {
	const account = await accounts.createAccount(req.body);

	res.status(StatusCodes.CREATED).json(account);
};

const updateAccount = async (req: Request, res: Response) => {
	const account = await accounts.updateAccount(req.params.accountId, req.body);

	res.json(account);
};

const getAccountsStats = async (req: Request, res: Response) => {
	const stats = await accounts.getAccountsStats();

	res.json(stats);
};

export default {
	createAccount,
	updateAccount,
	getAccountsStats
};
