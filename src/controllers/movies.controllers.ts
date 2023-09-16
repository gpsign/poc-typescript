import { Movie } from "@/protocols/movies.protocols";
import { moviesServices } from "@/services/movies.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function create(req: Request, res: Response) {
	const movie = req.body as Movie;
	await moviesServices.create(movie);
	return res.sendStatus(httpStatus.CREATED);
}

export const moviesControllers = { create };
