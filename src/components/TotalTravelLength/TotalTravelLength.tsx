import React, { useState, useEffect } from 'react'
import styles from './TotalTravelLength.module.scss'

interface TotalTravelLengthProps {
  travelLength: number
}

function TotalTravelLength({ travelLength }: TotalTravelLengthProps) {
  const [displayLength, setDisplayLength] = useState(travelLength)
  const [unit, setUnit] = useState('m')

  useEffect(() => {
    if (travelLength !== displayLength) {
      const intervalId = setInterval(() => {
        const randomLength = Math.floor(Math.random() * (travelLength + 1))
        setDisplayLength(randomLength)
      }, 50)

      setTimeout(() => {
        clearInterval(intervalId)
        setDisplayLength(travelLength)
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [travelLength])

  const convertLength = (length: number, unit: string) => {
    return unit === 'km' ? (length / 1000).toFixed(2) : length
  }

  return (
    <div className={styles.TotalTravel}>
      <h2>Travel Length</h2>

      <div className={styles.Distance}>
        <p>{convertLength(displayLength, unit)}</p>
        <button aria-selected={unit === 'm'} onClick={() => setUnit('m')}>
          m
        </button>
        <button aria-selected={unit === 'km'} onClick={() => setUnit('km')}>
          km
        </button>
      </div>
    </div>
  )
}

export default TotalTravelLength
