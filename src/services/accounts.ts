import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { accounts } from '@/db';
import {
	AccountDTO,
	accountDTOSchema,
	AccountsStatsDTO,
	CreateAccountDTO,
	UpdateAccountDTO
} from '@/dto/account';
import {
	accountScope,
	createAccountEntitySchema,
	updateAccountEntitySchema
} from '@/entities/account';
import { AppError } from '@/utils/app-error';

const createAccount = async (data: CreateAccountDTO): Promise<AccountDTO> => {
	const parsedData = createAccountEntitySchema.safeParse({
		...data,
		createdAt: new Date()
	});

	if (!parsedData.success) {
		throw new AppError('Invalid account data')
			.withStatus(StatusCodes.BAD_REQUEST)
			.withZodError(parsedData.error);
	}

	const result = await accounts().insertOne({
		...parsedData.data,
		_id: new ObjectId()
	});

	return {
		id: result.insertedId.toString(),
		...parsedData.data
	};
};

const updateAccount = async (id: string, data: UpdateAccountDTO): Promise<AccountDTO> => {
	if (!ObjectId.isValid(id)) {
		throw new AppError('Invalid account id').withStatus(StatusCodes.BAD_REQUEST);
	}

	const accountId = ObjectId.createFromHexString(id);
	const parsedData = updateAccountEntitySchema.safeParse({
		...data,
		updatedAt: new Date()
	});

	if (!parsedData.success) {
		throw new AppError('Invalid account data')
			.withStatus(StatusCodes.BAD_REQUEST)
			.withZodError(parsedData.error);
	}

	const result = await accounts().findOneAndUpdate(
		{ _id: accountId },
		{ $set: parsedData.data },
		{ returnDocument: 'after', projection: { _id: 0 } }
	);

	if (!result) {
		throw new AppError('Account not found').withStatus(StatusCodes.NOT_FOUND);
	}

	return {
		id,
		...result
	};
};

const getAccountsStats = async (): Promise<AccountsStatsDTO> => {
	const result = await accounts()
		.aggregate<{ _id: z.infer<typeof accountScope>; count: number }>([
			{
				$group: {
					_id: '$scope',
					count: { $sum: 1 }
				}
			},
			{
				$sort: {
					_id: 1
				}
			}
		])
		.toArray();

	const stats = result.reduce((acc: AccountsStatsDTO, item) => {
		acc[item._id] = item.count;
		return acc;
	}, {});

	return stats;
};

export default {
	createAccount,
	updateAccount,
	getAccountsStats
};
