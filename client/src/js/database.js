import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT into db');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, content:content});
  const result = await request;
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
console.log('GET from db');
const jateDb = await openDB('jate', 1)
const tx = jateDb.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const request = store.get(id);
const result = await request;
return result;
};

initdb();