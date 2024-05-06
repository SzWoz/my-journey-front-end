import React from 'react'
import Dashboard from '@views/Dashboard/Dashboard'
import Router from './Routes'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'

function App() {
  return (
    <>
      <APIProvider libraries={['places']} apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}>
        <Router />
      </APIProvider>
    </>
  )
}

export default App
