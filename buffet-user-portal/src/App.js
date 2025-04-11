import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HotelList from './pages/HotelList';
import HotelView from './pages/HotelView';
import BuffetList from './pages/BuffetList';
import BuffetView from './pages/BuffetView';
import ReservationForm from './pages/ReservationForm';
import SuperAdmin from './pages/SuperAdmin';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<HotelView />} />
            <Route path="/buffets" element={<BuffetList />} />
            <Route path="/buffets/:id" element={<BuffetView />} />
            <Route path="/reservation/:hotelId/:buffetId" element={<ReservationForm />} />
            <Route path="/admin" element={<SuperAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
