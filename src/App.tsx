import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Navbar from './components/Navbar';
import Clients from './pages/Clients';
import Cases from './pages/Cases';
import Appointments from './pages/Appointments';
import ClientDetail from './pages/ClientDetail';
import CaseDetail from './pages/CaseDetail';
import AppointmentDetail from './pages/AppointmentDetail';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <header className="bg-black/80 backdrop-blur-xl border-b border-white/10 lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-white text-xl font-semibold">Law Office Manager</h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        <div className="flex">
          <Navbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 p-4 lg:p-8 lg:pl-28">
            <Routes>
              <Route path="/" element={<Clients />} />
              <Route path="/clients/:id" element={<ClientDetail />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:id" element={<CaseDetail />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/appointments/:id" element={<AppointmentDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;