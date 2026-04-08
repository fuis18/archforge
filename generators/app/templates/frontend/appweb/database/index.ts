// src/db/index.ts
import { db } from "./db";

export type DbParam = string | number | null;

export async function select<T>(
	query: string,
	params: DbParam[] = [],
): Promise<T[]> {
	return await db.select<T[]>(query, params);
}

export async function insert(
	query: string,
	params: DbParam[] = [],
): Promise<number> {
	const result = await db.execute(query, params);
	return result.lastInsertId!;
}

export async function execute(
	query: string,
	params: DbParam[] = [],
): Promise<void> {
	await db.execute(query, params);
}
