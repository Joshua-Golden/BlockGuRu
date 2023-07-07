import { View, Text, TouchableOpacity } from 'react-native'
import { customStyle, shadow, colors, sizes, spacing, ios } from '../../../constants/theme'
import React from 'react'
import { Image } from 'expo-image'

// Images
import NHS_Logo_Blue from '../../assets/logos/NHS/NHS-blue-white.jpg';


interface SectionHeaderProps {
  title: string,
  onPress?(): void,
  buttonTitle?: string,
  isButton?: Boolean,
  logo?: Boolean,
}

export default function SectionHeader( {title, onPress, buttonTitle, isButton} : SectionHeaderProps) {
  return (
    <View className={`flex-row w-full justify-between items-center p-5 mr-3 ${ios ? '': 'mt-10'}`}>
      <View className="flex-row justify-start items-center">
        <Text style={customStyle.h2}>{title}</Text>

      </View>
      { isButton ? (
        <TouchableOpacity onPress={onPress}>            
          <Text className="text-nhs-light-green" style={customStyle.h4}>{buttonTitle}</Text>
        </TouchableOpacity>
      ) : (
        <>
        </>
      )}        
    </View>
  )
}