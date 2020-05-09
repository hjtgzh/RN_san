/*
 * @文件描述: 购买弹框
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-17 20:14:10
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 14:13:52
 */

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { TouchableNativeFeedback, StyleSheet, ScrollView, Image } from 'react-native';
import { View, Text } from 'native-base';
import Modal from '@/components/Modal';
import InputNumber from '@/components/InputNumber';
import { size, colors } from '@/config';
import { HomeStoreContext } from '@/stores/home.store';
// import { orderService } from '@/services/order.service';
// import { toastSuccess } from '@/utils/toast';
import { useFilter } from '@/hooks/useFilter';
// import NavigationService from '@/NavigationService';
import { computedMul } from '@/utils/index';

const { px } = size;
// const { addPurchaseOrder } = orderService;

interface IPurchaseModalProps {
  hashId?: string;
  purchaseId: string;
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  isBuyNow: boolean; // 是否立即购买 BuyNow
  shopName: string; // 商家名称
  onRequestClose?: () => void;
  title?: string;
}

/* 初始化筛选参数 */
const initialFilterObject = {
  activeObj: {
    activeId: '',
    price: '',
    unitName: '',
    startingValue: '',
  },
};

export default observer((props: IPurchaseModalProps) => {
  /* 父级props数据 */
  const { visible, handleVisible, purchaseId, isBuyNow, onRequestClose } = props;

  /* store数据 */
  const store: any = useContext(HomeStoreContext);

  const { mainImgDTOs, specificationDTOs } = store[`goodsDetail${props.hashId}`];
  /* state操作 */
  const [value, setValue] = useState('');
  const [minWarning, setMinWarning] = useState(false);
  const [filterObject, onFilterChange] = useFilter(initialFilterObject);

  /* 设置value */
  const handleSetValue = useCallback(() => {
    const specification = specificationDTOs.find((item: any) => item.id === purchaseId);
    onFilterChange({ ...specification, activeId: purchaseId }, 'activeObj');
    setValue(specification && specification.startingValue);
  }, [onFilterChange, purchaseId, specificationDTOs]);

  /* 初始化请求数据 */
  useEffect(() => {
    handleSetValue();
  }, [handleSetValue]);

  /* 切换规格 */
  function handleSetActiveId(id: number) {
    const specification = specificationDTOs.find((item: any) => item.id === id);
    onFilterChange({ ...specification, activeId: id }, 'activeObj');
    setValue(specification && specification.startingValue);
  }

  const {
    activeObj: { activeId, price = 0, unitName = '', startingValue = 0 },
  } = filterObject;

  /* input输入值改变 */
  function inputValueChange(value: string) {
    if (+value < +startingValue) {
      setMinWarning(true);
    } else {
      setMinWarning(false);
    }
    setValue(value);
  }

  /* 添加采购单 */
  async function handlePurchase() {
    if (+value < +startingValue) {
      return;
    }
    // const specification = specificationDTOs.find((item: any) => item.id === activeId) || { id: '' };
    if (activeId) {
      handleVisible(false);
      if (isBuyNow) {
        // NavigationService.navigate('BuyNow', {
        //   orderObj: { ...specification, qunatity: value, shopName, imgUrl: mainImgDTOs[0].imgUrl, title },
        // });
      } else {
        // const result = await addPurchaseOrder({ specificationId: specification && specification.id, qunatity: value });
        // if (result) {
        //   toastSuccess('加入采货单成功');
        // }
      }
      handleSetValue();
    }
  }

  return (
    <Modal
      style={styles.modal}
      textContent={
        <>
          {!activeId && <Text style={styles.warn}>请选择规格</Text>}
          <ScrollView style={{ height: px(420) }}>
            <View style={styles.content}>
              <View style={styles.title}>
                <Image style={styles.img} source={{ uri: mainImgDTOs[0].imgUrl }} />
                <View>
                  <Text style={styles.price}>
                    ￥<Text style={styles.priceNum}>{price}</Text>
                  </Text>
                  <Text>{`${startingValue}${unitName}以上`}</Text>
                </View>
              </View>
              <Text style={styles.specifiTitle}>规格</Text>
              <View style={styles.specifiList}>
                {specificationDTOs.map((item: any) => (
                  <TouchableNativeFeedback key={item.id} onPress={() => handleSetActiveId(item.id)}>
                    <Text style={[styles.specifiItem, activeId === item.id && styles.specifiCheckedItem]}>
                      {item.name}
                    </Text>
                  </TouchableNativeFeedback>
                ))}
              </View>
              {minWarning && <Text style={styles.warn}>{`数量不能小于${startingValue}`}</Text>}
              <View style={styles.number}>
                <Text>数量</Text>
                <InputNumber value={`${value}`} min={+startingValue} onChange={value => inputValueChange(value)} />
              </View>
              <View style={styles.amount}>
                <Text>货品金额</Text>
                <Text style={styles.amountText}>{`${(value && price && computedMul(+value, +price)) || 0}元`}</Text>
              </View>
            </View>
          </ScrollView>
        </>
      }
      footer={
        // 不能用RectButton,没效果
        <TouchableNativeFeedback onPress={handlePurchase}>
          <View style={styles.sureBt}>
            <Text style={{ color: colors.white }}>确定</Text>
          </View>
        </TouchableNativeFeedback>
      }
      cancel={() => {
        handleSetValue();
        handleVisible(false);
      }}
      visible={visible}
      onRequestClose={onRequestClose}
    ></Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
  warn: {
    color: colors.orange,
    textAlign: 'right',
  },
  content: {
    width: '100%',
    height: '100%',
    padding: px(16),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  img: {
    height: px(100),
    width: px(100),
    borderRadius: 4,
    marginRight: px(10),
  },
  price: {
    color: colors.primary,
    marginBottom: 5,
  },
  priceNum: {
    color: colors.primary,
    fontSize: px(18),
    fontWeight: '600',
  },
  specifiTitle: {
    lineHeight: px(40),
    fontSize: px(16),
    marginTop: 10,
  },
  specifiList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: px(70),
  },
  specifiItem: {
    width: px(100),
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: px(16),
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 20,
  },
  specifiCheckedItem: {
    color: colors.primary,
    borderColor: colors.primary,
  },
  number: {
    height: px(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    height: px(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  },
  amountText: {
    color: colors.primary,
    fontSize: px(18),
    fontWeight: '600',
  },
  sureBt: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: px(15),
    backgroundColor: colors.primary,
  },
});
