import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { device, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native';

// creates local variables to be used in styling
const iPadOS_CARD_WIDTH = sizes.width - 435;
const iPadOS_CARD_HEIGHT = 200;
const iOS_CARD_WIDTH = sizes.width - 190;
const iOS_CARD_HEIGHT = 130;
const Android_CARD_WIDTH = sizes.width - 200;
const Android_CARD_HEIGHT = 130;


export default function BlockRegionsCard( { data, index} ) {
  const navigation = useNavigation();
  return (
    // renders different views with different styling based on which device operating system is found
    <>
     { device.osName === 'iPadOS' ? (
       <>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Category', { category: data })}
          style={styles.iPadOS_card}
        >
          <View className="bg-nhs-light-blue" style={styles.iPadOS_titleBox}>
            <Text ellipsizeMode='tail' numberOfLines={3} style={styles.iPadOS_title}>{data.title}</Text>
          </View>
        </TouchableOpacity>
      </>
     ) : device.osName === 'iOS' ? (
      <>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Category', { category: data })}
        style={styles.iOS_card}
      >
        <View className="bg-nhs-light-blue" style={styles.iOS_titleBox}>
          <Text ellipsizeMode='tail' numberOfLines={3} style={styles.iOS_title}>{data.title}</Text>
        </View>
      </TouchableOpacity>
    </>
     ) : device.osName === 'Android' ? (
      <>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Category', { category: data })}
        style={styles.Android_card}
      >
        <View className="bg-nhs-light-blue" style={styles.Android_titleBox}>
          <Text ellipsizeMode='tail' numberOfLines={3} style={styles.Android_title}>{data.title}</Text>
        </View>
      </TouchableOpacity>
    </>
     ) : (
      <>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Category', { category: data })}
        style={styles.Android_card}
      >
        <View className="bg-nhs-light-blue" style={styles.Android_titleBox}>
          <Text ellipsizeMode='tail' numberOfLines={3} style={styles.Android_title}>{data.title}</Text>
        </View>
      </TouchableOpacity>
    </>
     )}
    </>
  )
}

const styles = StyleSheet.create({ 
  iPadOS_card: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  iPadOS_titleBox: {
    width: iPadOS_CARD_WIDTH - 30,
    height: iPadOS_CARD_HEIGHT,
    borderRadius: sizes.radius_sm,
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  iPadOS_title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
  iOS_card: {
    borderRadius: sizes.radius_sm,
    paddingVertical: 5,
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
  iOS_titleBox: {
    width: iOS_CARD_WIDTH - 30,
    height: iOS_CARD_HEIGHT,
    paddingHorizontal: 5,
    borderRadius: sizes.radius_sm,
    justifyContent:'center',
    alignItems:'center',
  },
  iOS_title: {
    fontSize: sizes.h4,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
  Android_card: {
    borderRadius: sizes.radius_sm,
    paddingVertical: 5,
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
  Android_titleBox: {
    width: Android_CARD_WIDTH - 30,
    height: Android_CARD_HEIGHT,
    paddingHorizontal: 5,
    borderRadius: sizes.radius_sm,
    justifyContent:'center',
    alignItems:'center',    
  },
  Android_title: {
    fontSize: sizes.h4,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
});