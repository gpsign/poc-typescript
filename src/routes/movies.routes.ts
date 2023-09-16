import { moviesControllers } from "@/controllers/movies.controllers";
import { validateMovie } from "@/middlewares/validateMovie.middlewares";
import { Router } from "express";

const moviesRouter = Router();

moviesRouter.post("/movies", validateMovie, moviesControllers.create);

export default moviesRouter;
