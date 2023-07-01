// 3D Imports
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef, Suspense, useLayoutEffect, useEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Asset, useAssets } from 'expo-asset'
import { useTimer } from 'use-timer'

export default function ThreeDModel({ object, material }) {
  const { time, start, pause, reset, status } = useTimer();

  useEffect(() => {
    async function prepare() {
      const [ material, object ] = await Asset.loadAsync([require('../../assets/ThreeDModel/material/human-body.mtl'), require('../../assets/ThreeDModel/human-body.obj')])
    }

    prepare();
  }, [ object, material ])

  const obj = useLoader(
    OBJLoader,
    require('../../assets/ThreeDModel/human-body.obj')
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
    if ( status === "RUNNING" ) {
      mesh.current.rotation.y += delta;
    }
    if ( status === "RUNNING" && time >= 2 ) {
      pause()
      reset()
    }
  });
  
  return (
    <mesh ref={mesh} position={[0,1,0]} rotation={[0,1,0]}>
      <primitive object={obj} material={material} scale={0.002} />
    </mesh>
  )
}