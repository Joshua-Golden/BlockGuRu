import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import { StatusBar } from 'expo-status-bar'

export default function AboutTermsAndConditions() {
  return (
    <SafeAreaView className="flex-1 px-5 bg-nhs-white">
      <StatusBar style='dark' />
      <View className="h-full px-5">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <PageHeader title='Terms and Conditions' isBackArrow/>
          <View className="w-full flex-col justify-start items-start pb-5">
            <Text className="text-2xl font-bold text-nhs-light-green">Introduction</Text>
            <Text className="text-md text-nhs-black mb-4">This App is exactly what it says it is - it’s a guide. It doesn’t set out to replace a standard text book. It certainly isn’t a substitute for a sound knowledge of anatomy and local anaesthetic pharmacology. It’s more of a guide to the occasional blocker, a refresher to the more experienced, and a teaching aid to the trainer. It’s a source of tips and advice which we wished had been around when we started using ultrasound. We are a busy hospital with a heavy teaching commitment. Therefore we choose to use nerve stimulation in conjunction with ultrasound as we feel it adds another layer of safety to the patient, and reassurance to the operator. </Text>

            <Text className="text-2xl font-bold text-nhs-light-green">Disclaimer</Text>
            <Text className="text-md text-nhs-black mb-4">YOU ACKNOWLEDGE AND AGREE THAT PRODUCTS PURCHASED FROM US CONTAIN CONTENT RELATING TO THE PERFORMANCE OF MEDICAL PROCEDURES AND TECHNIQUES. WE NEITHER MAKE NOR GIVE ANY STATEMENT, REPRESENTATION, ASSURANCE OR WARRANTY IN RESPECT OF SUCH MEDICAL PROCEDURES AND TECNIQUES AND YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT RELIED ON ANY SUCH STATEMENT, REPRESENTATION, ASSURANCE OR WARRANTY IN ENTERING INTO ANY CONTRACT AND WILL NOT RELY ON ANY SUCH STATEMENT, REPRESENTATION, ASSURANCE OR WARRANTY WHEN UTILISING ANY PRODUCT OR ANYTHING CONTAINED THEREIN.</Text>
            <Text className="text-md text-nhs-black mb-4">1.2 Our entire liability for losses you suffer as result of any act or omission by us in connection with these terms and conditions and the performance of any Contract is strictly limited to the purchase price of the Product you purchased.</Text>
            <Text className="text-md text-nhs-black mb-4">1.3 Nothing in these terms and conditions excludes or limits in any way our liability for;</Text>
            <Text className="text-md text-nhs-black ">(a) death or personal injury caused by our negligence;</Text>
            <Text className="text-md text-nhs-black ">(b) fraud or fraudulent misrepresentation; or</Text>
            <Text className="text-md text-nhs-black mb-4">(c) any matter for which it would be illegal for us to exclude, or attempt to exclude, our liability.</Text>
            <Text className="text-md text-nhs-black mb-4">1.4 We are not responsible for any special, indirect or consequential losses which happen as a side effect of the main loss or damage, including but not limited to loss of income or revenue, loss of business, loss of profits or contracts, loss of anticipated savings, loss of data and waste of management or office time, all however arising and whether caused by tort (including, without limitation, negligence), breach of contract or otherwise.</Text>

            <Text className="text-2xl font-bold text-nhs-light-green">Copyright</Text>
            <Text className="text-md italic">All intellectual property rights in this application (including, without limitation, any copyright and database rights) are owned by University Hospitals Birmingham NHS Trust Foundation ("UHB") or its licensors, unless otherwise stated.</Text>
          
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}