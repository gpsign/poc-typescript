import { db } from "@/database/database.connection";
import { Movie, MovieDB } from "@/protocols/movies.protocols";

function insert(movie: Movie) {
	return db.query(`INSERT INTO movies (title, launchDate) VALUES ($1, $2);`, [
		movie.title,
		movie.launchDate,
	]);
}

function getById(id: number) {
	return db.query<MovieDB>(`SELECT * FROM movies WHERE movies.id = $1;`, [id]);
}

function getByTitle(title: string) {
	return db.query<MovieDB>(`SELECT * FROM movies WHERE movies.title = $1;`, [
		title,
	]);
}

export const moviesRepositories = { insert, getById, getByTitle };
