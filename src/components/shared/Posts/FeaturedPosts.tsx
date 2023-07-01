import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'
import CarouselCard from './CarouselCard';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function FeaturedPosts({ postData }) {
  const { posts, isPostsLoading, postError, postsRefetch } = postData

  let featured = new Array
  try {
    posts.map(post => {
      if (post.featured) {
        featured.push(post)
      }
    })
  } catch (error) {
    console.log(error.message)
  } finally {
    
  }

  return (
    <View className="w-full items-start">
      <FlatList
        horizontal
        initialNumToRender={5}
        showsHorizontalScrollIndicator
        decelerationRate={'fast'}
        data={featured}
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

