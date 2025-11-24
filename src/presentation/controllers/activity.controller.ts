import { Request, Response } from "express";
import { ActivityService } from "../../application/services/activity.service";

export class ActivityController {
  constructor(private activityService: ActivityService) {}

  getUserFeed = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;

      const activities = await this.activityService.getUserFeed(
        userId,
        limit,
        offset
      );
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user feed" });
    }
  };

  getAllActivities = async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;

      const activities = await this.activityService.getAllActivities(
        limit,
        offset
      );
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  };
}
