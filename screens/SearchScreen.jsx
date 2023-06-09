import React from 'react'
import { View, Text } from 'react-native';

const SearchScreen = ({ navigation }) => {
  return (
    <View>
      <Text
        onPress={() => navigation.navigate('Home')}
        className="text-[26px] font-bold"
      >
        Search Screen!
      </Text>
    </View>
  )
}

export default SearchScreen