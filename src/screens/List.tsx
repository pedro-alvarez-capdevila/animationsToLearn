import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/List';
import { MainStackParams } from '../navigation/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

const screens = [
  {
    title: 'InterpolateColors',
    subtitle: 'InterpolateColors',
    target: 'InterpolateColors',
  },
  {
    title: 'InterpolateWithScrollView',
    subtitle: 'InterpolateWithScrollView',
    target: 'InterpolateWithScrollView',
  },
  {
    title: 'TheBasicsOfPanGestureHandler',
    subtitle: 'TheBasicsOfPanGestureHandler',
    target: 'TheBasicsOfPanGestureHandler',
  },
  {
    title: 'SwipeToDelete',
    subtitle: 'SwipeToDelete',
    target: 'SwipeToDelete',
  },
  {
    title: 'CircleWithLoop',
    subtitle: 'CircleWithLoop',
    target: 'CircleWithLoop',
  },
  {
    title: 'CustomSwitch',
    subtitle: 'CustomSwitch',
    target: 'CustomSwitch',
  },
  {
    title: 'SlidingCounter',
    subtitle: 'SlidingCounter',
    target: 'SlidingCounter',
  },
  {
    title: 'CustomBottomSheet',
    subtitle: 'CustomBottomSheet',
    target: 'CustomBottomSheet',
  },
  {
    title: 'PerspectiveMenu',
    subtitle: 'PerspectiveMenu',
    target: 'PerspectiveMenu',
  },
  {
    title: 'ColorPicker',
    subtitle: 'ColorPicker',
    target: 'ColorPicker',
  },
];

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'List'>;
};

export const List = ({ navigation }: Props) => {
  return (
    <FlatList
      style={styles.container}
      data={screens}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          // @ts-ignore
          // Disabling the next line because all the item.targets are valid - that data just
          // isn't getting picked up by TypeScript
          onPress={() => navigation.push(item.target)}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};
