import React from 'react'

import Home from './pages/Home'
import AddHouse from './pages/AddHouse'
import HouseDetails from './pages/HouseDetails'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add" element={<AddHouse/>}/>
      <Route path="/house/:id" element={<HouseDetails/>}/>
    </Routes>
    </>
  )
}

export default App
