import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Page } from './Components/Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const InterpolateWithScrollView = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      horizontal
      style={[styles.container]}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default InterpolateWithScrollView;
