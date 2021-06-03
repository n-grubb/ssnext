import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { initDB } from '@/db/db'
import DBContext from '@/context/dbContext'
import '../styles/main.css'

function SSApp({ Component, pageProps }: AppProps) {
  // setup db state 
  const [db, setDB] = useState(null)

  // initialize db
  useEffect(
    () => {
      const init = async () => {
        try {
          const ssdb = await initDB()
          setDB(ssdb)
          return ssdb
        } catch (error) {
          console.error(`Error connecting to database: ${error}`)
        }
      }
      init()

      // return a function to close the db on unmount
      // return closeDB(db)
    },
    [] // todo: watch for db changes?
  )

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Sign Stealing is a suite of tools designed to give you an edge in fantasy baseball." />
      </Head>
      <header className="app-header">
        <Link href="/">
          <a className="app-title">signstealing</a>
        </Link>
      </header>
      <main>
        <DBContext.Provider value={db}>
          <Component {...pageProps} />
        </DBContext.Provider>
      </main>
    </>
  )
}

export default SSApp
