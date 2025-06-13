import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

interface BackgroundSceneProps {
  attackState?: boolean;
  scrollY?: number;
}

function FlowingLines({ attackState = true, scrollY = 0 }: BackgroundSceneProps) {
  const linesRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>();

  // Create single shared material for all lines
  const sharedMaterial = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: attackState ? "#ff0000" : "#00ff00",
      transparent: true,
      opacity: 0.3
    });
    materialRef.current = material;
    return material;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        line.position.x += attackState ? Math.sin(state.clock.elapsedTime + index) * 0.02 : 0.0001;

        // Extend the reset boundary to match the longer lines
        if (line.position.x > 20) {
          line.position.x = -20;
        }
      });
    }

    // Update shared material color when attackState changes
    if (materialRef.current) {
      const targetColor = attackState ? "#ff0000" : "#00ff00";
      materialRef.current.color.setHex(parseInt(targetColor.replace('#', ''), 16));
    }
  });

  // Memoize geometry creation for better performance
  const lines = useMemo(() => {
    const lineArray = [];
    
    // Back to 20 lines for proper tornado density
    for (let i = 0; i < 20; i++) {
      const points = [];
      // Reduced to 50 points but doubled spacing to maintain line length
      for (let j = 0; j < 50; j++) {
        // Keep the EXACT same spiral math, just with adjusted spacing
        points.push(new THREE.Vector3(j * 0.8 - 20, Math.sin(j * 0.4 + i) * 2, Math.cos(j * 0.2 + i) * 2));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineArray.push(
        <primitive key={i} object={new THREE.Line(geometry, sharedMaterial)} />
      );
    }
    
    return lineArray;
  }, [sharedMaterial]);

  return <group ref={linesRef}>{lines}</group>;
}

export function BackgroundScene({ attackState = true, scrollY = 0 }: BackgroundSceneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const colorsRef = useRef<Float32Array | null>(null);

  // Create initial positions and colors
  const { positions, initialColors } = useMemo(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Initial colors (red)
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.1;
      colors[i * 3 + 2] = 0.1;
    }

    return { positions, initialColors: colors };
  }, []);

  // Initialize colorsRef
  if (!colorsRef.current) {
    colorsRef.current = initialColors;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }

    if (particlesRef.current && colorsRef.current) {
      particlesRef.current.rotation.y += attackState ? 0.02 : 0.005;

      // Update colors based on attackState
      const targetColor = attackState ? new THREE.Color(1, 0.1, 0.1) : new THREE.Color(0.1, 1, 0.1);
      
      // Smoothly interpolate colors
      for (let i = 0; i < colorsRef.current.length; i += 3) {
        colorsRef.current[i] += (targetColor.r - colorsRef.current[i]) * 0.1;
        colorsRef.current[i + 1] += (targetColor.g - colorsRef.current[i + 1]) * 0.1;
        colorsRef.current[i + 2] += (targetColor.b - colorsRef.current[i + 2]) * 0.1;
      }

      // Update the colors in the geometry
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group ref={meshRef}>
      <Environment preset="night" />

      {/* Flowing Lines Background */}
      <FlowingLines attackState={attackState} scrollY={scrollY} />

      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={1000} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={1000} array={colorsRef.current} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
} 