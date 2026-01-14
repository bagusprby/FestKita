import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/user/Home';
import Events from './pages/user/Events';
import EventDetail from './pages/user/EventDetail';
import About from './pages/user/About';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import EventForm from './pages/admin/EventForm';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes - dengan Navbar */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/events" element={<><Navbar /><Events /></>} />
          <Route path="/event/:id" element={<><Navbar /><EventDetail /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          
          {/* Admin Login - tanpa protection */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes - dengan ProtectedRoute */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/event/create" 
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/event/edit/:id" 
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            } 
          />
          {/* Fallback: Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;