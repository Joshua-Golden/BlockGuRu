import * as React from 'react';
import { SafeAreaView,View, StyleSheet, Button, StatusBar } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function VideoPlayer({post}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <SafeAreaView className="bg-black">
        <StatusBar
            backgroundColor="#000"
            barStyle='light-content' />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: post.video_path,
        }}
        posterSource={{uri: post.image_path}}
        posterStyle={{resizeMode: 'cover'}}
        usePoster={false}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: "100%",
    aspectRatio: 16/9
  }
});
