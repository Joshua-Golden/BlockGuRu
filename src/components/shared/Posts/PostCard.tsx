import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing, device } from '../../../../constants/theme'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native';

// declares local variables to be used in styling
// takes current device width from theme
const iPadOS_CARD_WIDTH = sizes.width - 583
const iPadOS_CARD_HEIGHT = 350
const iOS_CARD_WIDTH = sizes.width - 218
const iOS_CARD_HEIGHT = 270
const Android_CARD_WIDTH = sizes.width - 230
const Android_CARD_HEIGHT = 270

export default function PostCard( { data, index} ) {
  const navigation = useNavigation();
  const post = data

  return (
    <>
    { device.osName === 'iPadOS' ? (
      <>
        <View className="h-full justify-start items-center">      
          <TouchableOpacity       
            onPress={() => navigation.navigate('Post' , { post: post })}>
            <View className={`w-[${iPadOS_CARD_WIDTH}] h-[${iPadOS_CARD_HEIGHT}]`} style={[styles.iPadOS_card, shadow.dark]}>
              <View className={`w-[${iPadOS_CARD_WIDTH}] h-[${iPadOS_CARD_HEIGHT}] overflow-hidden`}>
                  <Image
                      source={{uri: post.image_path}}
                      style={styles.iPadOS_image}
                      contentFit='cover'
                  />
                <View className="absolute bg-black opacity-50 h-full w-full"/>
              </View>
              <View style={styles.iPadOS_titleBox}>
                <Text ellipsizeMode='tail' numberOfLines={3} className="text-white pb-2" style={styles.iPadOS_title}>{post.title}</Text>
                <View className="flex-row gap-1">
                  <Text ellipsizeMode='tail' numberOfLines={1} className="capitalize" style={styles.iPadOS_secondary}>{post.tags.join(', ')}</Text>
                </View>
                <Text>{post.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    ) : device.osName === 'iOS' ? (
      <>
        <View className="h-full justify-start items-center">      
          <TouchableOpacity       
            onPress={() => navigation.navigate('Post' , { post: post })}>
            <View className={`w-[${iOS_CARD_WIDTH}] h-[${iOS_CARD_HEIGHT}]`} style={[styles.iOS_card, shadow.dark]}>
              <View className={`w-[${iOS_CARD_WIDTH}] h-[${iOS_CARD_HEIGHT}] overflow-hidden`}>
                  <Image
                      source={{uri: post.image_path}}
                      style={styles.iOS_image}
                      contentFit='cover'
                  />
                <View className="absolute bg-black opacity-50 h-full w-full"/>
              </View>
              <View style={styles.iOS_titleBox}>
                <Text ellipsizeMode='tail' numberOfLines={3} className="text-white pb-2" style={styles.iOS_title}>{post.title}</Text>
                <View className="flex-row gap-1">
                  <Text ellipsizeMode='tail' numberOfLines={1} className="capitalize" style={styles.iOS_secondary}>{post.tags.join(', ')}</Text>
                </View>
                <Text>{post.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    ) : device.osName === 'Android' ?(
      <>
        <View className="h-full justify-start items-center">      
          <TouchableOpacity       
            onPress={() => navigation.navigate('Post' , { post: post })}>
            <View style={[styles.Android_card, shadow.dark]}>
              <View style={{ width: Android_CARD_WIDTH, height: Android_CARD_HEIGHT}} >
                  <Image
                      source={{uri: post.image_path}}
                      style={styles.Android_image}
                      contentFit='cover'
                  />
                <View className="absolute bg-black opacity-50 h-full w-full"/>
              </View>
              <View style={styles.Android_titleBox}>
                <Text ellipsizeMode='tail' numberOfLines={3} className="text-white pb-2" style={styles.Android_title}>{post.title}</Text>
                <View className="flex-row gap-1">
                  <Text ellipsizeMode='tail' numberOfLines={1} className="capitalize" style={styles.Android_secondary}>{post.tags.join(', ')}</Text>
                </View>
                <Text>{post.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <>
        <View className="h-full justify-start items-center">      
          <TouchableOpacity       
            onPress={() => navigation.navigate('Post' , { post: post })}
            style={{
                marginLeft: spacing.m
                }}
            >
            <View style={[styles.Android_card, shadow.dark]}>
              <View style={{ width: Android_CARD_WIDTH, height: Android_CARD_HEIGHT}} >
                  <Image
                      source={{uri: post.Android_image_path}}
                      style={styles.Android_image}
                      contentFit='cover'
                  />
                <View className="absolute bg-black opacity-50 h-full w-full"/>
              </View>
              <View style={styles.Android_titleBox}>
                <Text ellipsizeMode='tail' numberOfLines={3} style={styles.Android_title}>{post.title}</Text>
                <View className="flex-row gap-1">
                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.Android_secondary}>{post.tags.join(', ')}</Text>
                </View>
                <Text>{post.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    )}
    </>
  )
}

// creates local styling 
const styles = StyleSheet.create({    
  iPadOS_card: {
    minWidth: iPadOS_CARD_WIDTH,
    height: iPadOS_CARD_HEIGHT,
    marginVertical: 10,
    borderRadius: sizes.radius_sm,
    marginRight: 20,
    overflow: 'hidden',
  },
  iPadOS_imageBox: {
    width: iPadOS_CARD_WIDTH,
    height: iPadOS_CARD_HEIGHT,
    overflow: 'hidden',
  },
  iPadOS_image: {
    width: iPadOS_CARD_WIDTH,
    height: iPadOS_CARD_HEIGHT,
  },
  iPadOS_titleBox: {
    width: iPadOS_CARD_WIDTH - 60,
    height: iPadOS_CARD_HEIGHT,
    justifyContent:'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 16,
  },
  iPadOS_title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  iPadOS_secondary: {
    fontSize: sizes.p,
    color: colors.white,
  },
  iOS_card: {
    minWidth: iOS_CARD_WIDTH,
    height: iOS_CARD_HEIGHT,      
    borderRadius: sizes.radius_sm,
    marginVertical: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
  iOS_imageBox: {
    width: iOS_CARD_WIDTH,
    height: iOS_CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  iOS_image: {
    width: iOS_CARD_WIDTH,
    height: iOS_CARD_HEIGHT,
  },
  iOS_titleBox: {
    width: iOS_CARD_WIDTH - 30,
    height: iOS_CARD_HEIGHT,
    justifyContent:'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 16,
  },
  iOS_title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
  iOS_secondary: {
    fontSize: sizes.p,
    color: colors.white,
  },
  Android_card: {
    minWidth: Android_CARD_WIDTH,
    height: Android_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    marginVertical: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
  Android_imageBox: {
    width:Android_CARD_WIDTH,
    height: Android_CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  Android_image: {
    width: Android_CARD_WIDTH,
    height: Android_CARD_HEIGHT,
  },
  Android_titleBox: {
    width: Android_CARD_WIDTH - 30,
    height: Android_CARD_HEIGHT,
    justifyContent:'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 16,
  },
  Android_title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
  Android_secondary: {
    fontSize: sizes.p,
    color: colors.white,
  },
});