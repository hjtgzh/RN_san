/*
 * @文件描述: 商品列表-竖向子项
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-11-11 11:27:19
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 09:25:38
 */

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from 'native-base';
import { RectButton } from 'react-native-gesture-handler';
import { size, colors } from '@/config';

const { px } = size;

export default function ColGoodsItem({
  hashId,
  title = '',
  startingValue = '',
  price = '',
  unitName = '',
  provinceDesc = '',
  cityDesc = '',
  districtDesc = '',
  imgUrl,
  shopName = '',
  onPress,
  haveShopName = false,
}: any) {
  const address = `${provinceDesc}${cityDesc}${districtDesc}`;
  return (
    <RectButton key={hashId} onPress={onPress}>
      <View style={styles.category}>
        <Image
          style={styles.categoryImg}
          source={{
            uri: imgUrl,
          }}
        />
        <View style={styles.categoryInfo}>
          <Text numberOfLines={2} style={styles.categoryTitle}>
            {title}
          </Text>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              ￥<Text style={styles.categoryPrice}>{`${price}`}</Text>
              {`/${unitName}`}
            </Text>
            <Text style={styles.priceText}>{`${startingValue}${unitName}起批`}</Text>
          </View>
          <View style={styles.bottom}>
            {haveShopName ? (
              <>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.address}>
                  {address}
                </Text>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.sellerName}>
                  {shopName}
                </Text>
              </>
            ) : (
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.address}>
                货源地：{address}
              </Text>
            )}
          </View>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    paddingVertical: px(16),
    marginHorizontal: 4,
    paddingHorizontal: 4,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  categoryImg: {
    height: px(70),
    width: px(70),
    marginRight: 10,
    borderRadius: 6,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    flex: 1,
    fontSize: px(16),
    color: colors.black,
    fontWeight: '600',
  },
  weight: {
    textAlign: 'right',
    fontSize: px(12),
    marginBottom: 3,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: px(12),
    color: '#7A7F83',
  },
  categoryPrice: {
    color: colors.primary,
    fontSize: px(16),
    fontWeight: '600',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    width: '70%',
    fontSize: px(12),
    color: '#7A7F83',
  },
  sellerName: {
    fontSize: px(12),
    color: '#7A7F83',
    marginLeft: 8,
  },
});
