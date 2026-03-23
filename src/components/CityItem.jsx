import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext'
import { FaTrash } from 'react-icons/fa';

const CityItem = ({ city }) => {
    const { currentCity, deleteCity } = useCities()
    console.log(city)
    const { cityName, emoji, date, id, position } = city
    console.log(position)

    async function handleClickDelete(e) {
        e.preventDefault()
        await deleteCity(id)

    }
    return (
        <li>
            <Link className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{date}</time>
                <button onClick={(e) => handleClickDelete(e)}><FaTrash style={{ fontSize: '1rem', color: '#fffff' }} /></button>
            </Link>
        </li>


    )
}

export default CityItem