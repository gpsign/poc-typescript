import { User } from "@/protocols/users.protocols";
import { usersServices } from "@/services/users.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function create(req: Request, res: Response) {
	const user = req.body as User;
	await usersServices.create(user);
	return res.sendStatus(httpStatus.CREATED);
}

export const usersControllers = { create };
