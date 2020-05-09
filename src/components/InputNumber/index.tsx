/*
 * @文件描述: inputNumber
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-31 18:18:54
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 10:20:38
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Input, Item } from 'native-base';
import { size, colors } from '@/config';

const { px } = size;

/**
 * 父组件传递的参数类型
 * @interface
 */
interface IInputNumberProps {
  /**当前值 */
  value?: string;
  /**最小值 */
  min?: number;
  /**最大值 */
  max?: number;
  /**input的onChange方法 */
  onChange?: (value: string) => void;
  /**是否可以为0 */
  isZero?: boolean;
}

export default function InputNumber(props: IInputNumberProps) {
  const { value, min, max, onChange, isZero } = props;

  const [inputValue, setInputValue] = useState(value || '0');

  /* 减操作 */
  function handleReduce() {
    if ((min || min === 0) && +inputValue <= min) {
      return;
    }
    const MIN_NUM = isZero ? 0 : 1;
    if (+inputValue <= MIN_NUM) {
      return;
    }
    const value = `${Number(inputValue) - 1}`;
    setInputValue(`${Number(inputValue) - 1}`);
    onChange && onChange(value);
  }

  /* 加操作 */
  function handleAdd() {
    if ((max || max === 0) && +inputValue >= max) {
      return;
    }
    const value = `${Number(inputValue) + 1}`;
    setInputValue(value);
    onChange && onChange(value);
  }

  /* value更改函数 */
  function handleInputValue(value: string) {
    setInputValue(value);
    onChange && onChange(value);
  }

  /* input失去焦点的时候 */
  function handleOnBlur() {
    if (min && (!value || +value < min)) {
      setInputValue(`${min}`);
      onChange && onChange(`${min}`);
    }
  }

  /* 设置默认的value */
  useEffect(() => {
    if (value) {
      setInputValue(`${value}`);
      return;
    }
    if (min || min === 0) {
      setInputValue(`${min}`);
    }
  }, []);

  return (
    <View style={styles.countWrap}>
      <TouchableOpacity onPress={handleReduce}>
        <Text style={[styles.countCommon, styles.minus]}>-</Text>
      </TouchableOpacity>
      <Item style={styles.count}>
        <Input
          value={`${inputValue.replace(/[^0-9]/g, '').trim()}`}
          style={styles.countInput}
          keyboardType="numeric"
          onChangeText={value => handleInputValue(value.replace(/[^0-9]/g, '').trim())}
          onBlur={handleOnBlur}
        />
      </Item>
      <TouchableOpacity onPress={handleAdd}>
        <Text style={[styles.countCommon, styles.add]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  countWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  countCommon: {
    width: px(30),
    lineHeight: px(30),
    textAlign: 'center',
    fontSize: px(22),
    borderWidth: 1,
    borderColor: colors.gray,
  },
  minus: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderRightWidth: 0,
  },
  add: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderLeftWidth: 0,
  },
  count: {
    width: px(50),
    borderBottomWidth: 0,
    marginLeft: 0,
  },
  countInput: {
    height: px(32),
    borderWidth: 1,
    borderColor: colors.gray,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
  },
});
