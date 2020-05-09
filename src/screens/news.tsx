/*
 * @文件描述: Newss页面
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-03-22 10:48:05
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 16:24:12
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

export default function NewsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>News Screen</Text>
      <Button onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home</Text>
      </Button>
    </View>
  );
}
