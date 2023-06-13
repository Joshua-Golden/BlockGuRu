import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import PostCard from './PostCard'

const PostList = ({data}) => {
    const coffeeItems = data;
  return (
    <FlatList
      data={coffeeItems}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <View className="mb-3 border-b-[1px] border-neutral-200">
            <PostCard item={item} />
          </View>
        )
      }}
    />        
  )
}

export default PostList