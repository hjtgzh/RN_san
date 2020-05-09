import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './iconfont.json';

const Iconfont = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default Iconfont;

export const Button = Iconfont.Button;
export const TabBarItem = Iconfont.TabBarItem;
export const TabBarItemIOS = Iconfont.TabBarItemIOS;
export const ToolbarAndroid = Iconfont.ToolbarAndroid;
export const getImageSource = Iconfont.getImageSource;
