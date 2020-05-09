/*
 * @文件描述: 一个基于FlatList的列表下拉、上拉刷新控件
 * @公司: thundersdata
 * @作者: 陈杰
 * @LastEditors: 黄建停
 * @Date: 2019-09-25 19:25:00
 * @LastEditTime: 2020-05-08 17:11:06
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ListRenderItem,
  // Image,
} from 'react-native';
import colors from '@/config/colors';
import size from '@/config/size';

const px = size.px;

export const RefreshState = {
  /**加载成功 */
  Idle: 0,
  /**开始下拉刷新 */
  HeaderRefreshing: 1,
  /**开始上拉翻页 */
  FooterRefreshing: 2,
  /**已加载全部数据 */
  NoMoreData: 3,
  /**加载失败 */
  Failure: 4,
  /**没有数据 */
  EmptyData: 5,
};

interface Props<T> {
  refreshState: number;
  onHeaderRefresh: (state: number) => void;
  onFooterRefresh?: (state: number) => void;
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  footerRefreshingText?: string;
  footerFailureText?: string;
  footerNoMoreDataText?: string;
  footerEmptyDataText?: string;
  /**是否显示垂直方向的滚动条 */
  showsVerticalScrollIndicator?: boolean;
  /**是否显示水平方向的滚动条 */
  showsHorizontalScrollIndicator?: boolean;
  renderItem: ListRenderItem<T>;
  ListHeaderComponent?: () => JSX.Element | React.ReactElement;
  setListRef?: (ref: unknown) => void;
}

class RefreshListView<T> extends PureComponent<Props<T>> {
  public static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂无数据',
  };

  private list: any;

  private onHeaderRefresh = () => {
    if (this.shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  };

  private onEndReached = () => {
    if (this.shouldStartFooterRefreshing()) {
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
    }
  };

  private shouldStartHeaderRefreshing = () => {
    if (
      this.props.refreshState === RefreshState.HeaderRefreshing ||
      this.props.refreshState === RefreshState.FooterRefreshing
    ) {
      return false;
    }

    return true;
  };

  private shouldStartFooterRefreshing = () => {
    const { refreshState, data } = this.props;
    if (data.length === 0) {
      return false;
    }

    return refreshState === RefreshState.Idle;
  };

  public scrollToTop = () => {
    const { data } = this.props;
    if (data.length >= 1) {
      this.list.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
    }
  };

  public render() {
    const { renderItem, ...rest } = this.props;

    return (
      <FlatList
        ref={instance => (this.list = instance)}
        keyExtractor={this.props.keyExtractor}
        onEndReached={this.onEndReached}
        onRefresh={this.onHeaderRefresh}
        refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        {...rest}
      />
    );
  }

  private renderFooter = () => {
    let footer: React.ComponentType | React.ReactElement | null = null;

    const { footerRefreshingText, footerFailureText, footerNoMoreDataText, footerEmptyDataText } = this.props;

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />;
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (this.props.data.length === 0) {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
              } else {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }
            }}
          >
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>{footerFailureText}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity
            onPress={() => {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
            }}
          >
            <View style={styles.emptyFooter}>
              {/* <Image source={require('../../img/listEmpty.png')} style={{ marginBottom: px(10) }} /> */}
              <Text style={styles.footerText}>{footerEmptyDataText}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[styles.footerText, { marginLeft: 7 }]}>{footerRefreshingText}</Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        footer = (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        );
        break;
      }
    }

    return footer;
  };
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(20),
  },
  footerText: {
    fontSize: px(14),
    color: colors.black,
  },
  emptyFooter: {
    flex: 1,
    height: px(300),
    justifyContent: 'center',
    alignItems: 'center',
    padding: px(10),
  },
});

export default RefreshListView;
