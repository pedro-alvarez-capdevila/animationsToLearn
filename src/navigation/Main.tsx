import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import InterpolateWithScrollView from '../screens/InterpolateWithScrollView';
import InterpolateColors from '../screens/InterpolateColors';
import TheBasicsOfPanGestureHandler from '../screens/TheBasicsOfPanGestureHandler';
import SwipeToDelete from '../screens/SwipeToDelete';
import CircleWithLoop from '../screens/CircleWithLoop';
import CustomSwitch from '../screens/CustomSwitch';
import SlidingCounter from '../screens/SlidingCounter';

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
  InterpolateColors: undefined;
  InterpolateWithScrollView: undefined;
  TheBasicsOfPanGestureHandler: undefined;
  SwipeToDelete: undefined;
  CircleWithLoop: undefined;
  CustomSwitch: undefined;
  SlidingCounter: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="List" component={List} />
    <MainStack.Screen
      name="InterpolateColors"
      component={InterpolateColors}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="InterpolateWithScrollView"
      component={InterpolateWithScrollView}
    />
    <MainStack.Screen
      name="TheBasicsOfPanGestureHandler"
      component={TheBasicsOfPanGestureHandler}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="SwipeToDelete"
      component={SwipeToDelete}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="CircleWithLoop"
      component={CircleWithLoop}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="CustomSwitch"
      component={CustomSwitch}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="SlidingCounter"
      component={SlidingCounter}
      options={{ headerShown: false }}
    />
  </MainStack.Navigator>
);
