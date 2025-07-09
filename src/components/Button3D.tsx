import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
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
  const { camera, raycaster, mouse } = useThree();

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Hover scale effect
      const scale = hovered ? 1.1 : 1;
      groupRef.current.scale.setScalar(scale);
      
      // Pulse in attack mode
      if (attackState && topRef.current) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
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
    <group ref={groupRef} scale={[0.6, 0.6, 0.6]}>
      {/* Base cylinder - orange */}
      <Cylinder
        ref={baseRef}
        args={[0.8, 0.8, 1.2]}
        position={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial 
          color="#ff6600" 
          metalness={0.3}
          roughness={0.4}
        />
      </Cylinder>

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
          color={attackState ? "#ff0000" : "#00ff00"}
          metalness={0.5}
          roughness={0.2}
          emissive={attackState ? "#330000" : "#003300"}
        />
      </Cylinder>

      {/* Button text */}
      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[2, 0.3]} />
        <meshBasicMaterial 
          color={attackState ? "#ff0000" : "#00ff00"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Lighting */}
      <pointLight 
        position={[2, 2, 2]} 
        intensity={0.5} 
        color={attackState ? "#ff0000" : "#00ff00"} 
      />
      <pointLight 
        position={[-2, 2, 2]} 
        intensity={0.3} 
        color="#ffffff" 
      />
    </group>
  );
} 