import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { DarkThemeColors, NHSColors } from '../../constants/theme';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function PostCard({item}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('post/singlePost', {...item})}>
      <View className="flex-row justify-center items-center mb-3">
        <View className="flex-row">
          <Image
            source={item.image} 
            style={{
              width:100,
              height:100,
              resizeMode: 'contain'
            }}/>
        </View>
        <View className="flex-row flex-1">
          <View className="flex-col ml-3 justify-cent">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-[12px] font-normal">Lorem Ipsumn Dolor sdkfjsdfkjsbdf. dfglkdnflgkndfg. sfdkbskdfjbsdfjkbksdf. sdfkusdfbsdkfjsbfk</Text>
          </View>
        </View>
        
      </View>
    </TouchableOpacity>
  )
}