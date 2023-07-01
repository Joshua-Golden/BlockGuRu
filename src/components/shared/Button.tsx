import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ios, customStyle, width, height } from '../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';


interface ButtonProps{
    text?: string;
    textColor?: string;
    color?: string;
    borderColor?: string;
    transparent?: boolean;
    icon?: string;
  }

export function BigButton({ text, textColor, color, borderColor, icon, transparent }: ButtonProps) {
  return (
  <>
    <View className={`flex-row px-5 py-3 justify-center items-center rounded-full ${transparent ? `border-[3px] border-nhs-${borderColor} ` : `bg-nhs-${color ? color : `bg-nhs-light-green`}`}`}>
        {icon 
        ? <>
            <View className={` ${!text ? `mr-0` : `mr-2`}`}>
                <Ionicons name={icon} color={'white'} size={20} />
            </View>
        </>
        : <></>}
        <Text style={customStyle.button} className="text-nhs-white">{text}</Text>
    </View>
    
  </>
  )
}

export function SmallButton({ text, textColor, color, borderColor, icon, transparent }: ButtonProps) {
  return (
  <>
    <View className={`flex-row px-4 py-2 justify-center items-center rounded-full ${transparent ? `border-[2px] border-nhs-${borderColor}` : `bg-nhs-${color ? color : `bg-nhs-light-green`}`}`}>
        {icon 
        ? <>
            <View className={` ${!text ? `mr-0` : `mr-2`}`}>
                <Ionicons name={icon} color={'white'} size={20} />
            </View>
        </>
        : <></>}
        <Text style={customStyle.button} className={`text-nhs-${textColor}`}>{text}</Text>
    </View>
    
  </>
  )
}