import { View, Text, ScrollView } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { IMAGES_URL } from '@env';
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';
import { height, width } from '../../../../constants/theme';

// creates the bottom tabs for the post content on the SinglePost screen

export default function BottomTabView({ tabContent }) {
  // creates local variable for materialtoptabnavigator creation
  const Tab = createMaterialTopTabNavigator();

  // declares variable for current tab
  // stores the current params found in the tabcontent passed through the component
  // checks if the values inside current params are usable
  // if yes, create local variable object that replaces all occurences of 'images' with an environment url IMAGES_URL found in the .env file
  // renders scrollview if the content is usable with the RenderHTML componenet imported
  // else renders a no post content found view
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
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            minHeight:1000,
            backgroundColor: 'white',
          }}>
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
              minHeight:300,
              backgroundColor: 'white',
            }}>
            <View className="w-full mt-5 py-2 items-center">
              <Text>No Anatomy content found</Text>
            </View>
          </ScrollView>          
        </>
      )
    }
  }

  // declares variable for current tab
  // stores the current params found in the tabcontent passed through the component
  // checks if the values inside current params are usable
  // if yes, create local variable object that replaces all occurences of 'images' with an environment url IMAGES_URL found in the .env file
  // renders scrollview if the content is usable with the RenderHTML componenet imported
  // else renders a no post content found view
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
            backgroundColor: 'white',
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
            minHeight:300,
            backgroundColor: 'white',
          }}>
          <View className="w-full mt-5 py-2 items-center">
            <Text>No Procedures content found</Text>
          </View>
        </ScrollView>          
        </>
      )
    }
  }

  // declares variable for current tab
  // stores the current params found in the tabcontent passed through the component
  // checks if the values inside current params are usable
  // if yes, create local variable object that replaces all occurences of 'images' with an environment url IMAGES_URL found in the .env file
  // renders scrollview if the content is usable with the RenderHTML componenet imported
  // else renders a no post content found view
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
            backgroundColor: 'white',
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
            minHeight:300,
            backgroundColor: 'white',
          }}>
          <View className="w-full mt-5 py-2 items-center">
            <Text>No Tips content found</Text>
          </View>
        </ScrollView>
        </>
      )
    }
  }
  
  // renders the 3 tabs using tab navigator
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