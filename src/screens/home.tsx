import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        <Text>Go to Details</Text>
      </Button>
    </View>
  );
}
