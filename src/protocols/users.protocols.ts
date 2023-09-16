type UserDB = {
	id: number;
	username: string;
};

type User = Omit<UserDB, "id">;

export { User, UserDB };
