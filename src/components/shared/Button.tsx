import React, { ComponentType, ReactElement } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { customStyle, width, height } from '../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// ensures all data passed through the component is the correct and amount and of the correct data type
interface ButtonProps {
    text?: string;
    textColor: string;
    color?: string;
    borderColor?: string;
    transparent?: boolean;
    icon?: string;
}

// renders a big button
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

// renders a small button
export function SmallButton({ text, textColor, color, borderColor, icon, transparent }: ButtonProps) {

  return (
  <>
    <View className={`flex-row px-4 py-2 justify-center items-center rounded-full ${transparent ? ` border-[2px] bg-transparent border-nhs-${borderColor}` : `bg-nhs-${color ? color : `bg-nhs-light-green`}`}`}>
        {icon 
        ? <>
            <View className={` ${!text ? `mr-0` : `mr-2`}`}>
                <Ionicons name={icon} color={color === 'white' ? 'white' : transparent ? '#78BE20' : 'white'} size={20} />
            </View>
        </>
        : <></>}
        <Text style={customStyle.button} className={`text-nhs-${textColor}`}>{text}</Text>
    </View>
    
  </>
  )
}