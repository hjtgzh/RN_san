/*
 * @文件描述: 通用interfaces
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-18 17:01:40
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 17:25:26
 */
export interface ILoginData {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface FetchDataType<T> {
  data: T;
}

export interface FetchListData<T> {
  page: number;
  total: number;
  list: T[];
}

export type valueType = string | number;

export type valuesType = Array<string | number>;

export interface SelectOption {
  label: string;
  value: valueType;
}
