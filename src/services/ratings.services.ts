import { Rating } from "@/protocols/ratings.protocols";
import { moviesRepositories } from "@/repositories/movies.repositories";
import { ratingsRepositories } from "@/repositories/ratings.repositories";
import { usersRepositories } from "@/repositories/users.repositories";

async function create(rating: Rating) {
	const checkUser = await usersRepositories.getById(rating.userId);
	if (checkUser.rows[0] === undefined)
		throw {
			Type: "Not Found",
			Message: "User not found.",
		};

	const checkMovie = await moviesRepositories.getById(rating.movieId);
	if (checkMovie.rows[0] === undefined)
		throw {
			Type: "Not Found",
			Message: "Movie not found.",
		};

	const checkRating = await ratingsRepositories.getSpecificRating(
		rating.userId,
		rating.movieId
	);

	if (checkRating.rows[0])
		throw {
			Type: "Request Conflict",
			Message: "Movie already rated by user.",
		};

	await ratingsRepositories.insert(rating);
}

async function read() {
	const result = await ratingsRepositories.getRatings();
	return result.rows;
}

async function update(rating: Rating) {
	const checkUser = await usersRepositories.getById(rating.userId);
	if (checkUser.rows[0] === undefined)
		throw {
			Type: "Not Found",
			Message: "User not found.",
		};

	const checkMovie = await moviesRepositories.getById(rating.movieId);
	if (checkMovie.rows[0] === undefined)
		throw {
			Type: "Not Found",
			Message: "Movie not found.",
		};

	const checkRating = await ratingsRepositories.getSpecificRating(
		rating.userId,
		rating.movieId
	);

	if (checkRating.rows[0] === undefined)
		throw {
			Type: "Not Found",
			Message: "Rating not found.",
		};

	await ratingsRepositories.updateRating(rating);
}

async function deleteRating(id: number) {
	const checkRating = await ratingsRepositories.getRatingById(id);

	if (checkRating.rows[0] === undefined)
		throw {
			Type: "Not Found",
			Message: "Rating not found.",
		};

	await ratingsRepositories.deleteRating(id);
}

export const ratingsServices = { create, read, update, deleteRating };
