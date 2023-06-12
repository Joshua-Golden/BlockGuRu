import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import PostCard from './PostCard'

const PostList = ({data}) => {
    const coffeeItems = data;
  return (
    <View className="flex-1 justify-center mt-3 mx-4">
        <FlatList
          showsVerticalScrollIndicator
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
      </View>
  )
}

export default PostList