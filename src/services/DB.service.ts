// database.js
import SQLite from 'react-native-sqlite-storage';

// Enable debug mode for SQLite
SQLite.DEBUG(true);
SQLite.enablePromise(true);

// Open or create the database
export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'happiness.db', location: 'default' });
};

// Function to create the 'SleepInfo' table
export const createTable = async (db: SQLite.SQLiteDatabase) => {
  // Create SleepInfo table
  const sleepInfoQuery = `
 CREATE TABLE IF NOT EXISTS SleepInfo (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   sleepTime TEXT,
   wakeTime TEXT,
   duration INTEGER,
   date INTEGER UNIQUE 
 );
`;

  // Create Appointments table
  const appointmentsQuery = `
 CREATE TABLE IF NOT EXISTS Appoinments (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   docName TEXT,
   speciality TEXT,
   queueNumber INTEGER,
   selectedDate TEXT,
   selectedTime TEXT
 );
`;
  const emotionDiaryQuery = `
CREATE TABLE IF NOT EXISTS Emotions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  emotion TEXT,
  date DATE
); 
`;

  const goalDiaryQuery = `
CREATE TABLE IF NOT EXISTS Goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  date DATE
); 
`;
  const postQuery = `
CREATE TABLE IF NOT EXISTS Posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  post TEXT,
  Image BLOB,
  date DATE
); 
`;
  // Execute each query separately
  await db.executeSql(sleepInfoQuery);
  await db.executeSql(appointmentsQuery);
  await db.executeSql(emotionDiaryQuery);
  await db.executeSql(goalDiaryQuery);
  await db.executeSql(postQuery);
};

export const executeQuery = async <T>(
  query: string,
  params: any[] = [],
  returnBoolean: boolean
): Promise<T | T[] | boolean> => {
  return new Promise<T | T[] | boolean>(async (resolve, reject) => {
    const db = await getDBConnection();

    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_tx, results) => {
          console.log('Result of the sql query is ' + results);
          const rows = results.rows;

          if (rows.length === 1 && Object.keys(rows.item(0)).length === 1) {
            // If there is a single row and single column (e.g., single number result)
            const singleResult = Object.values(rows.item(0))[0] as T;
            resolve(singleResult);
          } else {
            // Otherwise, return an array of rows
            const output: T[] = [];
            for (let i = 0; i < rows.length; i++) {
              output.push(rows.item(i));
            }
            if (returnBoolean) {
              resolve(true);
            }
            resolve(output);
          }
        },
        (_tx, error) => {
          console.error('Error executing query: ', error);
          reject(error);
        }
      );
    });
  });
};
