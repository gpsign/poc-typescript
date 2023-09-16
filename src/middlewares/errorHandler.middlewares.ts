import httpStatus from "http-status";
import { ErrorType } from "@/protocols/error.protocols";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default function errorHandler(
	error: ErrorType,
	req: Request,
	res: Response,
	next: NextFunction
) {
	switch (error.Type) {
		case "Unprocessable Entity":
			error.Status = httpStatus.UNPROCESSABLE_ENTITY;
			return res.status(error.Status).send(error);

		case "Request Conflict":
			error.Status = httpStatus.CONFLICT;
			return res.status(error.Status).send(error);

		case "Not Found":
			error.Status = httpStatus.NOT_FOUND;
			return res.status(error.Status).send(error);

		case "Bad Request":
			error.Status = httpStatus.BAD_REQUEST;
			return res.status(error.Status).send(error);

		default:
			error.Status = httpStatus.INTERNAL_SERVER_ERROR;
			error.Type = "Internal Server Error";
			return res.status(error.Status).send(error);
	}
}
