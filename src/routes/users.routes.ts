import { Router } from "express";
import { usersControllers } from "@/controllers/users.controllers";
import { validateUser } from "@/middlewares/validateUser.middlewares";

const userRouter = Router();

userRouter.post("/users", validateUser, usersControllers.create);

export default userRouter;
