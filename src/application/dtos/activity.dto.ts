import { ActivityType } from "../../domain/entities/user-activity.entity";

export class ActivityDto {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  metadata: Record<string, any> | null;
  createdAt: string;

  constructor(
    id: string,
    userId: string,
    type: ActivityType,
    description: string,
    metadata: Record<string, any> | null,
    createdAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.description = description;
    this.metadata = metadata;
    this.createdAt = createdAt.toISOString();
  }
}
