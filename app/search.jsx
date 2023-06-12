import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import SearchInput from '../components/Search/SearchInput';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const Search = () => {
  const navigation = useNavigation();
  
  return (
    <View className="flex">
    {/* Status Bar */}
    <StatusBar />
    {/* Navigation */}
    <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-6" : "py-4"}`}>
        <View className="flex-row justify-between items-center mx-5">
            <Text className="font-bold text-lg text-nhs-black">Search</Text>
        </View>
        <View>
          <SearchInput />
        </View>
    </SafeAreaView>

</View>

)
};

export default Search;