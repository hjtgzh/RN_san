/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 王翠娇
 * @Date: 2019-12-25 11:40:27
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 18:10:43
 */
import { OrderStore } from '@/stores/order.store';
import { action, runInAction } from 'mobx';
import { fetchData, BACKEND_URL } from './common';
import {
  OrderParams,
  OrderDetailItem,
  orderDetailInit,
  SpecificationsItem,
  SubmitOrderInfo,
  submitOrderInit,
} from '@/interfaces/order';

class OrderService {
  public store: OrderStore;

  private static instance: OrderService;
  public constructor() {
    this.store = OrderStore.getInstance();
  }
  public static getInstance() {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  /**清空买货和卖货订单 */
  @action
  public clearOrderList = () => {
    this.store.buyerOrderList = [];
    this.store.sellerOrderList = [];
  };

  /**提交订单 */
  @action
  public submitOrder = async (params: OrderParams, totalPrice: number) => {
    console.log('params', params);
    const data = await fetchData<SubmitOrderInfo>(
      { url: `${BACKEND_URL}/service/order/add`, initialData: submitOrderInit },
      params,
      'json',
    );
    console.log('data', data);
    if (data) {
      runInAction(() => {
        this.store.orderInfo = { ...data, totalPrice };
      });
    }
  };

  /**获取订单详情 */
  @action
  public fetchOrderDetail = async (orderCode: string) => {
    const data = await fetchData<OrderDetailItem>(
      { url: `${BACKEND_URL}/service/order/get`, initialData: orderDetailInit },
      { orderCode },
      'get',
    );
    runInAction(() => {
      this.store.orderDetail = data;
    });
  };

  /**根据ID获取供应货品规格 */
  @action
  public fetchSpecifications = async (supplyId: number) => {
    const data = await fetchData<SpecificationsItem[]>(
      { url: `${BACKEND_URL}/service/supply/getSpecifications`, initialData: [] as SpecificationsItem[] },
      { supplyId },
      'get',
    );
    return data;
  };

  /**
   * @功能描述: 创建支付请求
   * @参数: orderCode 订单
   * @参数: payType 支付类型 1为支付宝，2为微信，默认为1
   * @返回值: payStr 支付字符串
   */
  @action
  public createPayment = async (orderCode: string, payType = 1) => {
    const data = await fetchData(
      { url: `${BACKEND_URL}/service/order/createPay`, initialData: { body: '' } },
      { orderCode, payType },
      'json',
    );
    return data.body;
  };
}

export const orderService = OrderService.getInstance();
