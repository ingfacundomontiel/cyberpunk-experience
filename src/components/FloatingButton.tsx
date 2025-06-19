import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingButtonProps {
  isAttackMode: boolean;
  onPress: () => void;
  scrollY: number;
  currentSection: string;
}

export default function FloatingButton({ isAttackMode, onPress, scrollY, currentSection }: FloatingButtonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const buttonRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Active in the transition section regardless of attack mode (toggleable)
  const isActive = currentSection === "transition";



  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating animation
      groupRef.current.position.y = Math.sin(time * 2) * 0.2;
      groupRef.current.rotation.y = time * 0.3;

      // Position based on scroll - prominent in transition section
      if (currentSection === "transition") {
        groupRef.current.position.x = 2; // Move to the right when in transition
        groupRef.current.position.z = 1; // Bring closer when in transition
        groupRef.current.scale.setScalar(1.2); // Make bigger when in transition
      } else {
        groupRef.current.position.x = 0; // Center when not in transition
        groupRef.current.position.z = -3; // Push back when not in transition
        groupRef.current.scale.setScalar(0.6); // Make smaller when not in transition
      }
    }

    if (buttonRef.current && isActive) {
      const time = state.clock.getElapsedTime();
      // Pulsing effect when active (different speeds for different modes)
      const pulseSpeed = isAttackMode ? 4 : 2; // Faster pulse in attack mode
      const pulseIntensity = isAttackMode ? 0.15 : 0.08; // Stronger pulse in attack mode
      buttonRef.current.scale.setScalar(1 + Math.sin(time * pulseSpeed) * pulseIntensity);
    }
  });

  const handleClick = () => {
    if (isActive) {
      onPress(); // Toggle between attack and safe modes
    }
  };

  // Button stays visible but changes appearance after being pressed

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[3.7, 0, 0]}>
      {/* Button Base */}
      <RoundedBox args={[1.2, 0.3, 1.2]} radius={0.05} smoothness={4} position={[0, 0.2, 0]}>
        <meshStandardMaterial 
          color={isActive ? "#FFA500" : "#666666"} 
        />
      </RoundedBox>

      {/* Button Top */}
      <RoundedBox
        ref={buttonRef}
        args={[1.0, 0.4, 1.0]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color={
            isActive 
              ? (isAttackMode 
                  ? (hovered ? "#ff4444" : "#ff0000")  // Red when attack mode active
                  : (hovered ? "#44ff44" : "#00ff00")  // Green when safe mode active
                ) 
              : (isAttackMode ? "#330000" : "#003300")  // Dark when inactive
          }
          emissive={
            isActive 
              ? (isAttackMode ? "#440000" : "#004400")  // Red or green glow when active
              : "#000000"
          }
          emissiveIntensity={isActive ? 0.5 : 0.1}
        />
      </RoundedBox>

      {/* Button Label */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.15}
        color={isActive ? (isAttackMode ? "#ff0000" : "#00ff00") : "#666666"}
        anchorX="center"
        anchorY="middle"
      >
        {isAttackMode ? "EMERGENCY" : "SECURE"}
      </Text>

      {/* Status Indicator */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.1}
        color={isActive ? "#ffff00" : "#666666"}
        anchorX="center"
        anchorY="middle"
      >
        {isActive ? (isAttackMode ? "ACTIVATE SAFE MODE" : "ACTIVATE ATTACK MODE") : "INACTIVE"}
      </Text>

      {/* Invisible Click Area - Larger for easier clicking */}
      <mesh 
        position={[0, 0, 0]} 
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Glow Effect */}
      <mesh position={[0, 0, 0]} scale={isActive ? (hovered ? 1.8 : 1.5) : 0.8}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color={isActive ? (isAttackMode ? "#ff0000" : "#00ff00") : "#333333"} 
          transparent 
          opacity={isActive ? 0.2 : 0.05} 
        />
      </mesh>
    </group>
  );
} 