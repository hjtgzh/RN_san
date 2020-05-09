/*
 * @文件描述: Modal弹窗
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-11-12 20:03:47
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 18:37:37
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import { size, colors } from '@/config';

const { px } = size;

interface ModalProps {
  style?: StyleProp<ViewStyle>;
  modalTitle?: string;
  visible: boolean;
  textContent: React.ReactElement;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  cancel: () => void;
  onRequestClose?: () => void;
  modalTitleStyle?: StyleProp<TextStyle>;
  backdropOpacity?: number;
  textContentStyle?: StyleProp<ViewStyle>;
}

const ModalFrame: React.FC<ModalProps> = props => {
  const {
    style,
    modalTitle,
    visible,
    textContent,
    cancel,
    footer,
    onRequestClose,
    header,
    textContentStyle,
    modalTitleStyle,
    backdropOpacity,
  } = props;
  return (
    <Modal
      style={style}
      isVisible={visible}
      onBackdropPress={cancel}
      backdropOpacity={backdropOpacity ?? 0.4}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modal}>
        {header && (
          <View style={styles.header}>
            <View style={{ width: 22 }}></View>
            {header}
            <TouchableOpacity onPress={cancel}>
              <Icon name="close" size={22} />
            </TouchableOpacity>
          </View>
        )}
        {modalTitle && <Text style={[styles.modalTitle, modalTitleStyle]}>{modalTitle}</Text>}
        <ScrollView style={[styles.scrollView, textContentStyle]}>{textContent}</ScrollView>
        {footer}
      </View>
    </Modal>
  );
};

export default ModalFrame;

const { titleBg, white } = colors;
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: px(16),
    height: px(48),
    width: '100%',
    backgroundColor: white,
    borderBottomColor: colors.titleBg,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    height: px(48),
    lineHeight: px(48),
    width: '100%',
    backgroundColor: titleBg,
    textAlign: 'center',
    fontSize: px(18),
  },
  scrollView: {
    width: '100%',
    backgroundColor: white,
  },
});
