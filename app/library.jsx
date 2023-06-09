import React from 'react'
import { View, Text } from 'react-native';

const Library = ({ navigation }) => {
  return (
    <View>
      <Text
        onPress={() => navigation.navigate('Home')}
        className="text-[26px] font-bold"
      >
        Library!
      </Text>
    </View>
  )
}

export default Library;