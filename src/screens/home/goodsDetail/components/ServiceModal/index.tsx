/*
 * @文件描述: 服务详情弹框
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-17 20:14:10
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 10:13:51
 */

import React from 'react';
import { TouchableNativeFeedback, StyleSheet, ScrollView } from 'react-native';
import { View, Text } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconfont from '@/components/Iconfont';
import Modal from '@/components/Modal';
import { serviceList } from '../../../constant';
import { size, colors } from '@/config';

const { px } = size;

interface IServiceModalProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
}

export default function ServiceModal(props: IServiceModalProps) {
  return (
    <Modal
      style={{ justifyContent: 'flex-end', margin: 0, padding: 0 }}
      textContent={
        <ScrollView style={{ height: px(420) }}>
          <View style={styles.content}>
            {serviceList.map(item => (
              <View key={item.type}>
                <Text style={styles.type}>{item.type}</Text>
                <View style={styles.list}>
                  {item.list.map(listItem => (
                    <View key={listItem.title} style={styles.listItem}>
                      <Iconfont style={styles.icon} color={colors.primary} name={listItem.icon} size={20}></Iconfont>
                      <View style={styles.detail}>
                        <Text style={styles.title}>{listItem.title}</Text>
                        <Text style={styles.detailText}>{listItem.detail}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      }
      footer={
        // 不能用RectButton,没效果
        <TouchableNativeFeedback onPress={() => props.handleVisible(false)}>
          <View style={styles.closeIcon}>
            <Icon name="close" size={22} />
          </View>
        </TouchableNativeFeedback>
      }
      cancel={() => props.handleVisible(false)}
      visible={props.visible}
    ></Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
  },
  type: {
    fontSize: px(16),
    fontWeight: '600',
    lineHeight: px(36),
    height: px(36),
    backgroundColor: '#FAFAFA',
    color: colors.black,
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: px(16),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
  list: {
    paddingHorizontal: px(16),
  },
  listItem: {
    height: px(56),
    paddingHorizontal: 6,
    marginVertical: px(10),
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
    marginTop: 3,
  },
  img: {
    height: px(25),
    width: px(25),
    marginRight: 8,
    marginTop: 3,
  },
  detail: {
    paddingRight: 10,
  },
  title: {
    fontWeight: '600',
    color: colors.black,
    lineHeight: px(26),
  },
  detailText: {
    height: '100%',
    paddingRight: 10,
    lineHeight: px(20),
  },
  closeIcon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: px(15),
    backgroundColor: colors.white,
  },
});
