import errorHandler from "@/middlewares/errorHandler.middlewares";
import { Router } from "express";
import userRouter from "./users.routes";
import moviesRouter from "./movies.routes";
import ratingsRouter from "./ratings.routes";

const appRouter = Router();

appRouter.use(userRouter);
appRouter.use(moviesRouter);
appRouter.use(ratingsRouter);
appRouter.use(errorHandler);

export default appRouter;
