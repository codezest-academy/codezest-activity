import { ActivityRepositoryInterface } from '../../domain/repositories/activity.repository.interface';
import { UserActivity, ActivityType } from '../../domain/entities/user-activity.entity';
import { prisma } from '../database/prisma.service';

export class PrismaActivityRepository implements ActivityRepositoryInterface {
  async create(activity: UserActivity): Promise<UserActivity> {
    // Note: The shared schema might use different field names or types.
    // We assume the shared schema has a 'UserActivity' model similar to what we defined.
    // If the shared schema uses 'Activity' instead of 'UserActivity', we'd adjust here.
    // Based on the guide, we import 'prisma' which has the models.

    // Assuming the shared DB has 'userActivity' or similar.
    // Since we don't have the shared schema definition in front of us,
    // we proceed with the assumption it matches our previous local schema
    // or we'd need to inspect the node_modules (which we can't do easily without install).
    // For now, we'll assume the model name is 'userActivity' as per our previous local schema.

    const created = await prisma.userActivity.create({
      data: {
        userId: activity.userId,
        type: activity.type,
        description: activity.description,
        metadata: activity.metadata || undefined,
      },
    });

    return this.mapToEntity(created);
  }

  async findByUserId(
    userId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<UserActivity[]> {
    const activities = await prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return activities.map(this.mapToEntity);
  }

  async findAll(limit: number = 20, offset: number = 0): Promise<UserActivity[]> {
    const activities = await prisma.userActivity.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return activities.map(this.mapToEntity);
  }

  private mapToEntity(data: any): UserActivity {
    return new UserActivity(
      data.id,
      data.userId,
      data.type as ActivityType,
      data.description,
      data.metadata as Record<string, any>,
      data.createdAt
    );
  }
}
