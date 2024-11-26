import { Router } from "express";
import EventController from "../controller/eventController";

const router = Router();
const controller = new EventController();

router.post("/event", controller.createEvent);
router.get("/event", controller.listEvent);
router.get("/event/search", controller.searchEventByTitle);
router.put("/event", controller.updateEvent);
router.delete("/event/:id", controller.deleteEvent);

export default router