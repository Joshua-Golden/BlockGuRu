import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import getAllPosts from '../../../actions/getAllPosts';
import getAllCategories from '../../../actions/getAllCategories';
import getPostCategoryByID from '../../../actions/getPostCategoryByID';
import { SmallButton } from '../../components/shared/Button';

import * as SecureStore from 'expo-secure-store';

export default function Library() {
  const [ videos, setVideos ] = useState('')
  async function getVideos(key) {
    let result = await SecureStore.getItemAsync(key);
    setVideos(result)
  }

  console.log(videos)

  return (
    <SafeAreaView className="w-full h-full bg-nhs-white">
      <View>

      <Text>Library</Text>
      </View>
      <View className='w-full h-full justify-center items-center'>
          
        <TouchableOpacity className="p-5 bg-nhs-dark-grey" onPress={() => getVideos('id')}>
          <Text> Get Videos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}