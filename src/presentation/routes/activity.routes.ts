import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import { ActivityService } from "../../application/services/activity.service";
import { PrismaActivityRepository } from "../../infrastructure/repositories/prisma-activity.repository";

const router = Router();

// Dependency Injection
const activityRepository = new PrismaActivityRepository();
const activityService = new ActivityService(activityRepository);
const activityController = new ActivityController(activityService);

router.get("/activity", activityController.getAllActivities);
router.get("/activity/:userId", activityController.getUserFeed);

export default router;
