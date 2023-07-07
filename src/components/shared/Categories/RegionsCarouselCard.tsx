import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { customStyle, shadow, colors, sizes, spacing } from '../../../../constants/theme'
import { Image } from 'expo-image'

import { useNavigation } from '@react-navigation/native';

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

export default function RegionsCarouselCard( { data, index } ) {
  const navigation = useNavigation();
  
  return (
    <>
      <TouchableOpacity 
        onPress={() => {}}
        style={{
          marginLeft: spacing.l,
          marginRight: index === data.length - 1 ? spacing.l : 0,
          }}
      >
        <View className="bg-nhs-light-blue rounded-2xl" style={[styles.card, shadow.dark]}>
          <View className="w-full h-full justify-center items-center">
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH - 200,
    height: CARD_HEIGHT - 100,
    marginVertical: 10,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.black,
  },
});