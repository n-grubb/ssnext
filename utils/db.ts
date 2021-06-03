if (!window.indexedDB) {
  console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
} else {
  // open the database
  // indexedDB.open takes a dbname and version
  const openRequest = indexedDB.open("ssdb", 1)

  /**
   * `onupgradeneeded` is triggered when no db exists or a version changes.
   * The `onupgradeneeded` listener informs us about a parallel update attempt, if the current 
   * database version becomes outdated.
   */
  openRequest.onupgradeneeded = () => {
    const db = openRequest.result

    console.log(`Loaded SSDB version: ${db.version}`)

    // setup our stores (similar to a table in a traditional db)
    const stores = ['rankings', 'leagues', 'teams']
    stores.forEach(storeName => {
      if (!db.objectStoreNames.contains(storeName)) {
        // createObjectStore accepts a name and a `keyOptions` object.
        // `keyOptions` is an optional object with one of two properties:
        //   - keyPath – a path to an object property that IndexedDB will use as the key, e.g. id.
        //   - autoIncrement – if true, then the key for a newly stored object is generated 
        //       automatically, as an ever-incrementing number.
        // if we don’t supply keyOptions, then we’ll need to provide a key explicitly later, when 
        // storing an object.
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
      }
    })

    // if we wanted to delete stores, we could do so like this:
    // db.deleteObjectStore('books')
  }

  openRequest.onerror = () => {
    console.error("Database error:", openRequest.error)
  }
  
  openRequest.onsuccess = () => {
    const db = openRequest.result

    db.onversionchange = () => {
      db.close()
      alert('Your database is outdated. Please reload the page.')
    }

    // db is ready to use...
  }

  /** 
   * The `onblocked` listener informs us about the opposite situation: there’s a connection to an 
   * outdated version elsewhere, and it doesn’t close, so the newer connection can’t be made.
   */
   openRequest.onblocked = () => {
    // this event should not fire if we handled `onversionchange` properly.
    // the `onblocked` event occurs because there is another open connection to the same database
    // and it was not closed when `onverstionchange` was triggered

    // alternately, we could use this event to notify the user that the new version can not be 
    // loaded until they close their other tabs.
    // these collisions are rare but we should handle them.
    console.error(`The new version of the database cannot be used until other connections are 
      closed. Please close other tabs.`)
  }


  /**
   * Create a transaction with the store that will be accessed. 
   * Mode can be specified to switch between `readwrite` and `readonly`.
   * TODO: support multiple stores?
   */
  function openTransaction(db: IDBDatabase, storeName: string, mode: IDBTransactionMode = 'readwrite') {
    const tx = db.transaction(storeName, mode)

    tx.oncomplete = () => console.log('Transaction completed.')
    tx.onabort = () => console.error('Transaction aborted.')
    tx.onerror = () => console.error('An error occured while attempthing the transaction.', tx.error)

    return tx.objectStore(storeName)
  }

  /**
   * Add an item to a given store.
   * If overwriting existing entries is allowed, use put(). Use add() when false.
   * Using add() will throw an error when an entry with a mtaching key already exists.
   */
  function addToStore(
    objectStore: IDBObjectStore, 
    itemToAdd: object, 
    itemKey?: string|number, 
    overwriteExisting: boolean = true
  ) {
    const request = overwriteExisting 
      ? objectStore.put(itemToAdd, itemKey)
      : objectStore.add(itemToAdd, itemKey)

    request.onsuccess = () => {
      console.log(`Item added to ${objectStore.name} store.`, request.result)
    }
    request.onerror = event => {
      if (request.error.name == 'ConstraintError') {
        event.preventDefault() // don't abort the tx
        event.stopPropagation() // don't bubble up
        console.log('Item with matching key already exists.')
      }
      console.log(`Error adding item to ${objectStore.name} store:`, request.result)
    }
  }

  /**
   * Right now, there is no way to manually end commit a transaction.
   * 
   */
}