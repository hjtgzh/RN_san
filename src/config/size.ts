/*
 * @文件描述: size配置
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-03-21 09:09:09
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-03-21 09:17:42
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const uiPageWidth = 375;

const px = (uiPx: number) => (uiPx * DEVICE_WIDTH) / uiPageWidth;

export function isIOS() {
  return Platform.OS === 'ios';
}

export default {
  px,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  ONE_PIXEL: 1 / PixelRatio.get(),
};
