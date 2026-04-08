import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Collections from './Components/Collections/Collections';
import NewArrivals from './Components/NewArrivals/NewArrivals';
import BlouseCollection from './Components/BlouseCollection/BlouseCollection';
import AboutUs from './Components/AboutUs/AboutUs';
import Banner from './Components/Banner/Banner';
import ContactUs from './Components/contactUs/ContactUs';
import ViewAllBlouses from './Components/AllBlouseCollections/ViewAllBlouses';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminPanel from './Components/Admin/AdminPanel';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location]);
  return null;
}

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#888' }}>
      Loading…
    </div>
  );
  return session ? children : <Navigate to="/admin/login" replace />;
}

const AppRoutes = () => (
  <>
    <ScrollToHash />
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Banner />
          <Collections />
          <NewArrivals />
          <BlouseCollection />
          <AboutUs />
          <ContactUs />
        </>
      } />
      <Route path="/blouses/all" element={
        <>
          <Navbar />
          <ViewAllBlouses />
        </>
      } />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      } />
    </Routes>
  </>
);

const App = () => (
  <AuthProvider>
    <SearchProvider>
      <Router basename="/muruganTexBlouse">
        <AppRoutes />
      </Router>
    </SearchProvider>
  </AuthProvider>
);

export default App;
