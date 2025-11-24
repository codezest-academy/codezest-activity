import { prisma } from '@codezest-academy/db';
import { logger } from '../../common/logger';

// The shared library exports a singleton 'prisma' instance.
// We can wrap it or use it directly. For consistency with our previous architecture,
// we'll export a connection helper.

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ Database connected successfully (via @codezest-academy/db)');
  } catch (error) {
    logger.error('❌ Database connection failed', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma };
