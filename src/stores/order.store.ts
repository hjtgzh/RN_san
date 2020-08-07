/*
 * @文件描述:订单模块
 * @公司: thundersdata
 * @作者: 王翠娇
 * @Date: 2019-12-25 11:40:38
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 17:17:39
 */
import { createContext } from 'react';
import { observable } from 'mobx';
import {
  OrderListItem,
  OrderDetailItem,
  orderDetailInit,
  SpecificationsItem,
  PurchaseOrderListItem,
  SubmitOrderInfo,
  submitOrderInit,
} from '@/interfaces/order';
import { PAGE, TOTAL } from '@/services/common';
import { RefreshState } from '@/components/RefreshListView';

export class OrderStore {
  private static instance: OrderStore;
  private constructor() {}

  public static getInstance() {
    if (!OrderStore.instance) {
      OrderStore.instance = new OrderStore();
    }
    return OrderStore.instance;
  }

  /** 加载状态：
   * Idle（普通状态）
   * HeaderRefreshing（头部菊花转圈圈中）
   * FooterRefreshing（底部菊花转圈圈中）
   * NoMoreData（已加载全部数据）
   * Failure（加载失败）
   */
  @observable
  public refreshState: number = RefreshState.Idle;

  /**采购单 */
  @observable
  public purchaseOrder: PurchaseOrderListItem[] = [];
  @observable
  public purchaseOrderPage: number = PAGE;
  @observable
  public purchaseOrderTotal: number = TOTAL;
  @observable
  public listLength = 0;

  @observable
  public checkedPurchaseList: PurchaseOrderListItem[] = [];

  @observable
  public orderList: OrderListItem[] = [];

  @observable
  public buyerOrderList: OrderListItem[] = [];

  @observable
  public sellerOrderList: OrderListItem[] = [];

  @observable
  public orderPage: number = PAGE;
  @observable
  public orderTotal: number = TOTAL;

  @observable
  public orderDetail: OrderDetailItem = orderDetailInit;

  @observable
  public specificationsList: SpecificationsItem[] = [];

  @observable
  public orderInfo: SubmitOrderInfo = submitOrderInit;
}

export const OrderStoreContext = createContext(OrderStore.getInstance());
