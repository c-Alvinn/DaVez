import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Login from './pages/auth/login/Login';
import DriverRegister from './pages/driver/register/DriverRegister';
import DriverDashboard from './pages/driver/dashboard/DriverDashboard';
import NewSchedule from './pages/driver/new-schedule/NewSchedule';
import ActiveAppointment from './pages/driver/active-appointment/ActiveAppointment';
import AppointmentHistory from './pages/driver/history/AppointmentHistory';
import Profile from './pages/driver/profile/Profile';
import EditProfile from './pages/driver/profile-edit/EditProfile';
import OperatorDashboard from './pages/operator/dashboard/OperatorDashboard';

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
