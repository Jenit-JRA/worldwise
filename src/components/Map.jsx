import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useGeolocation } from '../hooks/useGeoLocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'

const Map = () => {
    const { cities } = useCities()
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation()
    const [mapLat, mapLng] = useUrlPosition()
    console.log(cities)

    useEffect(() => {
        if (mapLat && mapLng)
            setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition?.lat, geolocationPosition?.lng])
        }

    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer} >
            <Button type='position' onClick={getPosition}>Use your Position</Button>
            <MapContainer
                key={mapPosition.join(",")}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom
                className={styles.map}
            >                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities?.map(city => (
                    <Marker position={[city?.position?.lat, city?.position?.lng]} key={city?.id}>
                        <Popup>
                            <span>{city?.emoji} {city?.cityNamw}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position)
    return null
}

function DetectClick() {
    const navigate = useNavigate()

    useMapEvent({
        click: e => {
            console.log(e)
            navigate(`forms?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}
export default Map