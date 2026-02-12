import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DriverRegister from './pages/DriverRegister';
import DriverDashboard from './pages/driver/DriverDashboard';
import NewSchedule from './pages/driver/NewSchedule';
import ActiveAppointment from './pages/driver/ActiveAppointment';
import AppointmentHistory from './pages/driver/AppointmentHistory';
import Profile from './pages/driver/Profile';
import EditProfile from './pages/driver/EditProfile';
import OperatorDashboard from './pages/internal/OperatorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/driver" element={<DriverRegister />} />

        {/* Rotas Motorista */}
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/driver/shipment" element={<NewSchedule />} />
        <Route path="/driver/active" element={<ActiveAppointment />} />
        <Route path="/driver/history" element={<AppointmentHistory />} />
        <Route path="/driver/profile" element={<Profile />} />
        <Route path="/driver/profile/edit" element={<EditProfile />} />

        {/* Rotas Operador */}
        <Route path="/dashboard" element={<OperatorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
