import React from 'react'
import styles from './Dashboard.module.scss'

function Dashboard() {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.MapWrapper}>map component</div>

      <div className={styles.LocationsWrapper}>locations component</div>
    </div>
  )
}

export default Dashboard
