import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Collections from './Components/Collections/Collections';
import NewArrivals from './Components/NewArrivals/NewArrivals';
import BlouseCollection from './Components/BlouseCollection/BlouseCollection';
import AboutUs from './Components/AboutUs/AboutUs';
import Banner from './Components/Banner/Banner';
import ContactUs from './Components/contactUs/ContactUs';
import ViewAllBlouses from './Components/AllBlouseCollections/ViewAllBlouses';
import { SearchProvider } from './contexts/SearchContext';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      // allow render to complete
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location]);

  return null;
}

const App = () => (
    <SearchProvider>
      <Router basename="/muruganTexBlouse">
        <Navbar />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={
            <>
            <Banner/>
              <Collections />
              <NewArrivals />
              <BlouseCollection />
              <AboutUs />
              <ContactUs />
            </>
          } />
          <Route path="/blouses/all" element={<ViewAllBlouses />} />
        </Routes>
      </Router>
    </SearchProvider>
);

export default App;