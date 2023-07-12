import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing, width, height, device } from '../../../../constants/theme'
import { Image } from 'expo-image'

import { useNavigation } from '@react-navigation/native';
// declares local variables to be used in styling
// takes device screen width
const iPadOS_CARD_WIDTH = sizes.width - 530
const iPadOS_CARD_HEIGHT = 150
const iOS_CARD_WIDTH = sizes.width - 230
const iOS_CARD_HEIGHT = 100
const Android_CARD_WIDTH = sizes.width - 230
const Android_CARD_HEIGHT = 120

export default function SearchCard({ data, index }) {
    const navigation = useNavigation();
  
    return (
      // renders different views based on the device OS
      <>
        { device.osName === 'iPadOS' ? (
          <>
          <TouchableOpacity
              style={styles.iPadOS_card}
              onPress={() => navigation.navigate('Post' , { post: data })}>
              <View style={styles.iPadOS_imageBox}>
                <Image
                    source={{uri: data.image_path}}
                    style={ styles.iPadOS_image }
                    contentFit='cover'
                />
                <View className="absolute bg-black opacity-50 h-full w-full"/>
              </View>
              <View style={styles.iPadOS_titleBox}>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.iPadOS_title}>{data.title}</Text>
                <View className="flex-row pt-1 gap-1">
                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.iPadOS_secondary}>{data.tags.join(', ')}</Text>
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
                      source={{uri: data.image_path}}
                      style={ styles.iOS_image }
                      contentFit='cover'
                  />
                  <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View style={styles.iOS_titleBox}>
                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.iOS_title}>{data.title}</Text>
                  <View className="flex-row pt-1 gap-1">
                    <Text ellipsizeMode='tail' numberOfLines={1} className="capitalize" style={styles.iOS_secondary}>{data.tags.join(', ')}</Text>
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
                      source={{uri: data.image_path}}
                      style={styles.Android_image}
                      contentFit='cover'
                  />
                  <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View style={styles.Android_titleBox}>
                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.Android_title}>{data.title}</Text>
                  <View className="flex-row pt-1 gap-1">
                    <Text ellipsizeMode='tail' numberOfLines={1}style={styles.Android_secondary}>{data.tags.join(', ')}</Text>
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
                      source={{uri: data.image_path}}
                      style={styles.Android_image}
                      contentFit='cover'
                  />
                  <View className="absolute bg-black opacity-50 h-full w-full"/>
                </View>
                <View style={styles.Android_titleBox}>
                  <Text ellipsizeMode='tail' numberOfLines={2} style={styles.Android_title}>{data.title}</Text>
                  <View className="flex-row pt-1 gap-1">
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.Android_secondary}>{data.tags.join(', ')}</Text>
                  </View>
                </View>
            </TouchableOpacity>
          </>
        )}
      </>
    )
}

// creates styling to be used by componnent
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