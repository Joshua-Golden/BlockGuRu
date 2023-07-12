import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView,View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ResizeMode, Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import VideoPlayer from 'expo-video-player'
import { StatusBar } from 'expo-status-bar'

import { Ionicons } from '@expo/vector-icons';
import { device, height, width } from '../../../constants/theme';
import { Text } from 'react-native';


export default function BlockVideoPlayer( { route, navigation } ) {
  const { post } = route.params
  const [ videoPath, setVideoPath ] = useState('')
  const [ videoTitle, setVideoTitle ] = useState('')
  const [ imagePath, setImagePath ] = useState('')
  const video = useRef(null)

  useEffect(() => {
    if ( Object.hasOwn(post, 'uri')) {
      setVideoPath(post.uri)
      setImagePath(post.post.image_path)
      setVideoTitle(post.post.title)
    } else {
      setVideoPath(post.video_path)
      setImagePath(post.image_path)
      setVideoTitle(post.title)
    }
  }, [])


  return (
    <SafeAreaView className="w-full items-center justify-center h-full bg-black">
      <StatusBar hidden />
      <View style={{transform: [{rotate: '90deg'}], width:height, height:width}} className="justify-center items-center">
        <VideoPlayer
          videoProps={{
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: videoPath
            },
            usePoster: true,
            posterSource: { uri: imagePath},
            ref: video,
          }}
          autoHidePlayer
          style={{
            height: width,
            width: height - 50,
          }}
          header={
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} className={`flex-row w-full mt-4 justify-start items-center `}>
              <Ionicons name='chevron-back' color={'white'} size={20}/>
              <Text className="text-white ml-1 text-lg font-bold">{videoTitle}</Text>
            </TouchableOpacity>
          </>
          }
          slider={{ visible: true,}}
        />
        </View>
       
    </SafeAreaView>
    
  );
}