import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HotelList from './pages/HotelList';
import HotelView from './pages/HotelView';
import BuffetList from './pages/BuffetList';
import BuffetView from './pages/BuffetView';
import ReservationForm from './pages/ReservationForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<HotelView />} />
            <Route path="/buffets" element={<BuffetList />} />
            <Route path="/buffets/:id" element={<BuffetView />} />
            <Route path="/reservation/:hotelId/:buffetId" element={<ReservationForm />} />
            
            {/* Catch-all route - redirect to home */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
