type RatingDB = {
	id: number;
	userId: number;
	movieId: number;
	stars: number;
};

type RatingPretty = {
	ratingId: number;
	user: string;
	movieTitle: string;
	stars: number;
};

type Rating = Omit<RatingDB, "id">;

type UserRating = {
	ratingId: number;
	movieTitle?: string;
	user: string;
	stars: number;
};

type MovieRatings = {
	title: string;
	ratings: UserRating[];
};

type RatingId = {
	id: number;
};

export { Rating, RatingDB, RatingPretty, UserRating, MovieRatings, RatingId };
