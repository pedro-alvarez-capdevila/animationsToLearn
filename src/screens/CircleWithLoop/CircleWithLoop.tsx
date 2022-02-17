/* eslint-disable react/no-array-index-key */
import React from 'react';
import { MotiAnimationProp, MotiTransitionProp, MotiView, View } from 'moti';
import { styles } from './styles';

const CircleWithLoop = () => {
  const from: MotiAnimationProp = {
    // scale: 1,
    // rotate: '0deg',
    // borderRadius: 20,
  };

  const animate: MotiAnimationProp = {
    scale: [2, 1, 1],
    rotate: ['0deg', '300deg', '0deg'],
    borderRadius: [20, 50, 0],
  };

  const transition: MotiTransitionProp = {
    delay: 1000,
    loop: true,
    type: 'timing',
    duration: 800,
    // repeatReverse: false,
  };

  const renderCircles = () => {
    return new Array(3).fill(1).map((value, index) => {
      return (
        <MotiView
          key={index}
          style={styles.square}
          from={from}
          animate={animate}
          transition={{
            ...transition,
            delay: 1000 + 100 * index,
          }}
        />
      );
    });
  };

  return <View style={styles.container}>{renderCircles()}</View>;
};

export default CircleWithLoop;
