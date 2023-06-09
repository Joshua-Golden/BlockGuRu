import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, SrollView, Animated, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const SinglePostScreen = (item) => {
  const navigation = useNavigation();
  
  return (
    // Top Nav
    <View className="flex-1 bg-nhs-white">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Navigation */}
      <SafeAreaView className="border-b-[1px] border-neutral-200">
        <View className={`flex-row  mx-7 ${ios ? 'py-4' : 'py-5'}`}>
          <TouchableOpacity className="flex-row justify-center items-center" onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' color={NHSColors['nhs-blue']} size={30}/>
          </TouchableOpacity>
          <Text className="text-xl text-nhs-black ml-3">Single Post Screen</Text>        

        </View>
      </SafeAreaView>
      <View className="mt-3 py-3">
        <Text className="text-2xl text-nhs-black">{item.name}</Text>
      </View>
    </View>

)
};

export default SinglePostScreen