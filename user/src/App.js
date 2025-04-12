import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

// Components
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './components/Landing';
import HotelList from './components/HotelList';
import HotelDetail from './components/HotelDetail';
import BuffetList from './components/BuffetList';

function App() {
  return (
    <Router>
      <div className="app-container">
        <CustomNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/buffets" element={<BuffetList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
