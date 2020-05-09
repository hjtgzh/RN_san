/*
 * @文件描述: 通用方法
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-03-21 10:31:44
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-05-09 10:19:21
 */

/**
 * 从对象中删除空字段
 * @param obj: Object
 * @return 新的对象
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyFromObj = (obj: Record<string, any>) => {
  const newObj: Record<string, unknown> = {};
  for (const key in obj) {
    const item = obj[key];
    if (item === '' || item === null || item === undefined || item.length === 0) continue;
    newObj[key] = item;
  }
  return newObj;
};

/**数字相乘 */
export const computedMul = (...muls: number[]) => {
  let pos = 0;
  let res = 1;
  muls
    .map(mul => {
      const str = mul.toString();
      if (/\./.test(str)) {
        pos += str.split('.')[1].length;
      }
      return str;
    })
    .forEach(item => {
      res *= Number(/\./.test(item) ? item.replace('.', '') : item);
    });
  const result = res / Math.pow(10, pos);
  return pos > 0 ? Number(result.toFixed(2)) : result;
};
