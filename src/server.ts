import app from './app';
import { config } from './config';
import { logger } from './common/logger';
import { connectDB } from './infrastructure/database/prisma.service';

import { PrismaActivityRepository } from './infrastructure/repositories/prisma-activity.repository';
import { ActivityService } from './application/services/activity.service';
import { RedisConsumer } from './infrastructure/events/redis-consumer';

const startServer = async () => {
  try {
    await connectDB();

    // Initialize services for Redis Consumer
    const activityRepository = new PrismaActivityRepository();
    const activityService = new ActivityService(activityRepository);
    const redisConsumer = new RedisConsumer(activityService);

    // Subscribe to events
    await redisConsumer.subscribe([
      'UserCreated',
      'CourseStarted',
      'AssignmentSubmitted',
      'QuizCompleted',
      'BadgeEarned',
    ]);

    app.listen(config.port, () => {
      logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
      `);
    });
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

startServer();
