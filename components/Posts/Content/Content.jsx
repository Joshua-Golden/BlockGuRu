import React from "react";
import { ScrollView, View, Text } from "react-native";
import { IMAGES_URL } from '@env';
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from 'react-native';

const Content = ({content}) => {
    const {width} = useWindowDimensions() 

    console.log(content)
    if (content && typeof content !== "undefined") {
        const source = {
            html: content.replace(/images/g, `${IMAGES_URL}/images`)
        }
        return (
            <ScrollView className="">
                <View className="flex-col justify-center items-center w-full left-0">                    
                    <RenderHTML contentWidth={width} source={source} />
                </View>
            </ScrollView>
        )
    }   else {
        console.log("No Content Found")
        return (
            <View className="flex-col justify-center items-center w-full left-0">
                <Text>No Post Content</Text>
            </View>
        )
    }
    
}   

export default Content;