import { openDB, DBSchema, IDBPDatabase } from 'idb'

const DB_NAME = 'ssdb'
const DB_VERSION = 2

/* Type definition */
interface SSDB extends DBSchema {
  rankings: {
    value: {
      name: string
      price: number
      productCode: string
    }
    key: string
    indexes: { 'by-price': number }
  }
}

/**
 * 
 * @returns 
 */
export const initDB = async () => {
  const db = await openDB<SSDB>(
    DB_NAME,
    DB_VERSION,
    {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`Upgrading ssdb to version: ${newVersion}`)
        createStores(db)
      },
      blocked() {
        // …
      },
      blocking() {
        // …
      },
      terminated() {
        // …
      }
    }
  )
  
  // debug
  console.log(`Connected to ssdb. Version: ${db.version}`)
  console.log(db)

  return db
}

/**
 * Close a IndexedDB connection.
 * @param db - the IndexedDB connection to close.
 */
export const closeDB = (db: IDBPDatabase<SSDB>) => {
  db.close()
  console.log('Database closed.')
}

function createStores(db: IDBPDatabase<SSDB>) {
  db.createObjectStore('rankings', { keyPath: 'id', autoIncrement: true })


  /*
  const stores = ['rankings', 'leagues', 'teams']
  stores.forEach((storeName: string) => {
    console.log(storeName)
    if (!db.objectStoreNames.contains(storeName)) {
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      // objectStore.createIndex('by-price', 'price');
    }
  })
  */
}
