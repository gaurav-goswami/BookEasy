import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/ProfilePage";
import SearchResultPage from "./pages/SearchResultPage";
import ServiceInfo from "./pages/ServiceInfo";

// 

import Dashboard from "./pages/Dashboard/Dashboard";
import Bookings from "./pages/Dashboard/Bookings";
import CreateService from "./pages/Dashboard/CreateService";
import MyServices from "./pages/Dashboard/MyServices";
import ServiceInfoExp from "./pages/Dashboard/ServiceInfoExp";

import Error from "./pages/Error";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path = "/" element={ <HomePage /> } />
          <Route path = "/about-us" element={ <AboutPage /> } />
          <Route path = "/contact-us" element={ <ContactPage /> } />

          {/* auth */}
          <Route path = "/auth" element={ <Auth /> } />
          

          <Route path = "/profile/:user_id" element={ <ProfilePage /> } />

          <Route path = "/search-result/:service-name" element={ <SearchResultPage /> } />
          <Route path = "/service-info/:service-id" element={ <ServiceInfo /> } />

          {/* Dashboard for Experts only (this will be a protected route)*/}

          <Route path = "/dashboard" element={ <Dashboard /> } />
          <Route path = "/dashboard/bookings" element={ <Bookings /> } />
          <Route path = "/dashboard/create-service" element={ <CreateService /> } />
          <Route path = "/dashboard/my-services" element={ <MyServices /> } />
          <Route path = "/dashboard/service-info-exp" element={ <ServiceInfoExp /> } />
          

          {/* Error Page */}

          <Route path = "*" element={ <Error /> } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
