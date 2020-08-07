/*
 * @文件描述: 首页 store
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-17 20:24:45
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-08-07 19:23:55
 */
import { createContext } from 'react';
import { observable } from 'mobx';
import { RefreshState } from '@/components/RefreshListView';
import { IGoodsListItem, IGoodsDetail } from '@/interfaces/home';
import { PAGE, TOTAL } from '../services/common';
import { initGoodsDetail } from '../services/initData';

export class HomeStore {
  private static instance: HomeStore;
  private constructor() {}

  public static getInstance() {
    if (!HomeStore.instance) {
      HomeStore.instance = new HomeStore();
    }
    return HomeStore.instance;
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

  @observable
  public supplyHallRefreshState: number = RefreshState.Idle;

  @observable
  public page: number = PAGE;

  @observable
  public total: number = TOTAL;

  // 商品列表
  @observable
  public goodsList: IGoodsListItem[] = [];

  // 商品详情
  @observable
  public goodsDetail: IGoodsDetail = initGoodsDetail;
}
export const HomeStoreContext = createContext(HomeStore.getInstance());
