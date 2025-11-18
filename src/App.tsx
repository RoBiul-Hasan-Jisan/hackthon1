import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Appointments from '@/pages/Appointments';
import Patients from '@/pages/Patients';
import PatientDetail from '@/pages/PatientDetail';
import Settings from '@/pages/Settings';

import './styles/globals.css';

function App() {
  const isAuthenticated = false;

  return (
    // REMOVED: <Router> wrapper
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header />}
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 min-h-screen ${isAuthenticated ? 'ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      {!isAuthenticated && <Footer />}
    </div>
    // REMOVED: </Router> closing tag
  );
}

export default App;