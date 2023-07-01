import { SafeAreaView,View, StyleSheet, Button, StatusBar } from 'react-native';
import VideoPlayer from 'expo-reanimated-av-player';
import { useSharedValue } from 'react-native-reanimated';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';


export default function Video( { post } ) {
  const navigation = useNavigation()
  const videoHeight = useSharedValue(200);
  const isFullScreen = useSharedValue(false);
  return (
    <SafeAreaView className="bg-black">
      <VideoPlayer
        source={{ uri: post.video_path}}
        headerBarTitle={`fullscreen title`}
        onToggleAutoPlay={(state: boolean) => {
          console.log(`onToggleAutoPlay state: ${state}`);
        }}
        videoDefaultHeight={200}
        videoHeight={videoHeight}
        resizeMode="cover"
        showOnStart={true}
        isFullScreen={isFullScreen}
        onTapBack={() => {
          console.log('onTapBack');
        }}
        renderBackIcon={() => <Ionicons name="arrow-back" size={15} color={'white'}/>}
        onTapMore={() => {
          console.log('onTapMore');
        }}
      />

    </SafeAreaView>
    
  );
}
