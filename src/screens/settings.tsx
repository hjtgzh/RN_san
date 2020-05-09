/*
 * @文件描述: Settings页面
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-03-22 10:48:05
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 16:24:28
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

export default function SettingsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>
        <Text>Go to Details</Text>
      </Button>
    </View>
  );
}
