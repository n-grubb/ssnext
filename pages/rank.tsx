import { useState, useContext, useEffect } from 'react'
import { getRankings } from '@/db/rankings'
import DBContext from '@/context/dbContext'
import Head from 'next/head'
import RankingSelector from '@/components/patterns/RankingSelector'

function Rank() {
  const [rankings, setRankings] = useState([])
  const [playerProjections, setPlayerProjections] = useState([])

  const db: IDBDatabase = useContext(DBContext)
  
  // get existing rankings
  useEffect(
    () => {
      async function init() {
        const rankings = await getRankings(db)
        console.log(rankings)
        // check db for existing rankings
        // setRankings(() => { return getRankings(db) })
        // check db for existing player projections
      }

      init()
    }, 
    [db]
  )

  return (
    <>
      <Head>
        <title>Rank | Sign Stealing</title>
      </Head>
      <section className="rank">
        <div className="intro">
          <h1>Rank</h1>
          <div className="toolbar">
            <RankingSelector 
              rankings={rankings}
            />
          </div>
          <div className="player-pane" style={{marginTop: '2rem'}}>
            { rankings.length > 0 ? 
              <p>found a ranking!</p>
            : 
              <p>No rankings found.</p>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Rank