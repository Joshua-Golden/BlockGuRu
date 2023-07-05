import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import CarouselCard from './CarouselCard'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function NewReleases({ postData }) {
  
  const { posts, isPostsLoading, postError, postsRefetch } = postData

  return (
    <View className="w-full items-start">
      <FlatList
        horizontal
        initialNumToRender={5}
        showsHorizontalScrollIndicator
        decelerationRate={'fast'}
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item, index})=>{
          return (
            <CarouselCard data={item} index={index}/>
          )    
        }}
        />
    </View>
  )
}
