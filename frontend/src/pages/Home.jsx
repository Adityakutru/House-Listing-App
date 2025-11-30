import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HouseCard from '../components/HouseCard'

const Home = () => {
const [houses, setHouses] = useState([])

useEffect(()=>{
    axios.get("http://localhost:3000/api/houses")
    .then(res => setHouses(res.data))
    .catch(err => console.log(err));
},[])

  return (
    <div className='p-6 max-w-6xl mx-auto'>
     <h1 className='text-3xl font-bold mb-6'>All houses</h1>
     <div className='flex flex-col gap-6'>
        {houses.map((house)=>(<HouseCard key={house._id} house={house}/>))}
        </div> 
    </div>
  )
}

export default Home
