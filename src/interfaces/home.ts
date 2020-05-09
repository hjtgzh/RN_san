/*
 * @文件描述: home
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-31 11:29:07
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-08 17:46:59
 */
export interface IGoodsListParams {
  supplyName?: string; //货品名称
  categoryId?: string;
  province?: string;
  city?: string;
  district?: string;
  minPrice?: string;
  maxPrice?: string;
  minStartingValue?: string;
  bigCategoryId?: number;
  sortType?: string;
  sort?: number;
  maxStartingValue?: string;
  page?: number;
  pageSize?: number;
  refreshState?: number;
  shopId?: string;
  specialtyId?: number | string;
  currentProvince?: string; // 当前省级编号
  currentCity?: string; // 当前市级编号
  currentDistrict?: string; // 当前区级编号
}

// 商品列表item
export interface IGoodsListItem {
  id: number;
  hashId: string;
  title: string;
  startingValue: string;
  price: string;
  unitName: string;
  provinceDesc: string;
  cityDesc: string;
  districtDesc: string;
  imgUrl: string;
}

// 商品详情
export interface IGoodsDetail {
  id: string; // 货品id
  title: string; // 供应标题
  shopUserId: string; // 店铺Id
  shopName: string; // 店铺名称
  phone: string; // 店铺联系电话
  avatar: string; // 店铺头像
  categoryName: string; // 对应品类描述
  categoryId: string; // 对应品类id
  price: string; // 最低价价格
  attention: boolean; // 是否已关注
  unit: string; // 最低价单位
  unitName: string; // 最低价单位名称
  startingValue: string; // 最低价起批量
  address: string; // 详细地址
  transportType: string; // 最低价运费设置
  amount: number; // 成交额
  clicks: string; // 点击量
  description: string; // 商品描述
  imgUrl: string; // 列表主图
  provinceDesc: string; // 省级描述
  cityDesc: string; // 市级描述
  districtDesc: string; // 镇/区描述
  mainImgDTOs: {
    // 主图
    id: string;
    imgUrl: string;
  }[];
  detailImgDTOs: {
    // 详情图
    id: string;
    imgUrl: string;
  }[];
  specificationDTOs: {
    // 供应货品规格
    id: string;
    name: string;
    price: string;
    startingValue: string;
    unitName: string;
  }[];
}

// 店铺信息
export interface IShopInfo {
  shopName: string;
  avatar: string;
  registerData: string;
  cityDesc: string;
  provinceDesc: string;
  districtDesc: string;
  attention: boolean;
  fanNum: number;
  orderNum: number;
  phone: string;
}
