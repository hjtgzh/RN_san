/*
 * @文件描述: 获取权限的方法
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-05-15 14:17:02
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-03-21 10:29:27
 */
import { toastFail } from '@/utils/toast';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { isIOS } from '../config/size';

interface GeolocationReturnType {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

function getPermissionsOptions(title: string, message: string) {
  return {
    title,
    message,
    buttonPositive: '同意',
    buttonNegative: '拒绝',
    buttonNeutral: '稍后再问我',
  };
}

// 定位权限
const locationPermissionsOptions = getPermissionsOptions('请求定位权限', '是否允许黔菜网APP获取当前位置');
export const requestLocationPermission = async () => {
  try {
    if (isIOS()) {
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, locationPermissionsOptions);
      return granted === RESULTS.GRANTED;
    } else {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, locationPermissionsOptions);
      if (granted !== RESULTS.GRANTED) {
        toastFail('获取定位权限失败');
        return false;
      }
      return true;
    }
  } catch (err) {
    toastFail(err.toString());
    return false;
  }
};

/* 默认位置信息 */
const defaultPosition = {
  coords: { longitude: '', latitude: '' },
};

// 获取地理位置
export const getCurrentPosition = async () => {
  /** 获取地理位置 */
  const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      toastFail('设备不支持');
      return defaultPosition;
    case RESULTS.DENIED:
      toastFail('未请求定位权限，先获取定位权限');
      return defaultPosition;
    case RESULTS.GRANTED:
      return new Promise<GeolocationReturnType>(resolve => {
        global.navigator.geolocation.getCurrentPosition(
          (position: GeolocationReturnType) => {
            resolve(position);
          },
          (error: string) => {
            console.log('error', error);
            toastFail('获取位置失败,请重新获取');
          },
        );
      });
    case RESULTS.BLOCKED:
      toastFail('权限被拒绝');
      return defaultPosition;
    default:
      return defaultPosition;
  }
};

/* 相机权限 */
const cameraPermissionsOptions = getPermissionsOptions('请求照相机权限', '是否允许黔菜网APP使用照相机');
export const requestCameraPermission = async () => {
  try {
    if (isIOS()) {
      const granted = await request(PERMISSIONS.IOS.CAMERA, cameraPermissionsOptions);
      return granted === RESULTS.GRANTED;
    } else {
      const granted = await request(PERMISSIONS.ANDROID.CAMERA, cameraPermissionsOptions);
      if (granted !== RESULTS.GRANTED) {
        toastFail('无法访问照相机');
        return false;
      }
      return true;
    }
  } catch (error) {
    toastFail(error.toString());
    return false;
  }
};

/* 手机拨号权限---仅安卓 */
const callPhonePermissionsOptions = getPermissionsOptions('请求手机拨号权限', '是否允许黔菜网APP使用手机拨号');
export const requestAndroidCallPhonePermission = async () => {
  try {
    const granted = await request(PERMISSIONS.ANDROID.CALL_PHONE, callPhonePermissionsOptions);
    if (granted !== RESULTS.GRANTED) {
      toastFail('无法使用手机拨号功能');
      return false;
    }
    return true;
  } catch (error) {
    toastFail(error.toString());
    return false;
  }
};

/**文件访问权限---仅安卓 */
const fileReadPermissionsOptions = getPermissionsOptions(
  '请求访问手机内部文件权限',
  '是否允许黔菜网APP访问您的内部文件以便上传文件',
);
export const requestReadFilePermission = async () => {
  try {
    const granted = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, fileReadPermissionsOptions);
    if (granted !== RESULTS.GRANTED) {
      toastFail('无法访问本地文件');
    }
  } catch (err) {
    toastFail(err.toString());
  }
};

/**文件写入权限---仅安卓 */
const fileWritePermissionsOptions = getPermissionsOptions(
  '请求写入手机内部文件权限',
  '是否允许黔菜网APP写入您的内部文件以便上传文件',
);
export const requestWriteFilePermission = async () => {
  try {
    const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, fileWritePermissionsOptions);
    if (granted !== RESULTS.GRANTED) {
      toastFail('无法访问本地文件');
    }
  } catch (err) {
    toastFail(err.toString());
  }
};
