import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Button3D } from './Button3D';

interface Button3DWrapperProps {
  attackState: boolean;
  onClick: () => void;
  show: boolean;
}

export function Button3DWrapper({ attackState, onClick, show }: Button3DWrapperProps) {
  if (!show) return null;

  return (
    <div 
      className="relative pointer-events-auto"
      style={{
        width: '300px',
        height: '300px',
        position: 'relative',
        margin: 'auto',
        cursor: 'pointer',
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 4], 
          fov: 45 
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative'
        }}
      >
        <ambientLight intensity={0.4} />
        <Button3D 
          attackState={attackState} 
          onClick={onClick} 
        />
      </Canvas>
    </div>
  );
} 