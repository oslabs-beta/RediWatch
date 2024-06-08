import React from 'react';
import { createRoot } from 'react-dom/client';
import ConfigurationPage from './components/Configuration';


const App = () => {
  return (
    <>
      <div>
        <h1>Hello World!</h1>
        <ConfigurationPage/>
      </div>
    </>

  );
};

createRoot(document.querySelector('#root')).render(<App />);