import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import { StatusBar } from 'expo-status-bar'

export default function AboutPrivacyPolicy() {
  return (
    <SafeAreaView className="flex-1 px-5 bg-nhs-white">
      <StatusBar style='dark' />
      <View className="h-full px-5">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <PageHeader title='Privacy Policy' isBackArrow/>
          <View className="w-full flex-col justify-start items-start pb-5">
            <Text className="text-md text-nhs-black mb-4">User data is neither collected nor used by this application.</Text>

            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">Last updated June 30, 2023 </Text>This privacy notice for University Hospitals Birmingham NHS Foundation Trust <Text className="font-[900]">('we', 'us',</Text> or <Text className="font-[900]">'our')</Text>, describes how and why we might collect, store, use, and/or share (<Text className="font-[900]">'process'</Text>) your information when you use our services (<Text className="font-[900]">'Services'</Text>), such as when you: </Text>
            <View className="flex-row justify-start items-start">
              <Text className="mr-5">{'\u2B24'}</Text>
              <Text className="text-md text-nhs-black mb-4 flex-1">Download and use our mobile application (BlockGuRU), or any other application of ours that links to this privacy notice</Text>
            </View>
            <View className="flex-row justify-start items-start">
              <Text className="mr-5">{'\u2B24'}</Text>
              <Text className="text-md text-nhs-black mb-4 flex-1">Engage with us in other related ways, including any sales, marketing, or events </Text>
            </View>

            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">Questions or concerns? </Text>Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at Foi@uhb.nhs.uk. </Text>

            <Text className="text-2xl font-bold text-nhs-light-green">Summary of Key Points</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">What personal information do we process? </Text>When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. </Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">Do we process any sensitive personal information? </Text>We do not process sensitive personal information. </Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">Do we receive any information from third parties? </Text>We do not receive any information from third parties. </Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">How do we process your information? </Text>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. </Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">In what situations and with which parties do we share personal information? </Text>We may share information in specific situations and with specific third parties. </Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">What are your rights? </Text>Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. </Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">How do you exercise your rights? </Text>The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws. </Text>
            
            <Text className="text-2xl font-bold text-nhs-light-green">Table of Contents</Text>
            <Text className="text-md text-nhs-black ">1.  WHAT INFORMATION DO WE COLLECT?</Text>
            <Text className="text-md text-nhs-black ">2.  HOW DO WE PROCESS YOUR INFORMATION?</Text>
            <Text className="text-md text-nhs-black ">3.  WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONALINFORMATION?</Text>
            <Text className="text-md text-nhs-black ">4.  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</Text>
            <Text className="text-md text-nhs-black ">5.  HOW LONG DO WE KEEP YOUR INFORMATION?</Text>
            <Text className="text-md text-nhs-black ">6.  DO WE COLLECT INFORMATION FROM MINORS?</Text>
            <Text className="text-md text-nhs-black ">7.  WHAT ARE YOUR PRIVACY RIGHTS?</Text>
            <Text className="text-md text-nhs-black ">8.  CONTROLS FOR DO-NOT-TRACK FEATURES</Text>
            <Text className="text-md text-nhs-black ">9.  DO WE MAKE UPDATES TO THIS NOTICE?</Text>
            <Text className="text-md text-nhs-black ">10.  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Text>
            <Text className="text-md text-nhs-black mb-4">11.  HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</Text>
            
            <Text className="text-lg font-bold text-nhs-light-green">1. WHAT INFORMATION DO WE COLLECT?</Text>
            <Text className="text-lg font-bold text-nhs-black mb-4">Personal information you disclose to us</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>We collect personal information that you provide to us.</Text>
            <Text className="text-md text-nhs-black mb-4">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">Sensitive Information. </Text>We do not process sensitive information.</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900]">Application Data. </Text>If you use our application(s), we also may collect the following information if you choose to provide us with access or permission: <Text className="italic">Mobile Device Access.</Text> We may request access or permission to certain features from your mobile device, including your mobile device's storage, and other features. If you wish to change our access or permissions, you may do so in your device's settings.</Text>
            <Text className="text-md text-nhs-black mb-4">This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.</Text>
            <Text className="text-md text-nhs-black mb-4">All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</Text>
            
            <Text className="text-lg font-bold text-nhs-light-green">2. HOW DO WE PROCESS YOUR INFORMATION?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. <Text className="font-[900]">We process your personal information for a variety of reasons, depending on how you interact with our Services, including: To save or protect an individual's vital interest.</Text> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</Text>

            <Text className="text-lg font-bold text-nhs-light-green">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>We may share information in specific situations described in this section and/or with the following third parties.</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900] italic">If you are located in the EU or UK, this section applies to you. </Text>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900] italic">Consent. </Text>We may process your information if you have given us permission(i.e. consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about withdrawing your consent.</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900] italic">Legal Obligations. </Text>We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</Text>
            <Text className="text-md text-nhs-black mb-4"><Text className="font-[900] italic">Vital Interests. </Text>We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</Text>

            <Text className="text-lg font-bold text-nhs-light-green">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>We may share information in specific situations described in this section and/or with the following third parties.</Text>
            <Text className="text-md text-nhs-black mb-4">We may need to share your personal information in the following situations: <Text className="font-bold">Business Transfers.</Text>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</Text>
            
            <Text className="text-lg font-bold text-nhs-light-green">5. HOW LONG DO WE KEEP YOUR INFORMATION?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>We keep your information for as long as necessary to fulfil the purposes outlined in this privacy notice unless otherwise required by law.</Text>
            <Text className="text-md text-nhs-black mb-4">We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</Text>
            <Text className="text-md text-nhs-black mb-4">When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</Text>

            <Text className="text-lg font-bold text-nhs-light-green">6. DO WE COLLECT INFORMATION FROM MINORS?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>We do not knowingly collect data from or market to children under 18 years of age.</Text>
            <Text className="text-md text-nhs-black mb-4">We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at berit.reglar@uhb.nhs.uk.</Text>
            
            <Text className="text-lg font-bold text-nhs-light-green">7. WHAT ARE YOUR PRIVACY RIGHTS?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</Text>
            <Text className="text-md text-nhs-black mb-4 ">In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</Text>
            <Text className="text-md text-nhs-black mb-4 ">We will consider and act upon any request in accordance with applicable data protection laws.</Text>
            <Text className="text-md text-nhs-black mb-4 ">If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority. </Text>
            <Text className="text-md text-nhs-black mb-4 ">If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner.</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">Withdrawing your consent: </Text>If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</Text>
            <Text className="text-md text-nhs-black mb-4 ">However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</Text>
            <Text className="text-md text-nhs-black mb-4 ">If you have questions or comments about your privacy rights, you may email us at Foi@uhb.nhs.uk.</Text>

            <Text className="text-lg font-bold text-nhs-light-green">8. CONTROLS FOR DO-NOT-TRACK FEATURES</Text>
            <Text className="text-md text-nhs-black mb-4 ">Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</Text>
            
            <Text className="text-lg font-bold text-nhs-light-green">9. DO WE MAKE UPDATES TO THIS NOTICE?</Text>
            <Text className="text-md text-nhs-black mb-4 italic"><Text className="font-[900] italic">In Short: </Text>Yes, we will update this notice as necessary to stay compliant with relevant laws.</Text>
            <Text className="text-md text-nhs-black mb-4 ">We may update this privacy notice from time to time. The updated version will be indicated by an updated 'Revised' date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</Text>
            
            <Text className="text-lg font-bold text-nhs-light-green">10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Text>
            <Text className="text-md text-nhs-black mb-4 ">If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO), Berit Reglar, by email at berit.reglar@uhb.nhs.uk, or contact us by post at:</Text>
            <Text className="text-md text-nhs-black ">University Hospitals Birmingham NHS Foundation Trust</Text>
            <Text className="text-md text-nhs-black ">Berit Reglar</Text>
            <Text className="text-md text-nhs-black ">Mindelsohn Way</Text>
            <Text className="text-md text-nhs-black ">Edgbaston</Text>
            <Text className="text-md text-nhs-black ">Birmingham B15 2GW</Text>
            <Text className="text-md text-nhs-black mb-4">United Kingdom</Text>

            <Text className="text-lg font-bold text-nhs-light-green">11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</Text>
            <Text className="text-md text-nhs-black ">Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}