import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

// Inicializace SQLite databáze
const dbPath = join(process.cwd(), 'data', 'database.db');
const dbDir = dirname(dbPath);

// Vytvoření složky data, pokud neexistuje
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

// Inicializace databáze
const db = new Database(dbPath);

// Vytvoření tabulky, pokud neexistuje
db.exec(`
  CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT UNIQUE NOT NULL,
    settings TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
