import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Button3DProps {
  attackState: boolean;
  onClick: () => void;
}

export function Button3D({ attackState, onClick }: Button3DProps) {
  const baseRef = useRef<THREE.Mesh>(null);
  const topRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Hover scale effect
      const scale = hovered ? 1.05 : 1;
      groupRef.current.scale.setScalar(scale);
      
      // Pulse in attack mode
      if (attackState && topRef.current) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.01;
        topRef.current.scale.setScalar(pulse);
      }
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    onClick();
  };

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  return (
    <group ref={groupRef} scale={[0.6, 0.6, 0.6]} rotation={[1.1, 0, 0]}>
      {/* Base cube - orange */}
      <Box
        ref={baseRef}
        args={[2, 1.2, 2]}
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial 
          color="#ffa500" 
          metalness={0.1}
          roughness={0.3}
        />
      </Box>

      {/* Top cylinder - red/green */}
      <Cylinder
        ref={topRef}
        args={[0.6, 0.6, 0.3]}
        position={[0, 0.75, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial 
          color={attackState ? "#ff2020" : "#20ff20"}
          metalness={0.2}
          roughness={0.3}
          emissive={attackState ? "#110000" : "#001100"}
        />
      </Cylinder>

      {/* Lighting */}
      <pointLight 
        position={[2, 2, 2]} 
        intensity={0.9} 
        color={attackState ? "#ff4444" : "#44ff44"} 
      />
      <pointLight 
        position={[-2, 2, 2]} 
        intensity={0.9} 
        color="#ffffff" 
      />
    </group>
  );
} 