import { ScrollView, View, Text } from 'react-native'
import React from 'react'
import { IMAGES_URL } from '@env';
import RenderHTML from "react-native-render-html";
import { width, height } from '../../../../constants/theme';

export default function PostContent({ content }) {
    if (content && typeof content !== "undefined") {
        const source = {
            html: content.replace(/images/g, `${IMAGES_URL}/images`)
        }
        return (
            <>
                <View className="flex-col justify-center items-center w-full left-0">
                    <RenderHTML contentWidth={width} source={source} />
                </View>
            </>
        ) 
    } else {
        return (
            <>
                <View className="justify-center items-center w-full left-0">
                    <Text>No post content found</Text>
                </View>
            </>
        )
    }
}