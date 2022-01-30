import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import InterpolateWithScrollView from '../screens/InterpolateWithScrollView';
import InterpolateColors from '../screens/InterpolateColors';
import TheBasicsOfPanGestureHandler from '../screens/TheBasicsOfPanGestureHandler';

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
  InterpolateColors: undefined;
  InterpolateWithScrollView: undefined;
  TheBasicsOfPanGestureHandler: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="List" component={List} />
    <MainStack.Screen
      name="TextDemo"
      component={TextDemo}
      options={{ headerTitle: 'Text Demo' }}
    />
    <MainStack.Screen
      name="FormDemo"
      component={FormDemo}
      options={{ headerTitle: 'Button Demo' }}
    />
    <MainStack.Screen
      name="ButtonDemo"
      component={ButtonDemo}
      options={{ headerTitle: 'Button Demo' }}
    />
    <MainStack.Screen
      name="InterpolateColors"
      component={InterpolateColors}
      options={{ headerTitle: 'Button Demo', headerShown: false }}
    />
    <MainStack.Screen
      name="InterpolateWithScrollView"
      component={InterpolateWithScrollView}
      options={{ headerTitle: 'Button Demo', headerShown: false }}
    />
    <MainStack.Screen
      name="TheBasicsOfPanGestureHandler"
      component={TheBasicsOfPanGestureHandler}
      options={{ headerTitle: 'Button Demo', headerShown: false }}
    />
  </MainStack.Navigator>
);
