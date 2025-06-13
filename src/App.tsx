import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundScene } from './components/BackgroundScene';

function App() {
  const [attackState, setAttackState] = useState(true);

  const toggleAttackState = () => {
    setAttackState(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <BackgroundScene attackState={attackState} />
        </Canvas>
      </div>

      <header className="relative z-10 p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cyberpunk Experience</h1>
          <button
            onClick={toggleAttackState}
            className={`px-4 py-2 rounded font-mono transition-colors ${
              attackState 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {attackState ? 'SYSTEM COMPROMISED' : 'SYSTEM SECURE'}
          </button>
        </div>
      </header>
      <main className="relative z-10 container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="p-4 border border-gray-800 rounded">
            <h2 className="text-xl mb-4">V1 Components</h2>
            {/* V1 components will go here */}
          </section>
          <section className="p-4 border border-gray-800 rounded">
            <h2 className="text-xl mb-4">V2 Components</h2>
            {/* V2 components will go here */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App; 