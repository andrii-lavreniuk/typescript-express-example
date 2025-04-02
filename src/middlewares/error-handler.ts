import type express from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '@/utils/app-error';

export const errorMiddleware = (
	err: unknown,
	_req: express.Request,
	res: express.Response,
	_next: express.NextFunction
) => {
	let appError = new AppError('Internal server error');

	if (err instanceof AppError) {
		appError = err;
	} else if (err instanceof Error) {
		appError.message = err.message;
	} else if (typeof err === 'object' && err != null) {
		if ('message' in err && typeof err.message === 'string') {
			appError.message = err.message;
		}
	}

	res.status(appError.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: appError.message,
		details: appError.details
	});
};
