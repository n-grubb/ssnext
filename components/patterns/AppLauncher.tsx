import AppTile, { AppTileOptions} from '@/components/patterns/AppTile'
import styles from './AppLauncher.module.scss'

const AppLauncher = ({ apps }: { apps: AppTileOptions[] }) => {
  const appTiles = apps.map((app, index) => {
    return (
      <AppTile
        title={app.title}
        abbr={app.abbr}
        description={app.description}
        link={app.link}
        color={app.color}
        key={index}
      />
    )
  })
  return (
    <div className={styles.wrapper}>
      { appTiles }
    </div>
  )
}

export default AppLauncher