import { User } from "@/protocols/users.protocols";
import { userSchema } from "@/schemas/users.schemas";
import { NextFunction, Request, Response } from "express";

export function validateUser(req: Request, res: Response, next: NextFunction) {
	const user = req.body as User;
	const validation = userSchema.validate(user, {
		abortEarly: false,
	});

	if (validation.error) {
		const error = {
			Type: "Unprocessable Entity",
			Message: validation.error.details
				.map((detail) => detail.message)
				.join(", "),
		};
		throw error;
	}

	next();
}
