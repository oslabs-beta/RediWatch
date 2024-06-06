import React from 'react';
import { createRoot } from 'react-dom/client';


const App = () => {
  return (
    <>
      <div>
        <h1>Hello World!</h1>
      </div>
    </>

  );
};

createRoot(document.querySelector('#root')).render(<App />);