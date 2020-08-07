/*
 * @文件描述: 首页常量
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-11-11 10:16:08
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 16:44:09
 */

export const ensureList = ['在线交易', '100%现货', '交易保障', '虚假价格包赔', '一贵就赔', '72小时发货'];

/* 运费类型 */
export const transportTypeObj: any = {
  1: '全国包邮',
  2: '除港澳台、新疆、西藏地区包邮',
  3: '运费待协商',
};

/* 单位类型 */
export const unitTypeObj = {
  1: '斤',
  2: '公斤',
  3: '吨',
  4: '箱',
  5: '盒',
  6: '只',
  7: '头',
  8: '条',
  9: '个',
};

export const serviceList = [
  {
    type: '服务',
    list: [
      {
        icon: 'zaixianjiaoyi',
        title: '承诺在线交易',
        detail: '商家引导私下转账或在第三方平台交易举报有奖',
      },
      {
        icon: 'jiaoyibaozhang',
        title: '交易保障',
        detail: '私加微信、QQ第三方聊天工具等引导私下交易行为举报有奖',
      },
      {
        icon: 'yiguijiupei',
        title: '一贵就赔',
        detail: '同商家发布在黔菜网同产品同规格的产品价格高于其他平台举报有奖',
      },
      {
        icon: 'xianhuo',
        title: '100%现货',
        detail: '无货空挂，在售产品下单缺货等行为举报有奖',
      },
    ],
  },
  {
    type: '基础服务',
    list: [
      {
        icon: 'zaixianjiaoyi',
        title: '虚假价格赔付',
        detail: '商家承诺虚假报价且价格波动超过正常范围时赔付买家',
      },
      {
        icon: 'jiaoyibaozhang',
        title: '货不对板赔付',
        detail: '商家承诺货品的品种、规格、品质和约定不一致时赔付买家',
      },
      {
        icon: 'yiguijiupei',
        title: '少货赔付',
        detail: '商家承诺货品数量或重量不足时，可以赔付买家',
      },
      {
        icon: 'xianhuo',
        title: '未按时发货赔付',
        detail: '商家承诺未按时发货、收钱不发货时可以赔付买家',
      },
      {
        icon: 'xianhuo',
        title: '72小时发货',
        detail: '商家承诺买家支付货款后72小时内发货，否则赔付买家',
      },
    ],
  },
];

/**支付方式 */
export const PAY_TYPE = [
  {
    id: 1,
    icon: 'zhifubao',
    color: '#1890FF',
    type: '支付宝支付',
    content: '单笔最高2千～5万',
    checked: true,
  },
  {
    id: 2,
    icon: 'weixin',
    color: '#36C678',
    type: '微信支付',
    content: '单笔最高2千～5万',
    checked: false,
  },
];
