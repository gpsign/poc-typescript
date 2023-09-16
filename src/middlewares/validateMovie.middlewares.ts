import { movieSchema } from "@/schemas/movies.schemas";
import { NextFunction, Request, Response } from "express";
import dayjs from "dayjs";
import { Movie } from "@/protocols/movies.protocols";

var customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

export function validateMovie(req: Request, res: Response, next: NextFunction) {
	const request = req.body as Movie;
	const validation = movieSchema.validate(request, {
		abortEarly: false,
	});

	if (validation.error) {
		const Messages: string[] = [];

		if (!dayjs(request.launchDate, "DD-MM-YYYY", true).isValid())
			Messages.push("Date must be in DD-MM-YYYY format");

		validation.error.details.forEach((detail) => Messages.push(detail.message));
		const error = {
			Type: "Unprocessable Entity",
			Message: Messages.join(", "),
		};

		throw error;
	}

	if (!dayjs(request.launchDate, "DD-MM-YYYY", true).isValid()) {
		throw {
			Type: "Unprocessable Entity",
			Message: "Date must be in DD-MM-YYYY format.",
		};
	}
	next();
}
