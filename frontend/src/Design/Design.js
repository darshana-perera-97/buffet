import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateHotel from "./CreateHotel";
import AllHotels from "./AllHotels";
import HotelDetails from "./HotelDetails";

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
        </Routes>
      </Router>
      {/* <CreateHotel />
      <AllHotels /> */}
      {/* <HotelDetails */}
    </div>
  );
}
