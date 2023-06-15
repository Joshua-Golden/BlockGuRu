import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors, ios } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';
import SearchInput from '../components/Search/SearchInput';
import PostGrid from '../components/Posts/PostGrid';
import PostList from '../components/Posts/PostList';
import Animated from 'react-native-reanimated';
import { categories, coffeeItems } from '../constants';
import CategoryGrid from '../components/Categories/CategoryGrid';

const Library = ({ title, route }) => {
  const navigation = useNavigation();
  
  return (
    <View className="flex">
    {/* Status Bar */}
    <StatusBar />
    {/* Navigation */}
    <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-10" : "py-4"}`}>
        <View className="flex-row mx-5 justify-between items-center">
            <Text className="font-bold text-2xl text-nhs-black">Library</Text>
            <TouchableOpacity onPress={() => navigation.navigate('searchresults')}>
              <Ionicons name="search" size={25}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>

    <View className="bg-nhs-white px-5">
      <View className="bg-nhs-white mb-2">
        <Text className="font-bold text-lg text-nhs-black">Browse all</Text>
      </View>
    
      <View className="h-full w-full justify-center mt-3  bg-nhs-white">
        <CategoryGrid data={categories} />
      </View>
    </View>

</View>

)
};

export default Library;