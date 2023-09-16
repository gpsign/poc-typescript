import { Rating } from "@/protocols/ratings.protocols";
import Joi from "joi";

export const ratingSchema = Joi.object<Rating>({
	userId: Joi.number().required().min(1),
	movieId: Joi.number().required().min(1),
	stars: Joi.number().required().min(0).max(5),
});
