/*
 * @文件描述: 下拉刷新
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-01-04 16:44:13
 * @LastEditors  : 黄建停
 * @LastEditTime : 2020-01-04 16:51:19
 */

import { useState, useCallback } from 'react';

export default function useRefresh() {
  const [refreshing, setRefreshing] = useState(true);

  const refresh = useCallback(
    (nextValue: boolean) => {
      setRefreshing(nextValue);
    },
    [setRefreshing],
  );

  return [refreshing, refresh] as const;
}
