/*
 * @文件描述: 首页 service
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-10-29 16:53:00
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-08-07 19:15:02
 */
import { HomeStore } from '@/stores/home.store';
import { action, runInAction } from 'mobx';
import { RefreshState } from '@/components/RefreshListView';
import { fetchData, fetchPostData, PAGE, PAGE_SIZE, BACKEND_URL } from './common';
import { FetchListData } from '@/interfaces/common';
import { IGoodsListParams, IGoodsListItem, IGoodsDetail, IShopInfo } from '@/interfaces/home';
import { initGoodsData, initGoodsDetail, initShopInfo } from './initData';

export class HomeService {
  public store: HomeStore;

  private static instance: HomeService;
  private constructor() {
    this.store = HomeStore.getInstance();
  }
  public static getInstance() {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService();
    }
    return HomeService.instance;
  }

  /**
   * 获取商品列表数据
   * @param params 传递给后端的参数
   * @param {boolean} [require=true] 是否需要写入store
   */
  @action
  public getGoodsData = async (params: IGoodsListParams, require = true) => {
    console.log('params', params);
    runInAction(() => {
      require && (this.store.refreshState = params.refreshState || RefreshState.HeaderRefreshing);
    });
    const data = await fetchData<FetchListData<IGoodsListItem>>(
      {
        url: `${BACKEND_URL}/service/supply/listByPage`,
        initialData: initGoodsData,
        fetchName: '货品列表',
      },
      params,
    );
    if (require) {
      runInAction(() => {
        const { list, page, total } = data;
        if (page === PAGE) {
          this.store.goodsList = list;
        } else {
          this.store.goodsList = this.store.goodsList.concat(list);
        }
        this.store.page = page;
        if (total === 0) {
          this.store.refreshState = RefreshState.EmptyData;
        } else if (page * PAGE_SIZE >= total) {
          this.store.refreshState = RefreshState.NoMoreData;
        } else {
          this.store.refreshState = RefreshState.Idle;
        }
      });
    }
    return data.list;
  };

  /**将goodsList置空 */
  @action
  public clearGoodsData = () => {
    this.store.goodsList = [];
  };

  /* 获取货品详情数据 */
  @action
  public getGoodsDetail = async (params: { hashId: string }) => {
    const data = await fetchData<IGoodsDetail>(
      {
        url: `${BACKEND_URL}/service/supply/get`,
        initialData: initGoodsDetail,
        fetchName: '货品详情',
      },
      params,
    );
    runInAction(() => {
      this.store[`goodsDetail${params.hashId}`] = data;
    });
  };

  /**清空商品详情 */
  @action
  public clearGoodsDetail = (hashId: string) => {
    this.store[`goodsDetail${hashId}`] = initGoodsDetail;
  };

  /* 收藏货品 */
  @action
  public addGoodsFavorite = async (params: { supplyId: string }) => {
    const data = await fetchPostData(
      {
        url: `${BACKEND_URL}/service/supply/addFavorite`,
        message: '收藏货品',
      },
      params,
      'get',
    );
    return data;
  };

  /* 获取店铺信息 */
  @action
  public getShopInfo = async (params: { shopId: string }) => {
    const data = await fetchData<IShopInfo>(
      {
        url: `${BACKEND_URL}/service/shop/getShopInfo`,
        initialData: initShopInfo,
        fetchName: '店铺信息',
      },
      params,
    );
    runInAction(() => {
      this.store.shopInfo = data;
    });
  };
}

export const homeService = HomeService.getInstance();
