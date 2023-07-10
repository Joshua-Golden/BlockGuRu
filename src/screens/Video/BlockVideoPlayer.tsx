import { SafeAreaView,View, StyleSheet, Button, StatusBar } from 'react-native';
import { ResizeMode, Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import React, { useRef, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { height, width } from '../../../constants/theme';


export default function BlockVideoPlayer( { route, navigation } ) {
  const { post } = route.params
  const video = useRef(null)
  const [inFullscreen, setInFullsreen] = useState(false)

  async function toggleFullscreen() {
    if (inFullscreen) { 
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    } else if (!inFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    }
  }

  return (
    <SafeAreaView className="w-full items-center justify-center h-full bg-black">
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: post.video_path
          },
          ref: video,
        }}
        fullscreen={{
          enterFullscreen: () => {
            setInFullsreen(!inFullscreen)
            toggleFullscreen()
            video.current.setStatusAsync({
              shouldPlay: true,
            })
          },
          exitFullscreen: () => {
            setInFullsreen(!inFullscreen)
            toggleFullscreen()
            video.current.setStatusAsync({
              shouldPlay: false,
            })
          },
          inFullscreen,
        }}
        style={{ height: width, width: height }}
          slider={{
            visible: true,
          }}
      />
    </SafeAreaView>
    
  );
}
