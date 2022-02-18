import { Text, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { styles } from './styles';

const size = 200;

type ContextType = {
  translateX: number;
  translateY: number;
};

const SlidingCounter = () => {
  const cStyles = styles({ size });
  const [count, setCount] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const xTextOpacity = useSharedValue(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
      xTextOpacity.value = 0;
    },
    onActive: (event, context) => {
      if (Math.abs(translateX.value) < (size * 1.5) / 3) {
        translateX.value = event.translationX + context.translateX;
      }
      if (Math.abs(translateY.value) < size * 0.6) {
        translateY.value = event.translationY + context.translateY;
      }
      if (Math.abs(translateY.value) > size * 0.5) {
        xTextOpacity.value = withSpring(1);
      }
      if (Math.abs(translateY.value) <= size * 0.5) {
        xTextOpacity.value = withSpring(0);
      }
    },
    onEnd: () => {
      'worklet';

      console.log('translateY', translateY.value);
      console.log('size', size * 0.5);

      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      if (Math.abs(translateX.value) > (size * 1.5) / 4) {
        if (translateX.value > 0) {
          runOnJS(increase)();
        } else {
          runOnJS(decrease)();
        }
      }

      if (Math.abs(translateY.value) > size * 0.5) {
        runOnJS(resetCount)();
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const xTextStyle = useAnimatedStyle(() => {
    return {
      opacity: xTextOpacity.value,
    };
  });

  return (
    <SafeAreaView style={cStyles.container}>
      <View style={cStyles.slidingCounter}>
        <View style={cStyles.textContainer}>
          <Text style={cStyles.text}>-</Text>
        </View>
        <Animated.View style={[cStyles.textContainer, xTextStyle]}>
          <Text style={cStyles.text}>x</Text>
        </Animated.View>
        <View style={cStyles.textContainer}>
          <Text style={cStyles.text}>+</Text>
        </View>

        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[rStyle, cStyles.textContainer, cStyles.slider]}
          >
            <Text style={cStyles.text}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
};

export default SlidingCounter;
