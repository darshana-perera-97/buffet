import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./Design/Navbar";
import Footer from "./Design/Footer";
import LoginPage from "./Design/LoginPage";
import Buffets from "./Design/Buffets";
import HotelDetails from "./Design/HotelDetails";
import Dashboard from "./Design/Dashboard";
import ManualReservation from "./Design/ManualReservation";
import AllHotels from "./Design/AllHotels";
import CreateHotel from "./Design/CreateHotel";
import HotelView from "./Design/HotelView";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            {/* Landing Page and Order Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/buffets" element={<Buffets />} />
            <Route path="/reservations" element={<ManualReservation />} />
            
            {/* Hotel Management Routes */}
            <Route path="/hotel" element={<HotelDetails />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            
            {/* Public Hotel View Routes */}
            <Route path="/hotels/:id" element={<HotelView />} />
            
            {/* Superadmin Routes */}
            <Route path="/superadmin" element={<AllHotels />} />
            <Route path="/superadmin/create-hotel" element={<CreateHotel />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Catch-all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
