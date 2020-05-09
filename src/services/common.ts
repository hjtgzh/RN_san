/*
 * @文件描述: 通用配置
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-17 20:31:52
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 17:42:14
 */
import request from '@/utils/request';
import { toastFail } from '@/utils/toast';

// TODO: 后期替换
export const AUTH_URL = 'http://api.thundersdata.com'; // 认证中心环境地址
export const BACKEND_URL = 'http://agriculture.gateway.test.thundersdata.com'; // 测试环境地址
// export const BACKEND_URL = 'http://120.79.184.173:8080'; // 正式环境地址
export const UPLOAD_URL = 'http://object-service.thundersdata.com/upload/public'; // 正式环境上传地址
// export const UPLOAD_URL = 'http://object-service.test.thundersdata.com/upload/public'; // 测试环境上传地址
export const GAODE_URL = 'https://restapi.amap.com'; // 高德地图地址

// TODO: 后期替换
export const OAUTH_PARAMS = {
  clientId: 'logistics',
  clientSecret: 'L9ZUYKIM',
  scope: 'read',
  registerType: 'password',
  grantType: 'password',
  grantTypeSms: 'sms',
};

// 列表数值
export const PAGE = 1;
export const PAGE_SIZE = 10;
export const TOTAL = 0;

export const OAUTH_TYPES = Object.freeze({
  REGISTER: 0,
  FORGETPWD: 1,
  LOGIN: 2,
});

type FetchType = 'get' | 'post' | 'json' | 'postFile';
/**
 * 得到request的具体方法
 * @param type
 */
function getFetchMethod(type: FetchType) {
  switch (type) {
    case 'post':
      return 'postForm';

    case 'json':
      return 'postJSON';

    case 'postFile':
      return 'postFile';

    case 'get':
    default:
      return 'get';
  }
}

/**
 * 封装公共的发业务请求的方法
 * @param config 配置，包含要请求的url和默认值
 * @param params 请求的参数
 * @param type 请求的类型
 */
export async function fetchData<T>(
  config: { url: string; initialData: T; fetchName?: string },
  params?: object,
  type: FetchType = 'get',
) {
  try {
    const method = getFetchMethod(type);
    const result = await request[method]<T>(config.url, params);
    if (result.success) {
      return result.data || result.result || config.initialData;
    } else {
      config.fetchName && toastFail(`获取${config.fetchName}数据失败`);
    }
    return config.initialData;
  } catch (error) {
    if (error.message === 'cancel') {
      // toastFail('请不要频繁操作');
    } else {
      if (error.message) {
        toastFail(error.message);
      } else {
        config.fetchName && toastFail(`获取${config.fetchName}数据失败`);
      }
    }
    return config.initialData;
  }
}

/**
 * 封装公共的提交数据的方法
 * @param config 配置，包含要请求的url和提示信息
 * @param params 请求的参数
 * @param type 请求的类型
 */
export async function fetchPostData<T>(
  config: { url: string; message?: string },
  params?: object,
  type: FetchType = 'post',
) {
  try {
    const method = getFetchMethod(type);
    const result = await request[method]<T>(config.url, params);
    if (!result.success) {
      config.message && toastFail(result.message || `${config.message}失败`);
    }
    return result.success;
  } catch (error) {
    if (error.message === 'cancel') {
      // toastFail('请不要频繁操作');
    } else {
      config.message && toastFail(error.message || `${config.message}失败`);
    }
    return false;
  }
}

/**
 * 封装高德地图请求的方法
 * @param config 配置，包含要请求的url和默认值
 * @param params 请求的参数
 * @param type 请求的类型
 */
export async function fetchGaodeAddressData<T>(
  config: { url: string; initialData: T; fetchName?: string },
  params?: object,
  type: FetchType = 'get',
) {
  try {
    const method = getFetchMethod(type);
    const result = await request[method]<T>(config.url, params);
    if (result.status === '1') {
      return result.regeocode || config.initialData;
    } else {
      config.fetchName && toastFail(`获取${config.fetchName}数据失败`);
    }
    return config.initialData;
  } catch (error) {
    if (error.message === 'cancel') {
      // toastFail('请不要频繁操作');
    } else {
      if (error.message) {
        toastFail(error.message);
      } else {
        config.fetchName && toastFail(`获取${config.fetchName}数据失败`);
      }
    }
    return config.initialData;
  }
}
