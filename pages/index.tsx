import Head from 'next/head'
import AppLauncher from '@/components/patterns/AppLauncher'

function Home() {
  /**
   * List our available tools/applications
   */
  const apps = [
    {
      title: 'Rank',
      abbr: 'Rk',
      description: 'Create customized draft rankings to get the edge in your draft.',
      link: '/rank',
      color: '#2052e3'
    },
    {
      title: 'In-Season',
      abbr: 'In',
      description: 'In-season tools to anaylze, plan, & strategize your way to the top of your league.',
      link: '/inseason',
      color: '#ffb000'
    }
  ]

  return (
    <>
      <Head>
        <title>Home | Sign Stealing</title>
      </Head>
      <section className="home">
        <div className="intro">
          <h1 className="visually-hidden">Pick a Tool</h1>
        </div>
        <AppLauncher apps={apps}/>
      </section>
    </>
  )
}

export default Home