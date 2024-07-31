import React from 'react';
import Body from './Components/Body.jsx';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-serif font-bold text-gray-800 tracking-widest uppercase border-b-4 border-gray-700 inline-block pb-2">
          Morning Messages
        </h1>
      </header>
      <Body />
    </div>
  );
}

export default App;
