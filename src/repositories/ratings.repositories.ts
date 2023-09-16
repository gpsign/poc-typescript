import { db } from "@/database/database.connection";
import {
	MovieRatings,
	Rating,
	RatingDB,
	RatingPretty,
	UserRating,
} from "@/protocols/ratings.protocols";

function insert(rating: Rating) {
	return db.query(
		`INSERT INTO ratings (userId, movieId, stars) VALUES ($1, $2, $3);`,
		[rating.userId, rating.movieId, rating.stars]
	);
}

function getRatingById(id: number) {
	return db.query<RatingDB>(`SELECT * FROM ratings WHERE id = $1;`, [id]);
}

function getRatingsbyMovieId(id: number) {
	return db.query<MovieRatings>(
		`
    SELECT m.title, 
    ARRAY_AGG(json_build_object(
      'ratingId', r.id,
      'user', u.username, 
      'stars', r.stars)) AS "ratings"
    FROM ratings r
    INNER JOIN users u ON u.id = r.userId
    INNER JOIN movies m ON m.id = r.movieid
    GROUP BY m.title
    WHERE r.movieId = $1;
    `,
		[id]
	);
}

function getRatingsbyUserId(id: number) {
	return db.query<UserRating>(
		`
    SELECT r.id AS "ratingId", m.title AS "movieTitle", u.username AS "user", r.stars AS "stars"
    FROM ratings r
    INNER JOIN movies m ON m.id = r.movieId
    INNER JOIN users u ON u.id = r.userId
    WHERE r.userId = $1
    ORDER BY m.launchDate;
    `,
		[id]
	);
}

function getSpecificRating(userId: number, movieId: number) {
	return db.query<RatingPretty>(
		`
    SELECT r.id AS "ratingId", m.title AS "movieTitle", u.username AS "user", r.stars AS "stars"
    FROM ratings r
    INNER JOIN movies m ON m.id = r.movieId
    INNER JOIN users u ON u.id = r.userId
    WHERE r.userId = $1 AND r.movieId = $2
    ORDER BY m.launchDate;
    `,
		[userId, movieId]
	);
}

function getRatings() {
	return db.query<MovieRatings>(
		`
    SELECT m.title, 
    ARRAY_AGG(json_build_object(
      'ratingId', r.id,
      'user', u.username, 
      'stars', r.stars)) AS "ratings"
    FROM ratings r
    INNER JOIN users u ON u.id = r.userId
    INNER JOIN movies m ON m.id = r.movieid
    GROUP BY m.title;
    `
	);
}

function deleteRating(id: number) {
	return db.query(`DELETE FROM ratings WHERE id = $1;`, [id]);
}

function updateRating(rating: Rating) {
	return db.query(
		`UPDATE ratings SET stars = $1 WHERE movieId = $2 AND userId = $3;`,
		[rating.stars, rating.movieId, rating.userId]
	);
}

export const ratingsRepositories = {
	insert,
	getRatingById,
	getRatings,
	getRatingsbyMovieId,
	getRatingsbyUserId,
	getSpecificRating,
	deleteRating,
	updateRating,
};
