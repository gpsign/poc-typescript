type MovieDB = {
	id: number;
	title: string;
	launchDate: Date | string;
};

type Movie = Omit<MovieDB, "id">;

export { Movie, MovieDB };
