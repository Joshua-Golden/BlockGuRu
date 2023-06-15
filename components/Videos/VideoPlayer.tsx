import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Video } from 'expo-av';

export default function VideoPlayer(video_path) {
    const video = React.useRef(null);
    return (
        <Video 
            ref={video}
            source={video_path}
            useNativeControls
        />
    )
}
