import { StyleSheet } from 'react-native';
import { size, colors } from '@/config';
const { px } = size;

export const styles = StyleSheet.create({
  textColor: {
    color: colors.black,
  },
  header: {
    position: 'relative',
  },
  wrapper: {
    height: px(325),
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: px(16),
  },
  banner: {
    height: '100%',
    width: px(375),
  },
  price: {
    color: colors.primary,
    fontSize: px(20),
    fontWeight: '600',
    marginVertical: px(10),
  },
  title: {
    fontSize: px(18),
    fontWeight: '600',
    lineHeight: px(24),
    color: colors.black,
  },
  deal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  smallText: {
    fontSize: px(12),
    color: colors.black,
  },
  address: {
    height: px(36),
    paddingHorizontal: px(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  freight: {
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  },
  logistics: {
    height: px(32),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ensure: {
    flexDirection: 'row',
    paddingVertical: px(10),
    paddingHorizontal: px(16),
    backgroundColor: 'rgba(254, 152, 112, 0.2)',
  },
  ensureText: {
    width: '20%',
    color: colors.black,
  },
  ensureContent: {
    width: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ensureItem: {
    flexDirection: 'row',
    width: '50%',
    height: px(20),
  },
  dot: {
    lineHeight: px(28),
    color: colors.primary,
    marginRight: 8,
    fontSize: px(30),
  },
  ensureTitle: {
    fontSize: px(14),
    color: colors.black,
  },
  specification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: px(16),
  },
  specifiTitle: {
    width: px(65),
    lineHeight: px(20),
    marginRight: px(10),
  },
  specifiItemWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  specifiItem: {
    padding: 8,
    backgroundColor: colors.bgColor,
    width: px(90),
    height: px(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  specifiItemText: {
    lineHeight: px(20),
  },
  addressInfo: {
    height: px(60),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  addressText: {
    fontWeight: '600',
    marginBottom: 5,
    color: colors.black,
  },
  shop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coreTitle: {
    color: colors.white,
    paddingHorizontal: 8,
    backgroundColor: colors.golden,
    borderRadius: px(10),
    marginRight: 5,
  },
  gradeBt: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: px(16),
    fontSize: px(14),
  },
  detailTitle: {
    lineHeight: px(44),
    fontSize: px(16),
    fontWeight: '600',
    color: colors.black,
  },
  desc: {
    marginBottom: px(20),
    lineHeight: px(22),
    color: colors.black,
  },
  picDetail: {
    width: '100%',
    height: px(450),
    marginBottom: px(10),
  },
  handleBt: {
    height: px(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btStyle: {
    width: px(90),
    height: '100%',
    borderRightColor: colors.borderColor,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: colors.bgGray,
    borderTopWidth: 1,
  },
  btText: {
    fontSize: px(10),
    marginTop: 3,
  },
  order: {
    height: '100%',
    lineHeight: px(48),
    borderColor: colors.primary,
    borderWidth: 1,
    color: colors.primary,
    flex: 1,
    textAlign: 'center',
    fontSize: px(16),
  },
  buy: {
    height: '100%',
    lineHeight: px(48),
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    fontSize: px(16),
  },
});
