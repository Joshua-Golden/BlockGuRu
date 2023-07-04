import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing, width, height } from '../../../../constants/theme'
import { Image } from 'expo-image'

import { useNavigation } from '@react-navigation/native';


export default function SearchCard({ data, index }) {
    const navigation = useNavigation();
  
    return (
      <>
        <TouchableOpacity
            className=""
            onPress={() => navigation.navigate('post' , { post: data })}>
            <View className="flex-row justify-start gap-3 items-center my-1">
                <View className="flex-row rounded-lg overflow-hidden">
                    <Image
                        source={{uri: data.image_path}}
                        style={{
                            width: width - 230,
                            height: 100
                        }}
                        contentFit='cover'
                    />
                    <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View className={`flex-row w-[180] `}>
                    <Text style={styles.title}>{data.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
      </>
    )
}


const styles = StyleSheet.create({
    title: {
      fontSize: sizes.h3,
      fontWeight: 'bold',
      color: colors.black,
    },
    secondary: {
      fontSize: sizes.p,
      color: colors.black,
    },
  });