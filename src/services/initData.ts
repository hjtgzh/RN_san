/*
 * @文件描述: 初始数据
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-18 17:09:46
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 17:23:26
 */

import { PAGE, TOTAL } from './common';

export const initLoginData = {
  access_token: '',
};

// 货品列表
export const initGoodsData = {
  list: [],
  page: PAGE,
  total: TOTAL,
};

// 货品详情
export const initGoodsDetail = {
  id: '',
  title: '',
  shopUserId: '',
  shopName: '',
  phone: '',
  avatar: '',
  categoryName: '',
  categoryId: '',
  price: '',
  attention: false,
  unit: '',
  unitName: '',
  startingValue: '',
  address: '',
  transportType: '',
  amount: 0,
  clicks: '',
  description: '',
  imgUrl: '',
  provinceDesc: '',
  cityDesc: '',
  districtDesc: '',
  mainImgDTOs: [
    {
      id: '',
      imgUrl: '',
    },
  ],
  detailImgDTOs: [
    {
      id: '',
      imgUrl: '',
    },
  ],
  specificationDTOs: [
    {
      id: '',
      name: '',
      price: '',
      startingValue: '',
      unitName: '',
    },
  ],
};

// 店铺详情
export const initShopInfo = {
  shopName: '',
  avatar: '',
  registerData: '',
  provinceDesc: '',
  cityDesc: '',
  districtDesc: '',
  attention: false,
  fanNum: 0,
  orderNum: 0,
  phone: '',
};
