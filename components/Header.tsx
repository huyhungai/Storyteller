
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10 py-4 border-b border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Storyteller's Assistant
        </h1>
      </div>
    </header>
  );
};

export default Header;
