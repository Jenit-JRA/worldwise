import React from 'react'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import { useCities } from '../contexts/CitiesContext'

const CityList = () => {
    const { cities, isLoading } = useCities()
    console.log(cities)
    if (isLoading) {
        return <Spinner />
    }
    return (
        <ul className={styles.cityList}>
            {cities?.map((city) =>
                <CityItem city={city} key={city.id} />)}
        </ul>
    )
}

export default CityList