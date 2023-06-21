import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

const source = {
  html: `
<p style='text-align:center;'>
  Hello World!
</p>`
};

export default function PostContent() {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView>
      <RenderHtml
        contentWidth={width}
        source={source}
      />
    </SafeAreaView>
  );
}