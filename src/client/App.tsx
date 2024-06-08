import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ConfigurationPage from './components/Configuration';
import Home from './components/Home';
import Metrics from './components/Metrics';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/configuration" element={<ConfigurationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ConfigurationPage />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </Router>
  );
};

createRoot(document.querySelector('#root')!).render(<App />);
