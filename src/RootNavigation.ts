/*
 * @文件描述: 配置跟路由
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-05-09 15:01:40
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 18:16:01
 */
import React from 'react';

export const isMountedRef: any = React.createRef();

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  }
}

export function goBack() {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack();
  }
}
