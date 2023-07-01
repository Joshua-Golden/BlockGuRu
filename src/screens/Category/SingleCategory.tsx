import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SingleCategory({ route, navigation }) {
    const { category } = route.params
    console.log(category)
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>{category.title}</Text>
      </TouchableOpacity>
    </View>
  )
}