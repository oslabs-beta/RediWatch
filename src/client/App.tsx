/**
 * @module App.tsx
 * @description Main page of application. Contains all routing info
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// import React components for each route
import LandingPage from './components/LandingPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ConfigurationPage from './components/Configuration';
import Profile from './components/Profile';
import Home from './components/Home';
import Metrics from './components/Metrics';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
        <Route path="/metricsdata" element={<Metrics />} />
      </Routes>
    </Router>
  );
};

createRoot(document.querySelector('#root')!).render(<App />);
