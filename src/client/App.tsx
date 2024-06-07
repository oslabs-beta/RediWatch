import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Signin from './components/Signin';

const App = () => {
  return (
    <div>
      <Signin />
    </div>
  );
};

createRoot(document.querySelector('#root')).render(<App />);