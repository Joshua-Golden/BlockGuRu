import { View, Text } from 'react-native'
import React, { Dispatch, SetStateAction, Suspense } from 'react'

// // 3D
import { Canvas } from '@react-three/fiber';
import ThreeDModel from '../components/ThreeD/ThreeDModel';

interface SplashProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Splash({
    setIsLoading
}) {
  return (
    <View className="flex-1 bg-white">
        <Canvas>
            <ambientLight color={'#005EB8'}/>
            <pointLight position={[10,10,10]} />

            <Suspense fallback={null}>
                <ThreeDModel />
            </Suspense>
        </Canvas>
    </View>
  )
}