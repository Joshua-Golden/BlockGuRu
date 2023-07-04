import { View, Text } from 'react-native'
import React from 'react'

interface PageHeaderProps {
    title: string;
    icon?: string;
    
}

export default function PageHeader({ title,icon }: PageHeaderProps ){
  return (
    <View>
      <Text>PageHeader</Text>
    </View>
  )
}