import React, { useEffect, useRef, useState } from 'react';
import { Float, MeshWobbleMaterial, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Vapi from '@vapi-ai/web';

const GlowingRing = () => {
  const ringRef = useRef<THREE.Mesh>(null!);
  const vapi = useRef<Vapi | null>(null);
  const [statusText, setStatusText] = useState('click to talk to me');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi('a9716cfe-0023-40f0-bf07-c8990d9754d8');
    vapi.current = vapiInstance;

    vapiInstance.on('call-start', () => {
      setStatusText('Listening...');
    });

    vapiInstance.on('call-end', () => {
      setStatusText('click to talk to me');
      setIsSpeaking(false);
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
      setMessages(prev => [newMsg, ...prev.slice(0, 2)]); // keep only last 3
    });
  }, []);

  const handleClick = () => {
    if (vapi.current) {
      vapi.current.start('6f830557-574a-481f-af43-3691c48d522c');
    }
  };

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.01;
      ringRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
  <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[0, 0, -2]}>
    <group position={[0, 0, 0]} onClick={handleClick} cursor="pointer">
      {/* Main Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.08, 16, 100]} />
        <MeshWobbleMaterial color="#00f2ff" factor={0.7} speed={2} emissive="#0ff" metalness={0.8} />
      </mesh>

      {/* Text label above ring */}
      <Text position={[0, 0, 0.1]} fontSize={0.3} color="#00f2ff" anchorX="center" anchorY="middle">
        {statusText}
      </Text>

      {/* Bottom Conversation Tab */}
      <group position={[0, -1.8, 0]}>
        <mesh>
          <planeGeometry args={[4, 1.5]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.5} />
        </mesh>

        {messages.map((msg, index) => (
          <Text
            key={index}
            position={[-1.8, 0.6 - index * 0.5, 0.01]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="left"
            anchorY="middle"
            maxWidth={3.5}
          >
            {msg}
          </Text>
        ))}
      </group>
    </group>
  </Float>
);

};

export default GlowingRing;
