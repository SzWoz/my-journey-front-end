import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

function Dashboard() {
  const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 })
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')
  const [directionService, setDirectionService] = useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>()

  useEffect(() => {
    if (!map || !routesLibrary) return

    setDirectionService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [map, routesLibrary])

  useEffect(() => {
    if (!directionService || !directionsRenderer) return

    directionService.route(
      {
        origin: { lat: 37.7749, lng: -122.4194 },
        destination: { lat: 37.7749, lng: -122.5194 },
        waypoints: [
          { location: { lat: 37.8049, lng: -122.4294 }, stopover: true },
          { location: { lat: 37.8249, lng: -122.4394 }, stopover: true },
          { location: { lat: 37.8449, lng: -122.4494 }, stopover: true }
        ],
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response)
        } else {
          console.error('Directions request failed due to ' + status)
        }
      }
    )
  }, [directionService, directionsRenderer])

  console.log(directionService)

  return (
    <div className={styles.Wrapper}>
      <div className={styles.MapWrapper}>
        <Map defaultZoom={9} defaultCenter={position}></Map>
      </div>

      <div className={styles.LocationsWrapper}>locations component</div>
    </div>
  )
}

export default Dashboard
