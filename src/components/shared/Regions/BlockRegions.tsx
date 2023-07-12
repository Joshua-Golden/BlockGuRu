import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'
import CarouselCard from './RegionsCarouselCard';
import RegionsCarouselCard from './RegionsCarouselCard';
import SectionHeader from '../SectionHeader';
import { useNavigation } from '@react-navigation/native';

export default function BlockRegions({ regionData }) {
  const navigation = useNavigation()
  // deconstructs data passed through the argument
  const { regions, isRegionsLoading, regionsError, regionsRefetch } = regionData

  return (
    <View className="w-full items-start">
      <View className="w-full px-4">
        <SectionHeader title='Regions' isButton={false}/>
      </View>
      <FlatList
        horizontal
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        data={regions}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal:15
        }}
        renderItem={({item, index})=>{
          return (
            <RegionsCarouselCard data={item} index={index}/>
          )    
        }}
        />
    </View>
  )
}