import { Router } from "express";
import { ratingsControllers } from "@/controllers/ratings.controllers";
import { validateRating } from "@/middlewares/validateRating.middlewares";

const ratingsRouter = Router();

ratingsRouter.post("/ratings", validateRating, ratingsControllers.create);
ratingsRouter.get("/ratings", ratingsControllers.read);
ratingsRouter.put("/ratings", ratingsControllers.update);
ratingsRouter.delete("/ratings", ratingsControllers.deleteRating);

export default ratingsRouter;
