import React from 'react';

import Home from './pages/Home';
import AddHouse from './pages/AddHouse';
import HouseDetails from './pages/HouseDetails';
import Navbar from './components/Navbar';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyListings from "./pages/MyListings";
import Profile from "./pages/Profile";
import OwnerDashboard from "./pages/OwnerDashboard";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import Ads from './pages/Ads';
import EditHouse from './pages/EditHouse';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';

const App = () => {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Navbar/>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/add-house" element={<AddHouse />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/edit-house/:id" element={<EditHouse />} />
          <Route path="/ads" element={<Ads />} /> 
          <Route path="/chat" element={<ChatList />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
