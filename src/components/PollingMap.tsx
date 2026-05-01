import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px'
};

const defaultPosition = {
  lat: 38.8977,
  lng: -77.0365
};

export default function PollingMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
  });

  const [position, setPosition] = useState(defaultPosition);
  const [locationError, setLocationError] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(newPos);
        setLocationError(false);
        if (map) {
          map.panTo(newPos);
          map.setZoom(14);
        }
      },
      () => {
        setLocationError(true);
      }
    );
  };

  return (
    <div className="polling-map-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button 
          className="btn" 
          onClick={handleLocateMe}
          aria-label="Locate me using GPS"
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
        >
          📍 Locate Me
        </button>
        
        {locationError && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <label htmlFor="zipSearch" className="sr-only">Search by ZIP</label>
            <input 
              id="zipSearch"
              type="text" 
              placeholder="Search by ZIP..." 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
              aria-label="Fallback ZIP Code Input"
            />
            <button 
              className="btn btn-secondary"
              onClick={() => alert(`Mock searching for ZIP: ${zipCode}`)}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
              aria-label="Search ZIP Code"
            >
              Search
            </button>
          </div>
        )}
      </div>

      <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative', zIndex: 1 }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {/* User's Polling Location */}
            <MarkerF position={position}>
              <InfoWindowF position={position}>
                <div style={{ color: '#000' }}>
                  <strong>Voter Info:</strong><br/>
                  Your designated polling place.
                </div>
              </InfoWindowF>
            </MarkerF>
            
            {/* If user moved, keep demo marker too */}
            {(position.lat !== defaultPosition.lat || position.lng !== defaultPosition.lng) && (
              <MarkerF position={defaultPosition}>
                <InfoWindowF position={defaultPosition}>
                  <div style={{ color: '#000' }}>
                    <strong>Demo DC Polling Place</strong>
                  </div>
                </InfoWindowF>
              </MarkerF>
            )}
          </GoogleMap>
        ) : (
          <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading Maps...
          </div>
        )}
      </div>
    </div>
  );
}
