/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useStore } from "../utils";

type GLTFResult = GLTF & {
  nodes: {
    druid: THREE.SkinnedMesh;
    root: THREE.Bone;
  };
  materials: {
    color_main: THREE.MeshStandardMaterial;
  };
};

type ActionName = "PortalOpen" | "Still" | "Waiting";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export default function Npc(props: JSX.IntrinsicElements["group"]) {
  const store = useStore();
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf",
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  return (
    <group
      ref={group}
      scale={3}
      rotation-y={Math.PI}
      position={[-1, 0, 10]}
      {...props}
      onClick={() => {
        store.setSelected("Druid");
        actions.PortalOpen.play();
      }}
      dispose={null}
    >
      {store.selected && (
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
          <ringGeometry args={[0, 2]} />
          <meshBasicMaterial color={0x008822} transparent opacity={0.25} />
        </mesh>
      )}
      <group scale={1.91}>
        <primitive object={nodes.root} />
        <skinnedMesh
          geometry={nodes.druid.geometry}
          material={materials.color_main}
          skeleton={nodes.druid.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf",
);
