import { View, Text, TextInput } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
    icon?: string,
    placeholder?: string,
    onChangeText: (onChangeTextValue) => void,
    onChangeTextValue?: string,
    autoCorrect?: boolean,
    value?: string,
}

export default function Input( { icon, placeholder, onChangeTextValue, onChangeText, autoCorrect, value}: InputProps ) {
  return (
    <View className={`my-2 flex-row justify-center items-center rounded-md px-3 bg-nhs-pale-grey group border-2 border-nhs-pale-grey focus:border-nhs-light-green`}>      
        <View className="justify-center items-center">
            <Ionicons name={icon} size={20} color={`group-focus:nhs-light-green`}/>
        </View>
        <TextInput
            className={`text-lg flex-1 py-2 mb-1 pl-2 text-nhs-dark-grey focus:text-nhs-light-green`}
            clearButtonMode='always'
            autoCapitalize='none'
            autoCorrect={autoCorrect}
            placeholder={placeholder}
            value={value}
            onChangeText={(onChangeTextValue) => onChangeText(onChangeTextValue)}
            />
    </View>
  )
}