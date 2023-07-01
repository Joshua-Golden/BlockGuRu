import { View, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Redirect } from 'expo-router';
import { ios, customStyle } from '../../../constants/theme';

// shared
import Header from '../../components/shared/Header';
import { BigButton } from '../../components/shared/Button';

const terms = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lorem lacus, efficitur id arcu sit amet, condimentum volutpat diam. Nunc maximus mollis lorem ut imperdiet. Nunc sed ornare lacus, at dictum lorem. Vestibulum nec lacus nec nisl dapibus tincidunt mattis a elit. Nullam pretium sed neque at lacinia. Duis nec quam vel libero convallis placerat nec nec tellus. Duis commodo eros ut gravida semper. Maecenas libero mi, consectetur in nibh eu, cursus ultrices sapien. Cras sit amet lectus non nibh ornare vestibulum eget at metus. Donec odio nulla, consectetur quis arcu quis, rutrum dapibus augue. Sed laoreet, nisi ac aliquet maximus, neque mi euismod velit, et tincidunt magna odio eu ante. Donec lobortis odio mauris, eget malesuada nulla feugiat sit amet. Nullam lobortis ac libero ut vestibulum. Nam massa lorem, scelerisque eget placerat ac, ultricies ut tortor. Aenean luctus luctus facilisis. Curabitur ut porttitor mauris, in malesuada ante. Sed sit amet tristique purus, id aliquet orci. Pellentesque dictum id augue at interdum. In tempor risus finibus nibh ullamcorper dapibus. Duis sit amet risus ut tortor gravida hendrerit. Vivamus tempor in nulla ac molestie. In semper pulvinar nisi, at consectetur urna malesuada sed. Praesent ex risus, dignissim eget maximus et, aliquet consectetur libero. Pellentesque a est et ex tempor posuere eget a turpis. Sed ut tempor nunc. Ut magna est, aliquam nec commodo quis, dictum nec tellus. Morbi non dignissim ipsum. Vestibulum sit amet justo neque. Phasellus dignissim tellus vitae metus blandit pellentesque. Etiam euismod nunc mi, at dapibus nisi tempus non. Curabitur eget velit at nisi semper pellentesque. Duis sem dolor, convallis at maximus in, tristique eu nulla. Pellentesque facilisis non massa sit amet facilisis. Cras eget justo finibus, dictum lorem non, hendrerit tellus. Nunc ultricies, justo non rhoncus suscipit, mauris nulla vulputate nisl, ac congue nulla est vehicula tortor. Praesent ac volutpat eros, a tempus nibh. Praesent vel nulla sit amet arcu faucibus posuere eu eget arcu. Pellentesque sed fringilla mauris. Ut id orci condimentum, malesuada lectus vestibulum, vestibulum arcu. Cras accumsan neque quis est maximus porttitor. Donec risus neque, convallis ut pulvinar at, pharetra vel nulla. Vestibulum blandit venenatis massa, quis hendrerit felis elementum a. Etiam lacinia venenatis elit, nec malesuada sem pharetra ut. Nam elementum, justo in dictum eleifend, odio nibh facilisis nulla, id blandit augue felis quis quam. Sed interdum lobortis tellus, sit amet finibus lorem imperdiet a. Maecenas id gravida neque. Mauris id neque quis magna lacinia elementum. Quisque posuere nibh placerat urna dignissim volutpat. Nunc pretium libero vitae eros tincidunt, vitae efficitur dolor blandit.  Aenean dapibus quis urna sed efficitur. Mauris et pellentesque mi. Maecenas malesuada vitae ante vitae tristique. Nam auctor mi urna. Nam placerat sapien sit amet felis convallis ultrices. Proin dictum tempus congue. Nullam imperdiet id velit vitae lacinia. Sed elementum, leo sed scelerisque porttitor, tortor purus pharetra mauris, eget tempus dolor nunc id felis. Etiam auctor tellus augue, eu auctor sem aliquet non. Curabitur elementum, lectus id semper suscipit, arcu urna pretium odio, in bibendum tellus dui et eros. Nulla sit amet velit purus. Maecenas sagittis augue sit amet convallis volutpat. Praesent at consectetur justo. Aenean feugiat non turpis et aliquam. Nunc malesuada velit nec ante accumsan, quis tempus metus ultrices. Aliquam vehicula nisl ac purus scelerisque egestas. Nulla facilisi. Ut feugiat pharetra metus non posuere. Praesent convallis venenatis erat ut pretium. Morbi eleifend iaculis pharetra. Suspendisse sit amet scelerisque purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In sagittis aliquam dolor quis facilisis. Duis fermentum nibh ut nulla auctor, ut vulputate sem commodo. Curabitur mauris risus, accumsan consequat neque quis, feugiat pretium felis. Fusce molestie hendrerit sapien nec dictum. Nulla molestie ipsum nec urna laoreet, vel dictum dui condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla est leo, maximus a placerat non, egestas et augue."

export default function TermsAndConditions({}) {
  const [ termsAccepted, setTermsAccepted ] = useState(false);
  const navigation = useNavigation();

  const handleTerms = (terms) => {
    if (terms) {
      setTermsAccepted(terms)
      navigation.navigate('home', {termsAccepted})  
    }
    else {
      setTermsAccepted(terms)
      navigation.navigate('welcome', {termsAccepted})  
    }
  }
  return (
    <View className="flex-1 bg-nhs-white justify-center items-center">
      {/* Status Bar */}
      <StatusBar />
      {/* Navigation */}
      <Header title='Terms and Conditions' background='white' isIcon={true} />
      <View className="flex-1 justify-center items-center mx-5">
        <ScrollView className="flex-1">
          <Text className="pb-5"> {terms}</Text>
        </ScrollView>
        <SafeAreaView className={`${ios ? 'my-1' : 'my-4' }`}>
          <View className="flex-row justify-around items-center">
            <TouchableOpacity onPress={() => handleTerms(false)} className="w-[40%]">
              <BigButton text='Decline' color='light-blue' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTerms(true)} className="w-[40%]">
              <BigButton text='Accept' color='light-green' />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
       
      </View>
    </View>
  )
}