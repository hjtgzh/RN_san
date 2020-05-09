/*
 * @文件描述: useFilter过滤组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-10-14 18:08:12
 * @LastEditors  : 黄建停
 * @LastEditTime : 2020-02-03 21:24:45
 */
import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { valueType, valuesType } from '../interfaces/common';
const strLength = function(str) {
  return Array.from(str).length;
};
/** 用于分析模块的过滤组件 */
export const useFilter = <T>(initialFilterObject: T) => {
  const [filterObject, setFilterObject] = useState<T>(initialFilterObject);
  const filterRef = useRef<T>(initialFilterObject);

  useLayoutEffect(() => {
    filterRef.current = filterObject;
  });
  const onFilterChange = useCallback(
    (value: valueType | valuesType | Date | object, field: string) => {
      if ((field === 'title' && strLength(value) > 30) || (field === 'description' && strLength(value) > 200)) {
        return;
      }
      const newFilterObject = { ...filterRef.current };
      newFilterObject[field] = value;
      filterRef.current = newFilterObject;
      setFilterObject(newFilterObject);
    },
    [setFilterObject, filterRef],
  );

  const onInit = useCallback(
    (newValue: T) => {
      setFilterObject(newValue);
    },
    [setFilterObject],
  );

  return [filterObject, onFilterChange, onInit] as const;
};
