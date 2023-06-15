import 'react-native-url-polyfill/auto'
import "expo-router/entry";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export const revalidate = 0;