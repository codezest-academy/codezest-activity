export enum ActivityType {
  COURSE_STARTED = "COURSE_STARTED",
  MODULE_COMPLETED = "MODULE_COMPLETED",
  ASSIGNMENT_SUBMITTED = "ASSIGNMENT_SUBMITTED",
  QUIZ_COMPLETED = "QUIZ_COMPLETED",
  BADGE_EARNED = "BADGE_EARNED",
  USER_JOINED = "USER_JOINED",
}

export class UserActivity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: ActivityType,
    public readonly description: string,
    public readonly metadata: Record<string, any> | null,
    public readonly createdAt: Date
  ) {}
}
