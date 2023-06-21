import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PostCard from './PostCard'

const PostList = (data) => {
  return (
    <View className="mb-3 border-b-[1px] border-neutral-200">
      <PostCard item={data} />
    </View>     
  ) 
};

export default PostList