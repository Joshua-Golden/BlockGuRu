import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing, device } from '../../../../constants/theme'

import { useNavigation } from '@react-navigation/native';

export default function RegionsCarouselCard( { data, index } ) {
  const navigation = useNavigation();
    
  return (
    <>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Region', { region: data })}
      >
        <View className="bg-nhs-light-blue rounded-xl" style={device.osName === 'iPadOS' ? [styles.iPadOS_card, shadow.dark] : device.osName === 'iOS' ? [styles.iOS_card, shadow.dark] : device.osName === 'Android' ? [styles.Android_card, shadow.dark] : [styles.Android_card, shadow.dark]}>
          <View className="w-full h-full justify-center items-center">
            <Text style={device.osName === 'iPadOS' ? [styles.iPadOS_title, shadow.dark] : device.osName === 'iOS' ? [styles.iOS_title] : device.osName === 'Android' ? [styles.Android_title, shadow.dark] : [styles.Android_title, shadow.dark]}>{data.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

// creates local styles
const styles = StyleSheet.create({ 
  iPadOS_card: {
    minWidth: sizes.width - 700,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight:10,
    overflow: 'hidden',
  },
  iPadOS_title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
  iOS_card: {
    minWidth: sizes.width - 300,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight:10,
    overflow: 'hidden',
  },
  iOS_title: {
    fontSize: sizes.h4,
    fontWeight: 'bold',
    color: colors.white,
  },
  Android_card: {
    minWidth: sizes.width - 300,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight:10,
    overflow: 'hidden',
  },
  Android_title: {
    fontSize: sizes.h4,
    fontWeight: 'bold',
    color: colors.white,
  },
});