import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import {Image} from 'expo-image';
import { NHSColors, ios, width, height } from '../../constants/theme';

export default function PostCard({item}) {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('post', {item})}>
      <View className="flex-row justify-center items-center mb-3">
        <View className="flex-row">
          <Image
            source={ios? {uri: item.image_path} : {uri: item.image_path, headers: {Accept: '*/*'}}} 
            style={{
              width:150,
              height:84.375
            }}
            contentFit="cover"/>
        </View>
        <View className="flex-row flex-1">
          <View className="flex-col ml-3 justify-cent">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-[12px] font-normal">{item.author}</Text>
          </View>
        </View>
        
      </View>
    </TouchableOpacity>
  )
}