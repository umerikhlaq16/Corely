import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar ko yahan import karein
import HeroSlider from './components/HeroSlider'; 
import LandingPage from './Pages/LandingPage';
import TalkPage from './Pages/Talk';
import StoriesPage from './Pages/StoriesPage';

import ShopPage from './Pages/ShopPage';
import WorkPage from './Pages/WorkPage';
import LandingPageV2 from './Pages/LandingPage2';
import AgencyPortfolio from './Pages/AgencyPortfolio';

// Pages
const Works = () => <div className="pt-32 px-10 text-white bg-black min-h-screen"><h1>Our Works Portfolio</h1></div>;
const Contact = () => <div className="pt-32 px-10 text-white bg-black min-h-screen"><h1>Contact Us</h1></div>;
const NotFound = () => <div className="pt-32 px-10 text-white bg-black min-h-screen"><h1>404 - Page Not Found</h1></div>;

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar /> 
        
        <Routes>

          <Route path="/" element={<HeroSlider />} />
          
          {/* Pages */}
          <Route path="/works" element={<Works />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/landing-v2" element={<LandingPageV2/>} />
          <Route path="/agency" element={<AgencyPortfolio />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/portfolio" element={<WorkPage/>} />
          <Route path="/shop" element={<ShopPage/>} />
          <Route path="/talk" element={<TalkPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
