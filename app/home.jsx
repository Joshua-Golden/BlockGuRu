import React, { useState, useEffect, Suspense } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

import { categories, coffeeItems } from '../constants';
import PostCard from '../components/Posts/PostCard';

import { NHSColors, sizes, spacing, ios } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import BottomScreen from '../components/Home/BottomScreen/BottomScreen';

// // 3D
import { Canvas } from '@react-three/fiber';
import ThreeDModel from '../components/ThreeD/ThreeDModel';

const Home = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(1);
  return (
    <View className="flex-1 bg-nhs-white">
        <View className="flex">
            {/* Status Bar */}
            <StatusBar />
            {/* Navigation */}
            <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-6" : "py-4"}`}>
                <View className="flex-row justify-between items-center mx-5">
                    <View className="p-4" />
                    <Text className="font-bold text-2xl text-nhs-black">Block GuRu</Text>
                    <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.navigate('settings')}>
                        <Ionicons name='settings' color={NHSColors['nhs-black']} size={25}/>
                     </TouchableOpacity>
                </View>
            </SafeAreaView>

        </View>
        <View className="flex-1 bg-nhs-pale-grey">
            <Canvas>
                <ambientLight color={'#005EB8'}/>
                <pointLight position={[10,10,10]} />

                <Suspense fallback={null}>
                    <ThreeDModel />
                </Suspense>
            </Canvas>
        </View>

        <BottomScreen items={coffeeItems} />
    </View>
  )
}

export default Home;