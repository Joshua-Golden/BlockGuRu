import { View, Text, TouchableOpacity } from 'react-native'
import { customStyle, shadow, colors, sizes, spacing, device } from '../../../constants/theme'
import React from 'react'

// ensures all data passed through the component is the correct and amount and of the correct data type
interface SectionHeaderProps {
  title: string,
  onPress?(): void,
  buttonTitle?: string,
  isButton?: Boolean,
  logo?: Boolean,
}

export default function SectionHeader( {title, onPress, buttonTitle, isButton} : SectionHeaderProps) {
  // component renderer
  return (
    <View className={`flex-row w-full justify-between items-center`}>
      <View className="flex-row justify-start items-center">
        <Text style={customStyle.h2}>{title}</Text>
      </View>
      {/* checks if the boolean required is true or false
        if true, render the button
        if false, render an empty view */}
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