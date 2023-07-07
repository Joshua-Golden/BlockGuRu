import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'
import CarouselCard from './RegionsCarouselCard';
import RegionsCarouselCard from './RegionsCarouselCard';

export default function BlockRegions({ regionData }) {
  const { regions, isRegionsLoading, regionsError, regionsRefetch } = regionData

  return (
    <View className="w-full items-start">
      <FlatList
        horizontal
        initialNumToRender={5}
        showsHorizontalScrollIndicator
        decelerationRate={'fast'}
        data={regions}
        keyExtractor={item => item.id}
        renderItem={({item, index})=>{
          return (
            <RegionsCarouselCard data={item} index={index}/>
          )    
        }}
        />
    </View>
  )
}