
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {

  const navigate = useNavigate()

  const [lat, lng] = useUrlPosition()
  const { createCity } = useCities()

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("")


  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        console.log(data)
        setCityName(data?.city || data?.locality || "")
        setCountry(data)
        setEmoji(convertToEmoji(data?.countryCode))

      }
      catch { err }
      finally {
        setIsLoadingGeocoding(false)
      }

    }
    fetchCityData()
  }, [lat, lng])
  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    };
    await createCity(newCity)
    navigate('/app/cities')
  }
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' onClick={(e) => handleSubmit(e)}>Add</Button>
        <Button type='back' onClick={(e) => {
          e.preventDefault();
          navigate(-1)
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
