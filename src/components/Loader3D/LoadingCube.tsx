import { GradientTexture, Html, useGLTF, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useTransition } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    LoadingCube: THREE.Mesh;
  };
};

export function LoadingCube(props: JSX.IntrinsicElements["group"]) {
  const [, startTransition] = useTransition();
  const { progress } = useProgress();
  const { nodes } = useGLTF("/loadingCube-transformed.glb") as GLTFResult;

  const { textColor } = useControls("loader", {
    cubeColor: "#dfdefc",
    textColor: "#222",
  });

  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    startTransition(() => {
      if (cubeRef.current) {
        cubeRef.current.rotation.x = Math.sin(clock.getElapsedTime());
        cubeRef.current.rotation.y = Math.cos(clock.getElapsedTime());
      }
    });
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={cubeRef}
        castShadow
        receiveShadow
        geometry={nodes.LoadingCube.geometry}
        scale={0.5}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
      >
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.4, 1]} // As many stops as you want
            colors={["#f55151", "#d1a3ff", "#f55151"]} // Colors need to match the number of stops
          />
        </meshBasicMaterial>
      </mesh>

      <Html
        as="div"
        role="progressbar"
        style={{
          position: "relative",
          textAlign: "center",
        }}
        center
      >
        <p
          style={{
            fontSize: 24,
            color: textColor,
            fontWeight: "bold",
            position: "absolute",
            left: "-1.25rem",
            top: "3.5rem",
          }}
        >
          {progress.toFixed()}%
        </p>
      </Html>
    </group>
  );
}

useGLTF.preload("/loadingCube-transformed.glb");
