import { start, stop } from '@/app';
import { logger } from '@/utils/logger';

start().catch((err) => {
	logger.error(err);
	process.exit(1);
});

process.on('SIGTERM', () => {
	stop()
		.then(() => {
			logger.info('Application stopped');
		})
		.catch((err) => {
			logger.error('Error stopping application', err);
			process.exit(1);
		});
});
