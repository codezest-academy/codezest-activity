import { UserActivity } from "../entities/user-activity.entity";

export interface ActivityRepositoryInterface {
  create(activity: UserActivity): Promise<UserActivity>;
  findByUserId(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<UserActivity[]>;
  findAll(limit?: number, offset?: number): Promise<UserActivity[]>;
}
