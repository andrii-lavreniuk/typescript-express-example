import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export class AppError extends Error {
	status: number;
	message: string;
	details: unknown[];

	constructor(message: string) {
		super(message);
		this.status = StatusCodes.INTERNAL_SERVER_ERROR;
		this.message = message;
		this.details = [];
	}

	withStatus(status: number): AppError {
		this.status = status;
		return this;
	}

	withError(error: string | Error): AppError {
		this.details.push(error);
		return this;
	}

	withZodError(error: z.ZodError): AppError {
		error.errors.forEach((err) => {
			this.details.push({
				code: err.code,
				message: err.message,
				path: err.path.join('.')
			});
		});
		return this;
	}
}

// import { z } from 'zod';

// export const appErrorSchema = z.object({
// 	status: z.number(),
// 	message: z.string(),
// 	details: z.array(z.record(z.unknown())).optional()
// });

// export type AppError = z.infer<typeof appErrorSchema>;

// export const newAppError = (
// 	status: number,
// 	message: string,
// 	details: Record<string, unknown>[] = []
// ): AppError => {
// 	return {
// 		status,
// 		message,
// 		details
// 	};
// };
