import React from 'react'
import { View, Text } from 'react-native';

const Search = ({ navigation }) => {
  return (
    <View>
      <Text
        onPress={() => navigation.navigate('Home')}
        className="text-[26px] font-bold"
      >
        Search!
      </Text>
    </View>
  )
}

export default Search