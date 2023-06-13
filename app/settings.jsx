import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import SettingsList from '../components/Settings/SettingsList';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const Settings = () => {
  const navigation = useNavigation();
  
  return (
    <View className="flex">
    {/* Status Bar */}
    <StatusBar />
    {/* Navigation */}
    <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-10" : "py-4"}`}>
        <View className="flex-row mx-5 items-center">
          <TouchableOpacity className="mr-3" onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={30} className="" />
          </TouchableOpacity>
            <Text className="font-bold text-2xl text-nhs-black">Settings</Text>
        </View>
    </SafeAreaView>

    <View className="bg-nhs-white px-5">
    
      <View className="h-full w-full mt-3  bg-nhs-white">
        <ScrollView>
        <SettingsList /></ScrollView>
      </View>
    </View>

</View>

)
};

export default Settings;