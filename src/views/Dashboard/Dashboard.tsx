import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { MapView } from '@/components/MapView'
import Autocomplete from 'react-google-autocomplete'
import WaypointsList from '@/components/WaypointsList/WaypointsList'
import { TotalTravelLength } from '@/components/TotalTravelLength'

type latLngObject = { formattedAddress: string; lat: number; lng: number }[]

function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.places.PlaceResult | null>(null)
  const [locations, setLocations] = useState<latLngObject>([])
  const [travelLength, setTravelLength] = useState<number>(0)

  const handleSelect = () => {
    // const results = await geocodeByPlaceId(location.value.place_id)
    const lat = selectedLocation?.geometry?.location?.lat()
    const lng = selectedLocation?.geometry?.location?.lng()
    const formattedAddress = selectedLocation?.formatted_address || ''

    if (lat && lng) {
      setLocations(prevLocations => [...prevLocations, { formattedAddress, lat, lng }])
    } else {
      alert('Please select a location')
    }
  }

  console.log(locations)

  return (
    <div className={styles.Wrapper}>
      <div className={styles.MapWrapper}>
        <MapView locations={locations} setTravelLength={setTravelLength} />
      </div>

      <div className={styles.AddLocation}>
        <Autocomplete
          onPlaceSelected={place => {
            setSelectedLocation(place)
          }}
          options={{
            types: ['geocode', 'establishment']
          }}
          className={styles.Autocomplete}
          apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
        />

        <button onClick={() => handleSelect()}> Add Waypoint</button>
      </div>

      <div className={styles.LocationsWrapper}>
        <TotalTravelLength travelLength={travelLength} />

        <WaypointsList locations={locations} setLocations={setLocations} />
      </div>
    </div>
  )
}

export default Dashboard
