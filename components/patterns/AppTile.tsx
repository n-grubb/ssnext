import { useRouter } from 'next/router'
import styles from './AppTile.module.scss'

export type AppTileOptions = {
  title: string
  abbr: string
  description?: string
  link: string
  color: string
}

const AppTile = (props: AppTileOptions) => {
  const router = useRouter()

  return (
    <div
      className={styles.tile}
      onClick={() => router.push(props.link)}
    >
      <div
        className={styles.icon}
        style={{ backgroundColor: props.color }}
      >
        { props.abbr }
      </div>
      <h3>{ props.title }</h3>
      <p>{ props.description }</p>
    </div>
  )
}

export default AppTile
