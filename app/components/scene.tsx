"use client";
import { Grid, Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Suspense, useRef, useState } from "react";
// @ts-ignore
import { useGame } from "ecctrl";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Mesh, Vector3 } from "three";
import { useLoader } from "@react-three/fiber";
import { useStore } from "../utils";
import { Village } from "./village";
import Npc from "./npc";

function Model1() {
  const fbx = useLoader(FBXLoader, "/Ch22_nonPBR.fbx");
  const store = useStore();
  return (
    <mesh
      onClick={() => store.setSelected("Helen")}
      rotation-y={Math.PI}
      position={[0, 0, 10]}
    >
      <mesh position={[0, 0.2, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0, 1]} />
        <meshBasicMaterial color={0x008822} transparent opacity={0.25} />
      </mesh>

      <mesh rotation-y scale={0.02}>
        <primitive object={fbx} />;
      </mesh>
    </mesh>
  );
}

function Model2() {
  const fbx = useLoader(FBXLoader, "/Ch14_nonPBR.fbx");
  const store = useStore();
  return (
    <mesh
      onClick={() => store.setSelected("Mouse")}
      rotation-y={Math.PI}
      position={[10, 0, 10]}
    >
      <mesh position={[0, 0.2, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0, 1]} />
        <meshBasicMaterial color={0x008822} transparent opacity={0.25} />
      </mesh>

      <mesh rotation-y scale={0.02}>
        <primitive object={fbx} />;
      </mesh>
    </mesh>
  );
}

function Scene() {
  // @ts-ignore
  const setMoveToPoint = useGame((state) => state.setMoveToPoint);
  const circleRef = useRef<Mesh>(null);
  const date = useRef(0);
  // @ts-ignore
  const [currentPoint, setCurrentPoint] = useState<Vector3>();
  return (
    <>
      <Perf position="top-left" />
      <mesh ref={circleRef} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.2, 0.3]} />
        <meshBasicMaterial color={0x000000} transparent opacity={0.25} />
      </mesh>
      <ambientLight intensity={0.2} />
      {currentPoint && (
        <mesh position={currentPoint} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.2, 0.3]} />
          <meshBasicMaterial color={0x0000ff} transparent />
        </mesh>
      )}
      <directionalLight
        position={[-2, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />

      <Grid args={[100, 100]} position={[0, 0.1, 0]} />
      <Suspense fallback="loading...">
        <Village />
        <Npc />
      </Suspense>
      <RigidBody type="fixed">
        <Plane
          onPointerMove={({ point }) => {
            if (!circleRef?.current?.position) return;
            circleRef.current.position.z = point.z;
            circleRef.current.position.x = point.x;
            circleRef.current.position.y = point.y + 0.01;
          }}
          onPointerDown={() => {
            date.current = Date.now();
          }}
          onPointerUp={({ point }) => {
            if (Date.now() - date.current < 200) {
              // a quick click
              setMoveToPoint(point);
              setCurrentPoint(point.add(new Vector3(0, 0.01, 0)));
            }
          }}
          args={[100, 100]}
          rotation-x={-Math.PI / 2}
        />
      </RigidBody>
    </>
  );
}

export { Scene };
