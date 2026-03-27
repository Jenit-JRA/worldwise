import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000'
const initialState = ({
    cities: [],
    isLoading: false,
    currentCity: {}
})
function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action?.payload
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action?.payload
            }
        case 'cities/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload]
            }
        case 'cities/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {}
            }
    }
}

function CitiesProvider({ children }) {

    // const [cities, setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity, setCurrentCity] = useState(false)
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        async function fetchCities() {

            try {
                dispatch({ type: 'loading' })
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json()
                dispatch({ type: 'cities/loaded', payload: data })

            }
            catch (e) {
                alert('There was an error loading data')

            }


        }
        fetchCities();
    }, [])

    const getCity = useCallback(
        async function getCity(id) {
            try {
                dispatch({ type: 'loading' })
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json()
                dispatch({ type: 'city/loaded', payload: data })



            }
            catch (e) {
                console.log(e)
                alert('There was an error loading data')

            }

        }, [currentCity.id]
    )
    async function createCity(newCity) {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await res.json()
            dispatch({ type: 'cities/created', payload: data })
            console.log(data)

        }
        catch (e) {
            console.log(e)
            alert('There was an error creating data')

        }

    }
    async function deleteCity(id) {
        try {
            dispatch({ action: 'loading' })
            const res = await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json()
            dispatch({ type: 'cities/deleted', payload: id })


        }
        catch (e) {
            console.log(e)
            alert('There was an error deleting data')

        }

    }
    return <CitiesContext.Provider
        value={{
            cities,
            isLoading,
            currentCity,
            createCity,
            getCity,
            deleteCity
        }}>
        {children}
    </CitiesContext.Provider>

}
function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error("Cities context was used outside the place where it was defined")
    return context
}
export { CitiesProvider, useCities }