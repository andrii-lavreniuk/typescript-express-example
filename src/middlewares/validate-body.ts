import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'zod';
import { AppError } from '@/utils/app-error';

export const validateBodyMiddleware = (schema: Schema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			return next(
				new AppError('Invalid request body')
					.withStatus(StatusCodes.BAD_REQUEST)
					.withZodError(result.error)
			);
		}

		req.body = result.data;

		next();
	};
};
