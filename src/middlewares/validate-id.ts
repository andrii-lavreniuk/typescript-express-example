import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { AppError } from '@/utils/app-error';

export const validateIdMiddleware = (ids: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		for (const id of ids) {
			const idParam = req.params[id];

			if (!idParam) {
				return next(
					new AppError(`Missing path parameter ${id}`).withStatus(StatusCodes.BAD_REQUEST)
				);
			}

			if (!ObjectId.isValid(idParam)) {
				return next(
					new AppError(`Invalid id format for parameter '${id}'`).withStatus(
						StatusCodes.BAD_REQUEST
					)
				);
			}
		}

		next();
	};
};
