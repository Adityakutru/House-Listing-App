import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const HouseDetails = () => {

  // It is imported from the DOM
  const{id} = useParams();
  const [house, setHouse] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/houses/${id}`).then((res) => setHouse(res.data)).catch((err)=> console.log(err))
  },[id]);

  if(!house) return <p className='text-center mt-10'>Loading...</p>

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold mb-2'>{house.title}</h1>
      <p className='text-gray-600 mb-4'>{house.location}</p>

      <div className="w-full h-80 mb-6">
        <img
          src={house.images?.[0] || "https://via.placeholder.com/500"}
          className="w-full h-full object-cover rounded"
          alt="House"
        />
      </div>

      <p className="text-xl text-green-600 font-bold mb-4">
        ₹ {house.price}
      </p>

      <p className="text-gray-700 mb-4">{house.description}</p>

      <div className="mt-4">
        <p className="font-semibold">Owner: {house.ownerName}</p>
        <p className="text-gray-700">Phone: {house.ownerPhone}</p>
      </div>
    </div>
  )
}

export default HouseDetails
