import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { MapView } from '@/components/MapView'
import Autocomplete from 'react-google-autocomplete'

type latLngObject = { formattedAddress: string; lat: number; lng: number }[]

function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.places.PlaceResult | null>(null)
  const [locations, setLocations] = useState<latLngObject>([])
  const [travelLength, setTravelLength] = useState<number>(0)
  console.log(selectedLocation)

  const handleSelect = () => {
    // const results = await geocodeByPlaceId(location.value.place_id)
    const lat = selectedLocation?.geometry?.location?.lat()
    const lng = selectedLocation?.geometry?.location?.lng()
    const formattedAddress = selectedLocation?.formatted_address || ''

    if (locations.length < 5 && lat && lng) {
      setLocations(prevLocations => [...prevLocations, { formattedAddress, lat, lng }])
    } else {
      alert('You can only add up to 5 locations.')
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
          apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
          className={styles.Autocomplete}
        />

        <button onClick={() => handleSelect()}> Add Waypoint</button>
      </div>

      <div className={styles.LocationsWrapper}>
        <p>travel length: {travelLength}</p>

        {locations.map((location, index) => (
          <div key={index} className={styles.Location}>
            <div>{location.formattedAddress}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
