import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { styles, width, height } from '../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// ensures all data passed through the component is the correct and amount and of the correct data type
interface HeaderProps{
  title: string;
  isIcon: boolean;
  background?: string;
}

export default function Header({ title, isIcon }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex w-full bg-nhs-white py-4">
      <View className="flex-row bg-nhs-white justify-start items-center">
        {isIcon
          ? <>     
            <TouchableOpacity className="mr-2" onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={25}/>
            </TouchableOpacity>
            <Text className="font-bold text-2xl text-nhs-black">{title}</Text>
          </>
          : 
          <Text className="font-bold text-2xl text-nhs-black">{title}</Text>
        }
      </View>
    </SafeAreaView>
  )
}