import React from 'react'
import { View, Text } from 'react-native';

import { LightThemeColors } from '../constants/theme';

const Home = () => {
  return (
    <View className="h-full bg-nhs-white">
      <Text
        onPress={() => alert('This is the HomeScreen.')}
        className="text-[26px] font-bold"
      >
        Home!
      </Text>
    </View>
  )
}

export default Home;