/*
 * @文件描述: 商品详情页面
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-05-29 15:45:14
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 14:23:46
 */

import React, { useState, useEffect, useContext } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Image, ScrollView, Linking } from 'react-native';
import { Text, View, Container } from 'native-base';
// import { withNavigation } from 'react-navigation';
import Swiper from 'react-native-swiper';
import { RectButton } from 'react-native-gesture-handler';
// import NavigationService from '@/NavigationService';
import Iconfont from '@/components/Iconfont';
import ServiceModal from './components/ServiceModal';
import PurchaseModal from './components/PurchaseModal';
import { ensureList, transportTypeObj } from '../constant';
import { colors } from '@/config';
import { homeService } from '@/services/home.service';
import { HomeStoreContext } from '@/stores/home.store';
import { styles } from './style';
import { initGoodsDetail } from '@/services/initData';

const { getGoodsDetail } = homeService;

function GoodsDetail({ route }: any) {
  /* 获取路由参数 */
  const { hashId } = route.params;

  /* store数据 */
  const store: any = useContext(HomeStoreContext);

  /* 动态添加store observable 属性 */
  if (!store[`goodsDetail${hashId}`]) {
    extendObservable(store, {
      [`goodsDetail${hashId}`]: initGoodsDetail,
    });
  }

  const {
    shopName = '',
    phone = '',
    title = '',
    amount = 0,
    clicks = '',
    provinceDesc = '',
    cityDesc = '',
    districtDesc = '',
    transportType = '3', // 默认为3，表示待协商
    mainImgDTOs = [],
    detailImgDTOs = [],
    specificationDTOs = [],
  } = store[`goodsDetail${hashId}`] || initGoodsDetail;

  /* 操作state */
  const [serviceVisible, setServiceVisible] = useState(false);
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [purchaseId, setPurchaseId] = useState('');

  /* 初始化请求数据 */
  useEffect(() => {
    getGoodsDetail({
      hashId,
    });
  }, [hashId]);

  /* 采购modal关闭 */
  function handlePurchaseVisible(visible: boolean) {
    setPurchaseVisible(visible);
    setIsBuyNow(false);
  }

  /* 加入采货单 */
  async function handlePurchase() {
    setPurchaseId(specificationDTOs[0].id);
    setPurchaseVisible(true);
  }

  /* 立即购买 */
  async function buyNow() {
    handlePurchase();
    setIsBuyNow(true);
  }

  /**打电话 */
  const handlePhone = async (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  let priceInterval = '';
  if (specificationDTOs.length > 0) {
    const priceArr = specificationDTOs.map((item: any) => item.price);
    if (priceArr.length > 1) {
      priceInterval = `${Math.min(...priceArr)}～${Math.max(...priceArr)}`;
    } else {
      priceInterval = priceArr[0];
    }
  }

  return (
    <Container>
      <ServiceModal visible={serviceVisible} handleVisible={setServiceVisible} />
      <PurchaseModal
        hashId={hashId}
        visible={purchaseVisible}
        handleVisible={handlePurchaseVisible}
        purchaseId={purchaseId}
        isBuyNow={isBuyNow}
        shopName={shopName}
        onRequestClose={() => setPurchaseVisible(false)}
        title={title}
      />
      <ScrollView>
        <Swiper style={styles.wrapper} showsButtons={false} activeDotColor={colors.primary}>
          {mainImgDTOs.map((item: any) => (
            <Image key={item.id} style={styles.banner} source={{ uri: item.imgUrl }} />
          ))}
        </Swiper>
        <View style={styles.content}>
          <Text style={styles.price}>{`￥${priceInterval}`}</Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.deal}>
            <Text style={styles.smallText}>{`成交 ${amount}元`}</Text>
            <Text style={styles.smallText}>{`${clicks}人看过`}</Text>
          </View>
        </View>
        <View style={styles.address}>
          <Text style={styles.textColor}>货源地</Text>
          <Text>{`${provinceDesc}${cityDesc}${districtDesc}`}</Text>
        </View>
        <View style={[styles.address, styles.freight]}>
          <Text style={styles.textColor}>物流说明</Text>
          <Text>{transportTypeObj[transportType]}</Text>
        </View>
        <RectButton onPress={() => setServiceVisible(true)}>
          <View style={styles.ensure}>
            <Text style={styles.ensureText}>保障</Text>
            <View style={styles.ensureContent}>
              {ensureList.map((item: any) => (
                <View key={item} style={styles.ensureItem}>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.ensureTitle}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={{ width: '10%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <Iconfont name="jiantou-you" size={20} />
            </View>
          </View>
        </RectButton>
        <View style={styles.specification}>
          <Text style={styles.specifiTitle}>选择规格</Text>
          <View style={styles.specifiItemWrap}>
            {specificationDTOs.slice(0, 2).map((item: any) => (
              <RectButton
                key={item.id}
                onPress={() => {
                  setPurchaseVisible(true);
                  setPurchaseId(item.id);
                }}
              >
                <View style={styles.specifiItem}>
                  <Text style={styles.specifiItemText} numberOfLines={2}>
                    {item.name}
                  </Text>
                </View>
              </RectButton>
            ))}
          </View>

          {specificationDTOs.length > 2 && (
            <RectButton onPress={handlePurchase}>
              <Text>更多 &gt;&gt;</Text>
            </RectButton>
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.addressInfo}>
            <View style={styles.shop}>
              <Text style={styles.addressText}>{shopName}</Text>
              <Text style={styles.coreTitle}>优选</Text>
            </View>
          </View>
          <Text style={styles.detailTitle}>货品详情</Text>
          {detailImgDTOs.map((item: any) => (
            <Image key={item.id} style={styles.picDetail} source={{ uri: item.imgUrl }} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.handleBt}>
        <RectButton onPress={handlePurchase}>
          <View style={[styles.btStyle, { borderRightWidth: 1 }]}>
            <Iconfont name="caihuodan" size={24}></Iconfont>
            <Text style={styles.btText}>加进货单</Text>
          </View>
        </RectButton>
        <RectButton onPress={() => handlePhone(phone)}>
          <View style={styles.btStyle}>
            <Iconfont name="dadianhua" size={24}></Iconfont>
            <Text style={styles.btText}>打电话</Text>
          </View>
        </RectButton>
        <RectButton style={{ flex: 1 }} onPress={buyNow}>
          <Text style={styles.buy}>立即购买</Text>
        </RectButton>
      </View>
    </Container>
  );
}

GoodsDetail.navigationOptions = {
  header: null,
};

export default observer(GoodsDetail);
