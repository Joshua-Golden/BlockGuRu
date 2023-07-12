import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { colors, device, sizes, width } from '../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

// Interface ensures the data types that are passed to this component is the correct amount of data and of the corret data type
interface LibraryCardProps {
    data: string[];
    handleDelete: (id, title) => void;
    handlePlay: (video) => void;
}

// Sets variables for the different device operating systems that will be used for styling the component
const iPadOS_CARD_WIDTH = sizes.width - 530
const iPadOS_CARD_HEIGHT = 150
const iOS_CARD_WIDTH = sizes.width - 230
const iOS_CARD_HEIGHT = 100
const Android_CARD_WIDTH = sizes.width - 230
const Android_CARD_HEIGHT = 120

export default function LibraryCard({ data, handleDelete, handlePlay }: LibraryCardProps ) {
  // sets local variable to use navigation from the module React Navigation
  const navigation = useNavigation();
  
    return (
      <>
        {/* renders different views dependent on which device operating system is detected */}
        { device.osName === 'iPadOS' ? (
          <>
          <TouchableOpacity
              style={styles.iPadOS_card}
              onPress={() => navigation.navigate('OfflinePost' , { post: data, postCategories: data.postCategories, postContent: data.postContent })}>
              <View style={styles.iPadOS_imageBox}>
                <Image
                    source={{uri: data.post.image_path}}
                    style={ styles.iPadOS_image }
                    contentFit='cover'
                />
                <View className="absolute bg-black opacity-50 h-full w-full"/>
              </View>
                <View style={styles.iPadOS_titleBox}>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={styles.iPadOS_title}>{data.post.title}</Text>
                    <View className="flex-row mt-2 w-full justify-between items-center">
                        <View className="px-2 py-1 rounded-lg  bg-nhs-light-green/20">
                            <Text className="text-nhs-light-green">{Math.round(data.fileSize / 1000000)}{data.videoSize} MB</Text>
                        </View>
                        <View className="flex-row gap-3 justify-start items-center">
                            <TouchableOpacity onPress={() => handlePlay(data.post.video_path)}>
                                <Ionicons name="play-circle" color={'#78BE20'} size={45} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(data.post.id, data.post.title)}>
                                <Ionicons name="ios-trash" color={'#78BE20'} size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
          </TouchableOpacity>
        </>
        ) : device.osName === 'iOS' ? (
          <>
            <TouchableOpacity
              style={styles.iOS_card}
              onPress={() => navigation.navigate('Post' , { post: data })}>
                <View style={styles.iOS_imageBox}>
                  <Image
                      source={{uri: data.post.image_path}}
                      style={ styles.iOS_image }
                      contentFit='cover'
                  />
                  <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View style={styles.iOS_titleBox}>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={styles.iOS_title}>{data.post.title}</Text>
                    <View className="flex-row mt-2 w-full justify-between items-center">
                        <View className="px-2 py-1 rounded-lg  bg-nhs-light-green/20">
                            <Text className="text-nhs-light-green">{Math.round(data.fileSize / 1000000)}{data.videoSize} MB</Text>
                        </View>
                        <View className="flex-row gap-3 justify-start items-center">
                            <TouchableOpacity onPress={() => handlePlay(data.post.video_path)}>
                                <Ionicons name="play-circle" color={'#78BE20'} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(data.post.id, data.post.title)}>
                                <Ionicons name="ios-trash" color={'#78BE20'} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
          </>
        ) : device.osName === 'Android' ? (
          <>
            <TouchableOpacity
              style={styles.Android_card}
                onPress={() => navigation.navigate('Post' , { post: data })}>
                <View style={styles.Android_imageBox}>
                  <Image
                      source={{uri: data.post.image_path}}
                      style={styles.Android_image}
                      contentFit='cover'
                  />
                  <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View style={styles.Android_titleBox}>
                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.Android_title}>{data.post.title}</Text>
                  <View className="flex-row pt-1 gap-1">
                    <Text ellipsizeMode='tail' numberOfLines={1}style={styles.Android_secondary}>{data.post.tags.join(', ')}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.Android_card}
                onPress={() => navigation.navigate('Post' , { post: data })}>
                <View style={styles.Android_imageBox}>
                  <Image
                      source={{uri: data.post.image_path}}
                      style={styles.Android_image}
                      contentFit='cover'
                  />
                  <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View style={styles.Android_titleBox}>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={styles.Android_title}>{data.post.title}</Text>
                    <View className="flex-row mt-2 w-full justify-between items-center">
                        <View className="px-2 py-1 rounded-lg  bg-nhs-light-green/20">
                            <Text className="text-nhs-light-green">{Math.round(data.fileSize / 1000000)}{data.videoSize} MB</Text>
                        </View>
                        <View className="flex-row gap-3 justify-start items-center">
                            <TouchableOpacity onPress={() => handlePlay(data.post.video_path)}>
                                <Ionicons name="play-circle" color={'#78BE20'} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(data.post.id, data.post.title)}>
                                <Ionicons name="ios-trash" color={'#78BE20'} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
          </>
        )}
      </>
    )
}

// creates local style variables that can be used by the component
// currently separated between the different device operating systems

const styles = StyleSheet.create({
  // iPadOS Styling
  iPadOS_card: {
    minWidth: iPadOS_CARD_WIDTH,
    height: iPadOS_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
  },
  iPadOS_imageBox: {
    width: iPadOS_CARD_WIDTH - 530,
    height: iPadOS_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    overflow: 'hidden',
  },
  iPadOS_image: {
    width: iPadOS_CARD_WIDTH,
    height: iPadOS_CARD_HEIGHT,
  },
  iPadOS_titleBox: {
    width: iPadOS_CARD_WIDTH + 100,
    height: iPadOS_CARD_HEIGHT,
    marginLeft: 20,
    justifyContent:'flex-start',
    bottom: 0,
  },
  iPadOS_title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.black,
  },
  iPadOS_secondary: {
    fontSize: sizes.p,
    color: colors.black,
    textTransform: 'capitalize'
  },

  // iOS Device Styling
  iOS_card: {
    minWidth: iOS_CARD_WIDTH,
    height: iOS_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
  },
  iOS_imageBox: {
    width: iOS_CARD_WIDTH - 230,
    height: iOS_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    overflow: 'hidden',
  },
  iOS_image: {
    width: iOS_CARD_WIDTH,
    height: iOS_CARD_HEIGHT,
  },
  iOS_titleBox: {
    width: iOS_CARD_WIDTH,
    height: iOS_CARD_HEIGHT,
    marginLeft: 20,
    justifyContent:'flex-start',
    bottom: 0,
  },
  iOS_title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.black,
  },
  iOS_secondary: {
    fontSize: sizes.p,
    color: colors.black,
  },

  //Android Device Styling
  Android_card: {
    minWidth: Android_CARD_WIDTH,
    height: Android_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    overflow: 'hidden',
  },
  Android_imageBox: {
    width:Android_CARD_WIDTH - 230,
    height: Android_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    overflow: 'hidden',
  },
  Android_image: {
    width: Android_CARD_WIDTH,
    height: Android_CARD_HEIGHT,
  },
  Android_titleBox: {
    width: Android_CARD_WIDTH,
    height: Android_CARD_HEIGHT,
    marginLeft: 20,
    justifyContent:'flex-start',
    bottom: 0,
  },
  Android_title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.black,
  },
  Android_secondary: {
    fontSize: sizes.p,
    color: colors.black,
  },
});