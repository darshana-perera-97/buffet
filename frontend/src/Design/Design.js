import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateHotel from "./CreateHotel";
import AllHotels from "./AllHotels";
import HotelDetails from "./HotelDetails";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Buffets from "./Buffets";
import ManualReservation from "./ManualReservation";

export default function Design() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreateHotel />
                <AllHotels />
              </>
            }
          />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buffets" element={<Buffets />} />
          <Route path="/manual" element={<ManualReservation />} />
        </Routes>
      </Router>
      {/* <CreateHotel />
      <AllHotels /> */}
      {/* <HotelDetails */}
      {/* <LoginPage /> */}
      
    </div>
  );
}
