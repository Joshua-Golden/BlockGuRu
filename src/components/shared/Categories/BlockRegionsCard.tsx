import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native';

const CARD_WIDTH = sizes.width - 230;
const CARD_HEIGHT = 270;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function BlockRegionsCard( { data, index} ) {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Category', { category: data })}
        style={{
          marginLeft: spacing.m,
          marginRight: index === data.length - 1 ? spacing.l : 0,
          }}
      >
        <View className="bg-nhs-light-blue rounded-2xl" style={[styles.card, shadow.dark]}>
          <View className="w-full h-full px-2 justify-center items-center">
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      marginVertical: 10,
    },
    favorite: {
      position: 'absolute',
      top: spacing.m,
      right: spacing.m,
      zIndex: 1,
    },
    imageBox: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    },
    titleBox: {
      width: CARD_WIDTH - 20,
      position: 'absolute',
      bottom: 0,
      left: 16,
      overflow: 'hidden',
    },
    title: {
      fontSize: sizes.h2,
      fontWeight: 'bold',
      color: colors.white,
    },
    secondary: {
      fontSize: sizes.p,
      color: colors.white,
    },
  });