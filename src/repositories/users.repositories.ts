import { db } from "@/database/database.connection";
import { User, UserDB } from "@/protocols/users.protocols";

function insert(user: User) {
	return db.query(`INSERT INTO users (username) VALUES ($1);`, [user.username]);
}

function getById(id: number) {
	return db.query<UserDB>(`SELECT * FROM users WHERE users.id = $1;`, [id]);
}

function getByName(name: string) {
	return db.query<UserDB>(`SELECT * FROM users WHERE users.username = $1;`, [
		name,
	]);
}

export const usersRepositories = { insert, getById, getByName };
