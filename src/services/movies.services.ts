import { Movie } from "@/protocols/movies.protocols";
import { moviesRepositories } from "@/repositories/movies.repositories";

async function create(movie: Movie) {
	const result = await moviesRepositories.getByTitle(movie.title);

	if (result.rows[0])
		throw { Type: "Request Conflict", Message: "Movie already exists." };

	await moviesRepositories.insert(movie);
}

async function read(data: number | string) {
	if (typeof data === "string") {
		const result = await moviesRepositories.getByTitle(data);
		return result;
	}
	if (typeof data === "number") {
		const result = await moviesRepositories.getById(data);
		return result;
	}
}

export const moviesServices = { create, read };
