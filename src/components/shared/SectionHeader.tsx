import { View, Text, TouchableOpacity } from 'react-native'
import { customStyle, shadow, colors, sizes, spacing } from '../../../constants/theme'
import React from 'react'

interface SectionHeaderProps {
  title: string,
  onPress?: () => void,
  buttonTitle?: string,
  isButton: Boolean,
}

export default function SectionHeader({title, onPress, buttonTitle, isButton}) {
  return (
    <View className="flex-row w-full justify-between items-center p-5 mr-3">
        <Text style={customStyle.h2}>{title}</Text>
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