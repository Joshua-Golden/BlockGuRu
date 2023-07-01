import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'

import { useNavigation } from '@react-navigation/native';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function CarouselCard( { data, index } ) {
  const navigation = useNavigation();
  
  return (
    <>
      <TouchableOpacity 
        onPress={() => navigation.navigate('post' , { post: data })}
        style={{
          marginLeft: spacing.l,
          marginRight: index === data.length - 1 ? spacing.l : 0,
          }}
      >
        <View className={`w-[${CARD_WIDTH}] h-[${CARD_HEIGHT}] my-3`} style={[styles.card, shadow.dark]}>
          <View className={`w-[${CARD_WIDTH}] h-[${CARD_HEIGHT}] rounded-lg overflow-hidden`}>
            <Image
                source={{uri: data.image_path}}
                style={styles.image}
            />
          <View className="absolute bg-black opacity-50 h-full w-full"/>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{data.title}</Text>
            <View className="flex-row gap-1">
              <Text className="capitalize" style={styles.secondary}>{data.tags.join(', ')}</Text>
            </View>
            <Text> {data.tag}</Text>
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
    resizeMode: 'cover',
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