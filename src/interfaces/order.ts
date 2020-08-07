/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 王翠娇
 * @Date: 2019-12-25 13:39:51
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 17:22:15
 */
export interface FetchListData<T> {
  page: number;
  total: number;
  list: T[];
}

export interface PurchaseData {
  page: number;
  total: number;
  list: PurchaseOrderListItem[];
}

/**采购单列表 */
export interface PurchaseOrderListItem {
  sellerHashId: number; //卖家hashid
  sellerId: number; //卖家id
  sellerName: string; //卖家名称
  checked: boolean;
  supplyList: SupplyList[];
}

export interface SupplyList {
  id: number;
  price: number; //货品单价
  quantity: number; //货品数量
  specificationId: number; //货品规格id
  specificationName: string; //规格名称
  supplyHashid: number; //货品hashid
  supplyId: number; //货品id
  supplyImageUrl: string; //主图URL
  supplyName: string; //货品名称
  checked: boolean;
  totalPrice: number;
  unit: number;
  unitDesc: string; //单位描述
  comment: string; //留言
  expectedDays: string; //期望天数
  transportType: number; //运费设置
  transportTypeDesc: string; //运费模板描述
  startingValue: number; //最小起批数量
}

/**订单列表 */
export interface OrderListItem {
  contact: string; //收货人
  deliveryCost: number; //运费
  imageUrl: string; //主图URL
  orderCode: string; //订单号
  payableCost: number; //应付费用
  price: number; //货品单价
  quantity: number; //货品数量
  sellerId: number; //卖家id
  sellerName: string; //卖家名称
  specificationId: number; //货品规格id
  specificationName: string; //规格名称
  status: number; //订单状态
  statusDesc: string; //状态描述
  supplyId: number; //货品id
  supplyName: string; //货品名称
  checked: false;
}

/**提交订单数据 */
export interface OrderParams {
  addressId: number; //地址id
  supplyList: SupplyListItem[];
}

export interface SupplyListItem {
  cartItemId?: number; //采购单id
  comment: string; //买家留言
  expectedDays: number | string; //支付后期望发货天数
  quantity: number; //数量
  specificationId: number; //货品规格id
}

/**订单详情 */
export interface OrderDetailItem {
  actualCost: number; //实付费用
  addressId: number; //收货地址id
  cancelReason: string; //取消理由
  canceledAt: string; //取消时间
  comment: string; //买家留言
  contact: string; //收货人
  contactPhone: string; //收货人联系电话
  createdAt: string; //下单时间
  modifiedAt: string; //修改时间
  deliveryAt: string; //发货时间
  deliveryCost: number; //运费
  expectedDays: number; //支付后期望发货天数
  fullAddress: string; //收货地址
  orderCode: string; //订单号
  orderType: string; //订单类型
  orderTypeDesc: string; //订单类型描述
  paidAt: string; //支付时间
  payableCost: number; //应付费用
  price: number; //规格单价
  quantity: number; //规格数量
  receivedAt: string; //收货时间
  sellerId: number; //卖家id
  sellerName: string; //卖家名称
  specificationId: number; //货品规格id
  specificationName: string; //规格名称
  status: number; //订单状态
  statusDesc: string; //状态描述
  supplyCost: number; //货品费用
  supplyId: number; //货品id
  supplyImageUrl: string; //货品主图URL
  supplyName: string; //货品名称
  restTime: string; //剩余时间
  unitDesc: string; //单位描述
  payTypeDesc: string; //支付方式
}

export const orderDetailInit = {
  actualCost: 0,
  addressId: 0,
  cancelReason: '',
  canceledAt: '',
  comment: '',
  contact: '',
  contactPhone: '',
  createdAt: '',
  modifiedAt: '',
  deliveryAt: '',
  deliveryCost: 0,
  expectedDays: 0,
  fullAddress: '',
  orderCode: '',
  orderType: '',
  orderTypeDesc: '',
  paidAt: '',
  payableCost: 0,
  price: 0,
  quantity: 0,
  receivedAt: '',
  sellerId: 0,
  sellerName: '',
  specificationId: 0,
  specificationName: '',
  status: 0,
  statusDesc: '',
  supplyCost: 0,
  supplyId: 0,
  supplyImageUrl: '',
  supplyName: '',
  restTime: '',
  unitDesc: '',
  payTypeDesc: '',
};

/**规格列表 */
export interface SpecificationsItem {
  id?: number;
  name: string; //规格名称
  price?: number; //价格
  startingValue?: number; //起批量
  supplyId?: number; //对应供应 ID
  transportType?: number; //运费设置
  transportTypeDesc: string; //运费设置描述
  unit?: number; //单位
  unitName: string; //单位描述
}

export const specificationsInit = {
  id: undefined,
  name: '',
  price: undefined,
  startingValue: undefined,
  supplyId: undefined,
  transportType: undefined,
  transportTypeDesc: '',
  unit: undefined,
  unitName: '',
};

export interface OrderInfo {
  orderCode: string;
  totalPrice: number;
}

export const orderInfoInit = {
  orderCode: '',
  totalPrice: 0,
};

/**提交订单返回信息 */
export interface SubmitOrderInfo {
  orderCode: string; //订单号
  parent: boolean; //是否为父订单
  status: number; //订单状态
  statusDesc: string; //订单状态描述
  totalPrice: number; //总金额
}

export const submitOrderInit = {
  orderCode: '',
  parent: false,
  status: 0,
  statusDesc: '',
  totalPrice: 0,
};
