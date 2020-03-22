/*
 * @文件描述: 提示框
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-03-21 09:53:20
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-03-21 09:53:48
 */

import { Toast } from 'native-base';

/**
 * @功能描述: 提示
 * @参数: message 提示信息
 * @返回值:
 */
export function toastMsg(message: string) {
  Toast.show({
    text: message,
    duration: 2500,
  });
}
export function toastSuccess(message: string) {
  Toast.show({
    type: 'success',
    text: message,
    duration: 2500,
  });
}
export function toastWarning(message: string) {
  Toast.show({
    type: 'warning',
    text: message,
    duration: 2500,
  });
}
export function toastFail(message?: string) {
  Toast.show({
    type: 'danger',
    text: message || '对不起，服务调用失败',
    duration: 2500,
    style: {
      zIndex: 1150,
    },
  });
}
