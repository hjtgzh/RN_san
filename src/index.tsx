import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';
import Drawer from 'react-native-drawer';

import { Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

console.disableYellowBox = true;

const obj = {
  bol: false,
};

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#FF5A5F" />
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>{obj?.bol ? 111 : 222}</Text>
          <Text>测试</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
);

export default App;
