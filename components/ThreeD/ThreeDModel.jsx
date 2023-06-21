// 3D Imports
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef, Suspense, useLayoutEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';



export default function ThreeDModel(props) {
  const material = useLoader(MTLLoader, require('../../assets/Model/material/human-body.mtl'))
  const obj = useLoader(
    OBJLoader,
    require('../../assets/Model/human-body.obj')
  );

  const mesh = useRef();
  // useLayoutEffect(() => {
  //   obj.traverse((child) => {
  //     if (child instanceof THREE.Mesh) {
  //       child.material.map = base;
  //     }
  //   })
  // })

  useFrame(( state, delta) => {
    mesh.current.rotation.y += delta;
  });
  
  return (
    <mesh ref={mesh} position={[0,1,0]} rotation={[0,1,0]}>
      <primitive object={obj} scale={0.002} />
    </mesh>
  )
}