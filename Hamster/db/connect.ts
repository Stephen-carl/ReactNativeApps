import * as SQLite from 'expo-sqlite';


let dbInstance: SQLite.SQLiteDatabase | null = null;

export const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
     if (dbInstance) {
        return dbInstance;
    }
  dbInstance = await SQLite.openDatabaseAsync('hamstash.db');

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS guardian (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL
    );
  `);

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS child (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        profileCharacter TEXT,
        dateCreated TEXT NOT NULL,
        guardianId INTEGER,
        FOREIGN KEY (guardianId) REFERENCES guardian(id)
    );
  `);

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS itemCategories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL
    );
  `);

  // Seed the itemCategories table if empty
  const result: any = await dbInstance.getFirstAsync(`SELECT COUNT(*) as count FROM itemCategories`);
  const count = result ? Object.values(result)[0] : 0;

  if (count === 0) {
    const categories = ['snack', 'cloth', 'book', 'gift', 'musical', 'game', 'pocket'];
    for (const category of categories) {
      await dbInstance.runAsync(`INSERT INTO itemCategories (category) VALUES (?)`, [category]);
    }
    console.log('Seeded itemCategories table');
  }

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS takeOutItem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemName TEXT NOT NULL,
      categoryid INTEGER,
      childId INTEGER TEXT NOT NULL,
      childName TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (childId) REFERENCES child(id),
      FOREIGN KEY (categoryid) REFERENCES itemCategories(id)
    );
  `);

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS jar (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
        childId INTEGER,
        guardianId INTEGER,
        currentAmount REAL NOT NULL,
        previousAmount REAL,
        topUpDate TEXT,
        FOREIGN KEY (guardianId) REFERENCES guardian(id),
        FOREIGN KEY (childId) REFERENCES child(id)
    );
  `);

  await dbInstance.execAsync(`
    CREATE TABLE IF NOT EXISTS jarTransactions (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
        childId INTEGER,
        amount REAL NOT NULL,
        reason TEXT NOT NULL,
        takeOutId INTEGER,
        itemProfile TEXT,
        date TEXT,
        FOREIGN KEY (childId) REFERENCES child(id)
        FOREIGN KEY (takeOutId) REFERENCES takeOutItem(id)
    );
  `);

  console.log('Database initialized successfully');

  return dbInstance
};
