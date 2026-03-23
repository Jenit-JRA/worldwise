import React from 'react'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'

const CountryList = () => {
    const { cities, isLoading } = useCities()

    if (isLoading) {
        return <Spinner />
    }
    const countries = cities.reduce((arr, cities) => {
        console.log(arr)
        console.log(cities)
        if (!arr.map(el => el.country).includes(cities.country))
            return [...arr, { country: cities.country, emoji: cities.emoji }]
        else
            return arr

    }
        , [])
    return (
        <ul className={styles.countryList}>
            {countries?.map((country) =>
                <CountryItem country={country} />)}
        </ul>
    )
}

export default CountryList