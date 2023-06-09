import React from 'react'
import { View, Text } from 'react-native';

const Settings = ({ navigation }) => {
  return (
    <View>
      <Text
        onPress={() => navigation.navigate('Home')}
        className="text-[26px] font-bold"
      >
        Settings!
      </Text>
    </View>
  )
}

export default Settings