import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '@/utils/app-error';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
	next(new AppError('Not Found').withStatus(StatusCodes.NOT_FOUND));
};
