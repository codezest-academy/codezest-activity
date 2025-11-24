import Redis from "ioredis";
import { config } from "../../config";
import { logger } from "../../common/logger";
import { ActivityService } from "../../application/services/activity.service";
import { ActivityType } from "../../domain/entities/user-activity.entity";

export class RedisConsumer {
  private redis: Redis;
  private activityService: ActivityService;

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
    this.redis = new Redis(config.redis.url || "redis://localhost:6379");

    this.redis.on("connect", () => {
      logger.info("✅ Redis Consumer connected");
    });

    this.redis.on("error", (err) => {
      logger.error("❌ Redis Consumer error", err);
    });
  }

  async subscribe(channels: string[]) {
    await this.redis.subscribe(...channels);
    logger.info(`✅ Subscribed to channels: ${channels.join(", ")}`);

    this.redis.on("message", async (channel, message) => {
      try {
        const event = JSON.parse(message);
        logger.info(`📥 Received event on ${channel}:`, event);
        await this.handleEvent(channel, event);
      } catch (error) {
        logger.error(`❌ Error processing message on ${channel}`, error);
      }
    });
  }

  private async handleEvent(channel: string, event: any) {
    // Map events to activities
    // This is a simplified mapping. In a real app, you might have a dedicated mapper.
    let type: ActivityType | null = null;
    let description = "";

    switch (channel) {
      case "UserCreated":
        type = ActivityType.USER_JOINED;
        description = "User joined the platform";
        break;
      case "CourseStarted":
        type = ActivityType.COURSE_STARTED;
        description = `Started course: ${event.courseName}`;
        break;
      case "AssignmentSubmitted":
        type = ActivityType.ASSIGNMENT_SUBMITTED;
        description = `Submitted assignment: ${event.assignmentTitle}`;
        break;
      // Add more cases as needed
    }

    if (type && event.userId) {
      await this.activityService.recordActivity(
        event.userId,
        type,
        description,
        event
      );
    }
  }
}
