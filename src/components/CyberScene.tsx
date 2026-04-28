import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Wireframe, Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const Core = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x += delta * 0.1;
  });
  return (
    <group ref={ref}>
      {/* Inner solid icosahedron */}
      <Icosahedron args={[0.9, 1]}>
        <meshStandardMaterial
          color="#10D9A4"
          emissive="#10D9A4"
          emissiveIntensity={0.6}
          wireframe
        />
      </Icosahedron>
      {/* Outer wireframe shell */}
      <Icosahedron args={[1.6, 1]}>
        <meshBasicMaterial color="#10D9A4" wireframe transparent opacity={0.35} />
      </Icosahedron>
      {/* Red secondary shell */}
      <Icosahedron args={[2.2, 0]}>
        <meshBasicMaterial color="#F4A53C" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  );
};

const OrbitRing = ({
  radius,
  speed,
  color,
  tilt,
}: {
  radius: number;
  speed: number;
  color: string;
  tilt: [number, number, number];
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.012, 16, 100]} rotation={tilt}>
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </Torus>
  );
};

const Particles = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.05;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#10D9A4" transparent opacity={0.7} />
    </points>
  );
};

export const CyberScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#10D9A4" intensity={2} />
        <pointLight position={[-5, -3, -5]} color="#F4A53C" intensity={1.5} />
        <pointLight position={[0, 5, -3]} color="#8B7FE8" intensity={1} />

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
          <Core />
        </Float>

        <OrbitRing radius={2.6} speed={0.4} color="#10D9A4" tilt={[Math.PI / 3, 0, 0]} />
        <OrbitRing radius={2.9} speed={-0.3} color="#F4A53C" tilt={[Math.PI / 4, Math.PI / 4, 0]} />
        <OrbitRing radius={3.2} speed={0.2} color="#8B7FE8" tilt={[0, Math.PI / 3, Math.PI / 4]} />

        <Particles />
        <Stars radius={50} depth={30} count={1500} factor={2} fade speed={0.5} />
      </Suspense>
    </Canvas>
  );
};
