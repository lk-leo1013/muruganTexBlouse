import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Collections from './Components/Collections/Collections';
import NewArrivals from './Components/NewArrivals/NewArrivals';
import BlouseCollection from './Components/BlouseCollection/BlouseCollection';
import AboutUs from './Components/AboutUs/AboutUs';
import Banner from './Components/Banner/Banner';
import ContactUs from './Components/contactUs/ContactUs';
import ViewAllBlouses from './Components/AllBlouseCollections/ViewAllBlouses';
import { SearchProvider } from './contexts/SearchContext';

const App = () => (
    <SearchProvider>
      <Router>
        <Navbar />
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