import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export default function CategoryItem({ data, index }) {
    const navigation = useNavigation()
  return (
    <TouchableOpacity 
        onPress={() => navigation.navigate('category', {category: data})}
        className="flex-1 justify-center items-center border-2 rounded-lg border-nhs-light-green px-3 py-2"
    >
      <Text className="text-nhs-light-green">{data.title}</Text>
    </TouchableOpacity>
  )
}