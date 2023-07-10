import { View, Text, ScrollView } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { IMAGES_URL } from '@env';
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';
import { height, width } from '../../../../constants/theme';

export default function BottomTabView({ tabContent }) {
  const Tab = createMaterialTopTabNavigator();

  const Anatomy = () => {
    const AnatomyContent = tabContent.anatomy

    if (AnatomyContent && typeof AnatomyContent !== "undefined") {
      const source = {
          html: AnatomyContent.replace(/images/g, `${IMAGES_URL}/images`)
      }

      return (
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow:1}}
          showsVerticalScrollIndicator={false}>
          <View className="flex-1 bg-nhs-white w-full h-full px-5 pb-3">
            <RenderHTML contentWidth={width} source={source} />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <>
          <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1}}
          style={{
              width: '100%',
              minHeight:1000,
            }}>
            <View
              style={{
                flex:1,
                width: '100%',
                minHeight:1000,
                paddingVertical:10,
                paddingHorizontal: 20,
                backgroundColor: 'white',
              }}>
            </View>
            <View className="justify-center items-center w-full left-0">
              <Text>No post content found</Text>
            </View>
          </ScrollView>
          
        </>
      )
    }
  }
  const Procedure = () => {
    const ProceduresContent = tabContent.procedures
    if (ProceduresContent && typeof ProceduresContent !== "undefined") {
      const source = {
          html: ProceduresContent.replace(/images/g, `${IMAGES_URL}/images`)
      }
      return (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1}}
          style={{
            width: '100%',
            minHeight:1000,
          }}>
          <View
            style={{
              flex:1,
              width: '100%',
              minHeight:1000,
              paddingVertical:10,
              paddingHorizontal: 20,
              backgroundColor: 'white',
            }}>
            <RenderHTML contentWidth={width} source={source} />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <>
          <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1}}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                flex:1,
                width: '100%',
                height: '100%',
                paddingVertical:10,
                paddingHorizontal: 20,
                backgroundColor: 'white',
              }}>
            </View>
            <View className="justify-center items-center w-full left-0">
              <Text>No post content found</Text>
            </View>
          </ScrollView>
          
        </>
      )
    }
  }
  const Tips = () => {
    const TipsContent = tabContent.tips
    if (TipsContent && typeof TipsContent !== "undefined") {
      const source = {
          html: TipsContent.replace(/images/g, `${IMAGES_URL}/images`)
      }
      return (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1}}
          style={{
            width: '100%',
            minHeight:1000,
          }}>
          <View
            style={{
              flex:1,
              width: '100%',
              minHeight:1000,
              paddingVertical:10,
              paddingHorizontal: 20,
              backgroundColor: 'white',
            }}>
            <RenderHTML contentWidth={width} source={source} />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <>
          <ScrollView
          nestedScrollEnabled={true}

            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              minHeight:1000,
              
            }}>
            <View
              style={{
                width: '100%',
                minHeight:1000,
                paddingVertical:10,
                paddingHorizontal: 20,
                backgroundColor: 'white',
              }}>
            </View>
            <View className="justify-center items-center w-full left-0">
              <Text>No post content found</Text>
            </View>
          </ScrollView>
          
        </>
      )
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        lazy:true,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: '#78BE20',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#78BE20',
          height: 1.5,
        },
      })}
      style={{minHeight:1000}}
      >
      <Tab.Screen name="Anatomy" component={Anatomy} />
      <Tab.Screen name="Procedures" component={Procedure} />
      <Tab.Screen name="Tips" component={Tips} />
    </Tab.Navigator>
  )
}