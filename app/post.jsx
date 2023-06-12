import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { View, Text, ScrollView, Animated, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { NHSColors } from '../constants/theme';

// Icons
import { Ionicons,Foundation,Feather } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const Post = (data) => {
    const item = data.route.params
    const navigation = useNavigation();
  
    return (
        <View className="flex-1 bg-nhs-white">
            <ScrollView className="h-full" >
                <View className="relative">
                    <Image className="w-full h-72" source={item.image} />
                    <TouchableOpacity 
                        onPress={()=>navigation.goBack()} 
                        className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                        <Ionicons name='arrow-back' color={NHSColors['nhs-blue']} size={30}/>
                    </TouchableOpacity>
                </View>
                <ScrollView className="h-full">
                    <View 
                        style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} 
                        className="flex-1 bg-white pt-6">
                        <View className="flex-1 px-5">
                            <View className="flex-row space-x-2 my-1">
                                <View className="flex-row items-center space-x-1">
                                    <Image 
                                        source={item.image} 
                                        className="h-4 w-4" />
                                    <Text className="font-semibold text-gray-700">{item.price}</Text>
                                </View>
                                <View className="flex-row items-center space-x-1">
                                    <Text className="text-gray-800 text-xs">{item.volume}</Text>
                                </View>
                            </View>
                            <Text className="text-gray-500 mt-2">{item.desc}</Text>
                                
                                
                        </View>                
                    </View>
                </ScrollView>
                
            </ScrollView>
        </View>

)
};

export default Post