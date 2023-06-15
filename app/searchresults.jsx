import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform, Button, ScrollView, TextInput } from 'react-native';
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

const SearchResults = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

  return (
    <View className="flex">
    {/* Status Bar */}
    <StatusBar />
    {/* Navigation */}
    <SafeAreaView className={`flex bg-nhs-white border-b-[1px] border-neutral-200 + ${ios ? "py-4 -mb-10" : "py-4"}`}>
        <View className="flex-col mx-5 mb-3">            
            <View className="my-2 flex-row justify-center items-center rounded-sm px-2 bg-nhs-pale-grey">
                <TouchableOpacity className="justify-center items-center" onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25}/>
                </TouchableOpacity>
                <TextInput
                    className="text-lg flex-1 py-2 mb-1 pl-2 text-nhs-dark-grey"
                    placeholder={`What do you want to watch?`}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>            
        </View>
        <View className="bg-nhs-white px-5">
                <View className="bg-nhs-white mb-2">
                    <Text className="font-bold text-lg text-nhs-black">Search Results</Text>
                </View>
                <View className="h-full w-full justify-center mt-3  bg-nhs-white">
                    <CategoryGrid data={categories} />
                </View>
            </View>   
    </SafeAreaView>
    </View>
  )
}

export default SearchResults;