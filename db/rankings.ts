export type Ranking = {

}

/* 
 * Get all rankings in local db
 */
export const getRankings = async (db: IDBDatabase) => {
  if (!db) { return [] }
  const store = db.transaction('rankings').objectStore('rankings')
  const rankings = await store.getAll()
  return rankings
}

/* 
 * Add a new ranking to the local db
 */
export const addRanking = async (db: IDBDatabase) => {
  const store = db.transaction('rankings').objectStore('rankings')
  // const ranking = (
  // )
}