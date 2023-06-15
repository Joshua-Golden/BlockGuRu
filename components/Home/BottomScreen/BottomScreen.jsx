import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
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
import PostCategories from '../../Posts/PostCategories';
import PostList from '../../Posts/PostList';

import getVideos from '../../../actions/getVideos';
import getAllCategories from '../../../actions/getAllCategories';

const BottomScreen = ({ }) => {
  const snapPointsIOS = useMemo(() => ['50%', '7%', '17%', '65%', '84%'], []);
  const snapPointsANR = useMemo(() => ['50%', '7%', '17%', '65%', '90%'], []);
 
  const [ videos, setVideos ] = useState([]);
  useEffect(() => {
    async function getVideo() {
      const videos = await getVideos();
      setVideos(videos);
    }
    getVideo()
  }, [])  

  const [ categories, setCategories ] = useState([]);
  useEffect(() => {
    async function getCategory() {
      const categories = await getAllCategories();
      console.log(categories)
      setCategories(categories)
    }
    getCategory()
  }, [])  

  return (
    <BottomSheet
      index={0}
      animatedIndex={useSharedValue(0)}
      snapPoints={ios ? snapPointsIOS : snapPointsANR}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandler}>
      <View className="bg-nhs-black rounded-full p-[1.5px] my-8 mx-[35%]" />
      <View className="mb-6">        
        <PostCategories data={categories}/>
      </View>
      <View className="h-full justify-center mt-3 mx-4">
        <PostList data={videos} />
      </View>
          
      
    </BottomSheet>
  )
}

export default BottomScreen;