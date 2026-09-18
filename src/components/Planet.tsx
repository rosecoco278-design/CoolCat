import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Preload, useGLTF } from "@react-three/drei";

function PlanetModel() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}planet/scene.gltf`);
  return <primitive object={scene} scale={2.5} position-y={0} rotation-y={0} />;
}

function CanvasLoader() {
  return (
    <Html center>
      <span className="text-muted-foreground text-sm whitespace-nowrap">Loading…</span>
    </Html>
  );
}

export default function PlanetCanvas() {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1} />
        <PlanetModel />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
