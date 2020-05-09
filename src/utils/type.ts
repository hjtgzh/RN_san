/*
 * @文件描述: 类型定义
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-08-30 09:42:38
 * @LastEditors  : 黄建停
 * @LastEditTime : 2020-02-07 11:26:14
 */
export const tuple = <T extends string[]>(...args: T) => args;
export interface Pagination<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}
export interface AjaxResponse<T> {
  code: number;
  data: T;
  result?: T;
  message: string;
  success: boolean;
  status?: string;
  regeocode?: T;
}
