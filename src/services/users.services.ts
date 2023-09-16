import { User } from "@/protocols/users.protocols";
import { usersRepositories } from "@/repositories/users.repositories";

async function create(user: User) {
	const result = await usersRepositories.getByName(user.username);

	if (result.rows[0])
		throw { Type: "Request Conflict", Message: "Username already in use." };

	await usersRepositories.insert(user);
}

async function read(data: string | number) {
	if (typeof data === "string") {
		const result = await usersRepositories.getByName(data);
		return result;
	}
	if (typeof data === "number") {
		const result = await usersRepositories.getById(data);
		return result;
	}
}

export const usersServices = { create, read };
