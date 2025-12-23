import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import EventDetail from "./pages/user/EventDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EventForm from "./pages/admin/EventForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<EventForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
