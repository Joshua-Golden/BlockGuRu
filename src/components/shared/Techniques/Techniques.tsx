import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'
import SectionHeader from '../SectionHeader';
import { useNavigation } from '@react-navigation/native';
import TechniquesCarouselCard from './TechniquesCarouselCard';

export default function Techniques({ techniqueData }) {
  const navigation = useNavigation()
  const { techniques, isTechniquesLoading, techniquesError, techniquesRefetch } = techniqueData
    
  return (
    <View className="w-full items-start">
      <View className="w-full px-4">
        <SectionHeader title='Techniques' isButton={false}/>
      </View>
      <FlatList
        horizontal
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        data={techniques}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal:15
        }}
        renderItem={({item, index})=>{
          return (
            <TechniquesCarouselCard data={item} index={index}/>
          )    
        }}
        />
    </View>
  )
}