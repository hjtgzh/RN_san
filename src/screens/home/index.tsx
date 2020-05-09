import React, { useEffect, useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import Header from '@/components/Header';
import RefreshListView from '@/components/RefreshListView';
import { PAGE } from '@/services/common';
import { homeService } from '@/services/home.service';
import { HomeStoreContext } from '@/stores/home.store';
import { IGoodsListItem } from '@/interfaces/home';
import size from '@/config/size';
import ColGoodsItem from './components/ColGoodsItem';

const { getGoodsData } = homeService;
const { px } = size;

function Home({ navigation }: any) {
  /* store数据 */
  const { refreshState, page, goodsList } = useContext(HomeStoreContext);

  /* 上拉刷新 */
  const onHeaderRefresh = useCallback((refreshState?: number) => {
    getGoodsData({
      page: PAGE,
      refreshState,
    });
  }, []);

  /* 下拉加载 */
  function onFooterRefresh(refreshState: number) {
    getGoodsData({
      page: page + 1,
      refreshState,
    });
  }

  /* 初始化加载数据 */
  useEffect(() => {
    onHeaderRefresh();
  }, [onHeaderRefresh]);

  /* 列表render项 */
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IGoodsListItem>) => {
      return <ColGoodsItem {...item} onPress={() => navigation.navigate('GoodsDetail', { hashId: item.hashId })} />;
    },
    [navigation],
  );

  return (
    <Container>
      <Header title="needs" noleft />
      <View style={styles.content}>
        <RefreshListView
          data={goodsList}
          keyExtractor={(item: IGoodsListItem) => `${item.id}`}
          renderItem={renderItem}
          refreshState={refreshState}
          onHeaderRefresh={onHeaderRefresh}
          onFooterRefresh={onFooterRefresh}
        />
      </View>

      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button onPress={() => navigation.navigate('Profile')}>
          <Text>Go to Profile</Text>
        </Button>
        <Button onPress={() => navigation.navigate('News')}>
          <Text>Go to News</Text>
        </Button>
      </View> */}
    </Container>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  content: {
    padding: px(10),
    paddingBottom: px(53),
  },
});
