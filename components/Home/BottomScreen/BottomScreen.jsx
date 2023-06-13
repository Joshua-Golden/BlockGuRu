import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
  } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

import CustomHandler from './CustomHandler';
import CustomBackground from './CustomBackground';

import { sizes, spacing, colors, ios } from '../../../constants/theme'
import BottomSheet from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import { categories, coffeeItems } from '../../../constants';
import PostCategories from '../../Posts/PostCategories';
import PostList from '../../Posts/PostList';

const BottomScreen = ({ items }) => {
  const snapPoints = useMemo(() => ['50%', '7%', '17%', '65%', '84%'], []);

  return (
    <BottomSheet
      index={0}
      animatedIndex={useSharedValue(0)}
      snapPoints={snapPoints}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandler}>
          <View className="bg-nhs-black rounded-full p-[1.5px] my-8 mx-[35%]" />
          <View className="mb-6">
            <PostCategories data={categories}/>
          </View>
          <ScrollView>
          <View className="flex-1 justify-center mt-3 mx-4">
            <PostList data={coffeeItems} />
          </View></ScrollView>
          
      
    </BottomSheet>
  )
}

export default BottomScreen;