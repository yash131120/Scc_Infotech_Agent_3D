import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshWobbleMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Vapi from '@vapi-ai/web';

interface WaveformProps {
  isActive: boolean;
  amplitude: number;
}

const Waveform: React.FC<WaveformProps> = ({ isActive, amplitude }) => {
  const waveRef = useRef<THREE.Group>(null);
  const wavePoints = useRef<THREE.Points[]>([]);

  useFrame((state) => {
    if (!isActive || !waveRef.current) return;

    wavePoints.current.forEach((points, index) => {
      if (points) {
        const time = state.clock.elapsedTime;
        const positions = points.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const angle = (i / 3) * 0.2 + time * 2;
          const radius = 0.8 + Math.sin(angle + index * 0.5) * amplitude * 0.3;
          positions[i] = Math.cos(angle) * radius; // x
          positions[i + 1] = Math.sin(angle) * radius; // y
          positions[i + 2] = Math.sin(time * 3 + index) * 0.1; // z
        }
        
        points.geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  if (!isActive) return null;

  return (
    <group ref={waveRef}>
      {[0, 1, 2].map((index) => {
        const pointCount = 50;
        const positions = new Float32Array(pointCount * 3);
        
        for (let i = 0; i < pointCount; i++) {
          const angle = (i / pointCount) * Math.PI * 2;
          positions[i * 3] = Math.cos(angle) * 0.8;
          positions[i * 3 + 1] = Math.sin(angle) * 0.8;
          positions[i * 3 + 2] = 0;
        }

        return (
          <points
            key={index}
            ref={(ref) => {
              if (ref) wavePoints.current[index] = ref;
            }}
            position={[0, 0, index * 0.1 - 0.1]}
          >
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={pointCount}
                array={positions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              color={['#00f2ff', '#ff00ff', '#00ff88'][index]}
              size={0.05}
              transparent
              opacity={0.8 - index * 0.2}
              blending={THREE.AdditiveBlending}
            />
          </points>
        );
      })}
    </group>
  );
};

const GlowingRing: React.FC = () => {
  const ringGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);
  
  const vapi = useRef<Vapi | null>(null);
  const [statusText, setStatusText] = useState('Click to talk to me');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [waveformAmplitude, setWaveformAmplitude] = useState(0.5);

  useEffect(() => {
    const vapiInstance = new Vapi('a9716cfe-0023-40f0-bf07-c8990d9754d8');
    vapi.current = vapiInstance;

    vapiInstance.on('call-start', () => {
      setIsConnected(true);
      setStatusText('Listening...');
      // Play click sound (optional)
      try {
        new Audio('/click.mp3').play().catch(() => {
          // Fallback if audio file doesn't exist
          console.log('Click sound not available');
        });
      } catch (error) {
        console.log('Audio not supported');
      }
    });

    vapiInstance.on('call-end', () => {
      setIsConnected(false);
      setIsSpeaking(false);
      setStatusText('Click to talk to me');
      setMessages([]);
    });

    vapiInstance.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapiInstance.on('transcript', (msg: { text: string, speaker: string }) => {
      const label = msg.speaker === 'user' ? '👤' : '🤖';
      const newMsg = `${label} ${msg.text}`;
      setMessages(prev => [newMsg, ...prev.slice(0, 2)]);
    });

    // Cleanup
    return () => {
      if (vapi.current) {
        vapi.current.stop();
      }
    };
  }, []);

  const handleClick = () => {
    if (vapi.current) {
      if (isConnected) {
        vapi.current.stop();
      } else {
        vapi.current.start('6f830557-574a-481f-af43-3691c48d522c');
      }
    }
  };

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (!isConnected && !isSpeaking) {
      // Idle animations - rings rotate and wobble
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        ring1Ref.current.rotation.y += 0.01;
        ring1Ref.current.rotation.z = Math.cos(time * 0.3) * 0.05;
      }
      
      if (ring2Ref.current) {
        ring2Ref.current.rotation.x = Math.cos(time * 0.7) * 0.15;
        ring2Ref.current.rotation.y -= 0.008;
        ring2Ref.current.rotation.z = Math.sin(time * 0.4) * 0.08;
      }
      
      if (ring3Ref.current) {
        ring3Ref.current.rotation.x = Math.sin(time * 0.6) * 0.12;
        ring3Ref.current.rotation.y += 0.012;
        ring3Ref.current.rotation.z = Math.cos(time * 0.5) * 0.06;
      }
      
      if (ring4Ref.current) {
        ring4Ref.current.rotation.x = Math.cos(time * 0.4) * 0.08;
        ring4Ref.current.rotation.y -= 0.015;
        ring4Ref.current.rotation.z = Math.sin(time * 0.6) * 0.1;
      }
    }
    
    // Update waveform amplitude based on speaking state
    if (isSpeaking) {
      setWaveformAmplitude(0.5 + Math.sin(time * 10) * 0.3);
    }
  });

  return (
    <Float 
      speed={isConnected ? 0 : 2} 
      rotationIntensity={isConnected ? 0 : 1} 
      floatIntensity={isConnected ? 0 : 1.5} 
      position={[0, 0, -2]}
    >
      <group 
        ref={ringGroupRef} 
        position={[0, 0, 0]} 
        onClick={handleClick} 
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* Ring 1 - Outermost - Teal */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.06, 16, 100]} />
          <MeshWobbleMaterial 
            color="#00f2ff" 
            factor={isConnected ? 0 : 0.3} 
            speed={isConnected ? 0 : 1} 
            emissive="#00f2ff" 
            emissiveIntensity={isConnected ? 0.8 : 0.4}
            metalness={0.8} 
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Ring 2 - Purple */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.8, 0.08, 16, 100]} />
          <MeshWobbleMaterial 
            color="#ff00ff" 
            factor={isConnected ? 0 : 0.4} 
            speed={isConnected ? 0 : 1.2} 
            emissive="#ff00ff" 
            emissiveIntensity={isConnected ? 0.7 : 0.3}
            metalness={0.7} 
            roughness={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Ring 3 - Green */}
        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.4, 0.05, 16, 100]} />
          <MeshWobbleMaterial 
            color="#00ff88" 
            factor={isConnected ? 0 : 0.5} 
            speed={isConnected ? 0 : 0.8} 
            emissive="#00ff88" 
            emissiveIntensity={isConnected ? 0.6 : 0.35}
            metalness={0.9} 
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Ring 4 - Innermost - Cyan */}
        <mesh ref={ring4Ref}>
          <torusGeometry args={[1.0, 0.04, 16, 100]} />
          <MeshWobbleMaterial 
            color="#00ffff" 
            factor={isConnected ? 0 : 0.6} 
            speed={isConnected ? 0 : 1.5} 
            emissive="#00ffff" 
            emissiveIntensity={isConnected ? 0.9 : 0.4}
            metalness={0.6} 
            roughness={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Waveform - Only visible when speaking */}
        <Waveform isActive={isSpeaking} amplitude={waveformAmplitude} />

        {/* Center Text */}
        {!isSpeaking && (
          <Text 
            position={[0, 0, 0.1]} 
            fontSize={0.25} 
            color="#ffffff" 
            anchorX="center" 
            anchorY="middle"
            maxWidth={3}
            textAlign="center"
          >
            {statusText}
          </Text>
        )}

        {/* Conversation Display */}
        {messages.length > 0 && (
          <group position={[0, -2.5, 0]}>
            <mesh>
              <planeGeometry args={[5, 2]} />
              <meshStandardMaterial 
                color="#000000" 
                transparent 
                opacity={0.7} 
                side={THREE.DoubleSide}
              />
            </mesh>

            {messages.map((msg, index) => (
              <Text
                key={index}
                position={[-2.2, 0.8 - index * 0.4, 0.01]}
                fontSize={0.18}
                color="#ffffff"
                anchorX="left"
                anchorY="middle"
                maxWidth={4.2}
              >
                {msg}
              </Text>
            ))}
          </group>
        )}

        {/* Pulsing outer glow when connected */}
        {isConnected && (
          <mesh>
            <torusGeometry args={[2.8, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#00f2ff"
              emissive="#00f2ff"
              emissiveIntensity={0.5 + Math.sin(Date.now() * 0.005) * 0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
};

export default GlowingRing;