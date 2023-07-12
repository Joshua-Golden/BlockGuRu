import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { customStyle, shadow, colors, sizes, spacing, device } from '../../../../constants/theme'
import { Image } from 'expo-image'
import PostCard from './PostCard';
import SectionHeader from '../SectionHeader';
import { useNavigation } from '@react-navigation/native';

export default function AllPosts({ postData }) {
  const navigation = useNavigation()

  // deconstructs object passed through route
  const { posts, isPostsLoading, postError, postsRefetch } = postData

  return (
    <View className="w-full items-start">
      <View className="w-full px-4">
        <SectionHeader title='All Posts' buttonTitle='View All' isButton={true} onPress={() => navigation.navigate('Posts', { posts: posts})}/>
      </View>
      <FlatList
        initialNumToRender={device.osName === 'iPadOS' ? 6 : 4}
        numColumns={device.osName === 'iPadOS' ? 3 : 2}
        showsHorizontalScrollIndicator
        decelerationRate={'fast'}
        scrollEnabled={false}
        data={device.osName === 'iPadOS' ? posts.slice(0,9) : posts.slice(0,8)}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal:15
        }}
        renderItem={({item, index})=>{
          return (
            <PostCard data={item} index={index}/>
          )    
        }}
        />
    </View>
  )
}

