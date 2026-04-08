import Database from "@tauri-apps/plugin-sql";

export const db = await Database.load("sqlite:products.db");

await db.execute("PRAGMA journal_mode = WAL");
