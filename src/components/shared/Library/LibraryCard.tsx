import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { colors, sizes, width } from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

interface LibraryCardProps {
    data: string[];
    index: number;
    handleDelete: (id, title) => void;
}

export default function LibraryCard({ data, index, handleDelete }: LibraryCardProps) {
    const navigation = useNavigation();

    function handlePlay() {

    }

    console.log(data)
  return (
    <>
        <TouchableOpacity
            className="w-full "
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
                <View className="flex-col w-[180]">
                    <Text style={styles.title}>{data.title}</Text>

                   <View className="flex-row mt-2 w-full justify-between items-center">
                    <View className="px-2 py-1 rounded-lg  bg-nhs-light-green/20">
                        <Text className="text-nhs-light-green">{Math.round(data.fileSize / 1000000)}{data.videoSize} MB</Text>
                    </View>
                    <View className="flex-row gap-3 justify-start items-center">
                        <TouchableOpacity onPress={() => handlePlay(data.video_path)}>
                            <Ionicons name="play-circle" color={'#78BE20'} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(data.id, data.title)}>
                            <Ionicons name="ios-trash" color={'#78BE20'} size={25} />
                        </TouchableOpacity>
                    </View>
                    
                   </View>
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