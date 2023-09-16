import { Rating, RatingId } from "@/protocols/ratings.protocols";
import { ratingsServices } from "@/services/ratings.services";
import { Request, Response, response } from "express";
import httpStatus from "http-status";

async function create(req: Request, res: Response) {
	const rating = req.body as Rating;

	await ratingsServices.create(rating);
	return res.sendStatus(httpStatus.CREATED);
}

async function read(req: Request, res: Response) {
	const result = await ratingsServices.read();
	return res.status(httpStatus.OK).send(result);
}

async function deleteRating(req: Request, res: Response) {
	const rating = req.body as RatingId;
	await ratingsServices.deleteRating(rating.id);
	return res.sendStatus(httpStatus.OK);
}

async function update(req: Request, res: Response) {
	const rating = req.body as Rating;

	await ratingsServices.update(rating);
	return res.sendStatus(httpStatus.OK);
}

export const ratingsControllers = { create, read, update, deleteRating };
