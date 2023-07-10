import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import {SmallButton} from '../Button';
import { customStyle } from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function HeroPost( { postData } ) {
  const navigation = useNavigation()
  const { posts, isPostsLoading, postError, postsRefetch } = postData
  
  const post = posts[0]
  
  return (
    <View className="flex w-full h-full bg-nhs-pale-grey">
      <View className="flex-1 bg-black">
        <Image
          source={{uri: post.image_path}}
          style={{
            width: '110%',
            height: '100%'
          }}
          contentFit='cover'
        />
        <View className="absolute bg-black/50 h-full w-full"/>
      </View>
      <View className="absolute bottom-0 pb-4 px-4 w-full">
        <View className="mb-3 ">
            <Text className="text-white" style={customStyle.h1}>{post.title}</Text>
            <View className="flex-row gap-1">
              <Text className="capitalize text-white" style={customStyle.p}>{post.tags.join(', ')}</Text>
            </View>
        </View>
        <View className="w-full gap-2 flex-row justify-start items-center">
            <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', {post: post})}>
                <SmallButton text="Play" borderColor='light-green' textColor='white' color='light-green' icon='play-circle' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post', {post: post})}>
                <SmallButton text="Read More" borderColor='light-green' textColor='light-green' color='white' transparent={true} icon='md-information-circle-sharp' />
            </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}