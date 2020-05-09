/*
 * @文件描述: 通用头部
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-26 15:06:40
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 17:07:39
 */
import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Left, Body, Right, Title, View } from 'native-base';
import { RectButton } from 'react-native-gesture-handler';
import Iconfont from '@/components/Iconfont';
import colors from '@/config/colors';

interface ICHeaderProps {
  title: string | React.ReactElement;
  right?: React.ReactElement;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  noleft?: boolean;
}

export default function CHeader({ title, right, style, iconStyle, noleft }: ICHeaderProps) {
  const navigation = useNavigation();
  return (
    <Header style={[{ backgroundColor: colors.white }, style]} androidStatusBarColor={colors.primary}>
      {noleft ? (
        <View style={{ flex: 1 }} />
      ) : (
        <Left style={{ flex: 1 }}>
          <RectButton onPress={navigation.goBack}>
            <Iconfont style={iconStyle} name="jiantou-zuo" size={22} />
          </RectButton>
        </Left>
      )}
      <Body style={styles.headerTitle}>
        {typeof title === 'string' ? <Title style={{ color: colors.black }}>{title}</Title> : title}
      </Body>
      <Right style={{ flex: 1 }}>{right}</Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
