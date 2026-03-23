import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route index element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="app" element={<AppLayout />} >
                            <Route index element={<Navigate replace to={'cities'} />} />
                            <Route path='cities' element={<CityList />} />
                            <Route path='cities/:id' element={<City />} />
                            <Route path='countries' element={<CountryList />} />
                            <Route path='forms' element={<Form />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>


    )
}

export default App