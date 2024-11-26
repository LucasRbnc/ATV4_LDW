import { Router } from "express";
import event from "./event";

const routes = Router();

routes.use("/api", event);

export default routes