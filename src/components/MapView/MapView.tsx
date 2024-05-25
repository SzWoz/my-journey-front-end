import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'
import styles from './MapView.module.scss'
import darkmode from '@/data/mapStyles'

interface MapViewProps {
  locations: { lat: number; lng: number }[]
  setTravelLength: React.Dispatch<React.SetStateAction<number>>
}

function MapView({ locations, setTravelLength }: MapViewProps) {
  const position = { lat: 52.2297, lng: 21.0122 }
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
    if (!directionService || !directionsRenderer || locations.length < 0) return

    const waypoints = locations.slice(1, locations.length - 1).map(location => ({
      location,
      stopover: true
    }))

    directionService.route(
      {
        origin: locations[0],
        destination: locations[locations.length - 1],
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === 'OK' && response) {
          directionsRenderer.setDirections(response)

          const totalDistance = response.routes[0].legs.reduce((total, leg) => {
            if (leg.distance) {
              return total + leg.distance.value
            }
            return total
          }, 0)

          setTravelLength(totalDistance)
        } else {
          console.error('Directions request failed due to ' + status)
        }
      }
    )
  }, [directionService, directionsRenderer, locations])

  const darkModeStyles = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] }
    // Add more style rules as needed
  ]

  return (
    <div className={styles.Wrapper}>
      <Map defaultZoom={9} defaultCenter={locations[0] || position} styles={darkmode} disableDefaultUI />
    </div>
  )
}

export default MapView
