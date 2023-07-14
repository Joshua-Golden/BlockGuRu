import { View, Text, SafeAreaView, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import PageHeader from '../../components/PageHeader'
import { Image } from 'expo-image'

// Assets
import QEHBC_Logo from '../../assets/logos/UHB/UHBCharitiesLogo.png'
import Pajunk_Logo from '../../assets/logos/Pajunk/png/PA_Text.png'
import UHB_Logo from '../../assets/logos/UHB/uhb2-trans.png';

// function that creates a navigatable link that can be used inside comopnent
const OpenExternalLink = ({ url, children, styles }) => {
  const onPress = () => Linking.canOpenURL(url).then(() => {
    Linking.openURL(url);
  })

  // returns the a button with the link on it 
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className={styles}>{children}</Text>
    </TouchableOpacity>
  )
}

export default function Acknowledgements() {
  
  // gets current year from device
  const currentyear = new Date().getFullYear()

  return (
    <SafeAreaView className="flex-1 px-5 bg-nhs-white">
      <StatusBar style='dark' />
      <View className="h-full px-5">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <PageHeader title='Acknowledgements' isBackArrow/>
          <View className="w-full flex-col justify-start items-start pb-5">
            <Text className="text-lg font-bold">Mr Mark Leonard</Text>
            <Text className="text-md text-nhs-black">Senior Physicians Assistant (Anaesthesia)</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>

            <Text className="text-lg font-bold">Mrs Toni Jenkins</Text>
            <Text className="text-md text-nhs-black">Senior Physicians Assistant (Anaesthesia)</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>
            
            <Text className="text-lg font-bold">Dr Michael “Tom” Bowden</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>
            
            <Text className="text-lg font-bold">Dr Charles Edwards</Text>
            <Text className="text-md text-nhs-black">Video Manager</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>
            
            <Text className="text-lg font-bold">Mr Simon Edwards</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>

            <Text className="text-lg font-bold">Mr Derek Winkles</Text>
            <Text className="text-md text-nhs-black">Graphic Studio Manager</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>

            <Text className="text-lg font-bold">Mr Shaun Jenkins</Text>
            <Text className="text-md text-nhs-black">Senior Operating Department Practitioner</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>
            
            <Text className="text-lg font-bold">Dr Gerwyn Rees</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>

            <Text className="text-lg font-bold">Mr Dominic Power</Text>
            <Text className="text-md text-nhs-black">Consultant Hand Surgeon</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>

            <Text className="text-lg font-bold">Col Chester “Trip” Buckenmaier 111</Text>
            <Text className="text-md text-nhs-black">President</Text>
            <Text className="text-md text-nhs-black mb-4">Defence & Veterans Centre for Integrative Pain Management (DVCIPM). USA</Text>

            <Text className="text-lg font-bold">Dr Tony Adams</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Lancashire Teaching Hospital. UK</Text>

            <Text className="text-lg font-bold">Dr Veerabadran Velayutham</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Lancashire Teaching Hospital. UK</Text>

            <Text className="text-lg font-bold">SN Anna Barton</Text>
            <Text className="text-md text-nhs-black">Anaesthetic Assistant</Text>
            <Text className="text-md text-nhs-black mb-4">Lancashire Teaching Hospital. UK</Text>

            <Text className="text-lg font-bold">Dr Carl Hillermann</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">University Hospitals Coventry & Warwickshire. UK</Text>

            <Text className="text-lg font-bold">Dr Laura May</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">University Hospitals Coventry & Warwickshire. UK</Text>

            <Text className="text-lg font-bold">Mrs Sue Millerchip</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">University Hospitals Coventry & Warwickshire. UK</Text>

            <Text className="text-lg font-bold">Mr Stephen Hammond</Text>
            <Text className="text-md text-nhs-black">Anaesthesiology Assistant</Text>
            <Text className="text-md text-nhs-black mb-4">Nova Southeastern University. Florida, USA</Text>

            <Text className="text-lg font-bold">Dr Toni Brunning</Text>
            <Text className="text-md text-nhs-black mb-4">SpR Anaesthetics University Hospital Birmingham</Text>
            
            <Text className="text-md text-nhs-black mb-4">With thanks to all the theatre staff, anaesthetic staff and surgeons working within the Queen Elizabeth Hospital Birmingham, their support and patience has made production of this App possible.</Text>
            <Text className="text-md text-nhs-black mb-4">Many thanks to all of the patients who allowed their procedures to be filmed, and used within the production of the GuRU App.</Text>
            <Text className="text-md text-nhs-black mb-4">Thank you to Queen Elizabeth Hospital Birmingham Charities, their financial input helped in starting this project.</Text>
            <OpenExternalLink url="https://qehb.org/" styles='text-md w-full text-center text-nhs-black mb-4'>www.qehb.org</OpenExternalLink>

            <View className="w-full justify-center items-center mb-4">
              <Image
                source={QEHBC_Logo}
                style={{
                    width:230,
                    height:60,
                }}
                contentFit='cover'
              />
            </View>

            <Text className="text-lg font-bold">Dr Mav Manji</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>

            <Text className="text-lg font-bold">Dr Harjot Singh</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>


            <Text className="text-lg font-bold">Dr Daniel Bailey</Text>
            <Text className="text-md text-nhs-black">Consultant Anaesthetist</Text>
            <Text className="text-md text-nhs-black mb-4">Queen Elizabeth Hospital Birmingham. UK</Text>
            
            <Text className="text-md font-bold text-nhs-black mb-4">Pajunk GmbH and Pajunk UK for their sponsorship and support. <OpenExternalLink url="https://pajunk.com/" styles='text-md font-bold'>www.pajunk.com</OpenExternalLink></Text>

            
            <View className="w-full justify-center items-center mb-4">
              <Image
                source={Pajunk_Logo}
                style={{
                    width:188,
                    height:40,
                }}
                contentFit='cover'
              />
            </View>

            <Text className="text-lg font-bold">Joshua Golden</Text>
            <Text className="text-md text-nhs-black">Web Developer</Text>
            <Text className="text-md text-nhs-black mb-4">StartUp Media UK</Text>
            
          </View>

          <View className="w-full items-center pb-4">
            <Text className="text-xl font-bold -mb-1">Block GuRU</Text>
            <Text className="text-md">Copyright <Text>{'\u00A9'}</Text>{currentyear}</Text>
            <Image
                source={UHB_Logo}
                style={{
                    width:230,
                    height:60,
                }}
                contentFit='cover'
            />
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}