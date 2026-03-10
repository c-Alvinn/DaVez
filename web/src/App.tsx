import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing/Landing';
import AboutUs from './pages/landing/AboutUs/AboutUs';
import Services from './pages/landing/Services/Services';
import Contact from './pages/landing/Contact/Contact';
import Login from './pages/auth/login/Login';
import DriverRegister from './pages/driver/register/DriverRegister';
import DriverDashboard from './pages/driver/dashboard/DriverDashboard';
import NewSchedule from './pages/driver/new-schedule/NewSchedule';
import ActiveAppointment from './pages/driver/active-appointment/ActiveAppointment';
import AppointmentHistory from './pages/driver/history/AppointmentHistory';
import Profile from './pages/driver/profile/Profile';
import EditProfile from './pages/driver/profile-edit/EditProfile';
import OperatorDashboard from './pages/operator/dashboard/OperatorDashboard';
import CarrierDashboard from './pages/carrier/dashboard/CarrierDashboard';
import NotFound from './pages/error/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sobre" element={<AboutUs />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/contato" element={<Contact />} />
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

        {/* Rotas Transportadora */}
        <Route path="/carrier" element={<CarrierDashboard />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
