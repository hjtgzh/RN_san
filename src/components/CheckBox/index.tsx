/*
 * @文件描述:选择框CheckBox
 * @公司: thundersdata
 * @作者: 王翠娇
 * @Date: 2020-01-03 10:11:07
 * @LastEditors  : 王翠娇
 * @LastEditTime : 2020-01-03 16:43:46
 */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Iconfont from '@/components/Iconfont';
import { colors } from '@/config';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = props => {
  const { checked, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      {checked ? (
        <Iconfont name="xuanzhong" color={colors.green} size={20} />
      ) : (
        <Iconfont name="weixuanzhong" size={20} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
