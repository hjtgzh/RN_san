import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/rnSan';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from '@/screens/home';
import GoodsDetail from '@/screens/home/goodsDetail';
import Details from '@screens/details';
import Profile from '@screens/profile';
import Settings from '@screens/settings';
import News from '@screens/news';
import colors from '@/config/colors';

console.disableYellowBox = true;

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      {/* <HomeStack.Screen name="Profile" component={Profile} /> */}
    </HomeStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Details" component={Details} />
    </SettingsStack.Navigator>
  );
}

function HomeTabStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Home') {
            iconName = focused ? 'rightcircle' : 'rightcircleo';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'leftcircle' : 'leftcircleo';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeTab" component={HomeTabStackScreen} />
      <Stack.Screen name="News" component={News} />
      <HomeStack.Screen name="GoodsDetail" component={GoodsDetail} />
    </Stack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Profile" component={Profile} />
      <RootStack.Screen name="Settings" component={Settings} />
    </RootStack.Navigator>
  );
}

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
    <StyleProvider style={getTheme(material)}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeScreen">
          <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
          <Drawer.Screen name="RootDrawer" component={RootStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StyleProvider>
  </>
);

export default App;
