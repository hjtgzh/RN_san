/*
 * @文件描述: 验证
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-12-17 09:57:54
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-03-21 10:35:09
 */
export default {
  /**
   * 检验是否是手机号
   */
  isPhone: function(value: string): boolean {
    const reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(value);
  },

  /**
   * 检验是否是座机
   */
  isTel: function(value: string): boolean {
    const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    return reg.test(value);
  },

  /**
   * 检验是否是邮箱
   */
  isEmail: function(value: string): boolean {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },

  /**
   * 检验是否是数字
   */
  isNumber: function(value: string): boolean {
    const reg = /^[0-9]+.?[0-9]*/;
    return reg.test(value);
  },

  /**
   * 检验密码格式是否正确(8位以上字母和数字组成的密码)
   */
  isPassword: function(value: string): boolean {
    const reg = /[0-9A-Za-z]{8,}/;
    return reg.test(value);
  },
};
