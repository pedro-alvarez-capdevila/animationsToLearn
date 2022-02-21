import { Dimensions, SafeAreaView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { styles } from './styles';

type ContextType = {
  translateX: number;
};

const { width } = Dimensions.get('screen');

const MAX_TRANSLATE_X = width / 2;

const PerspectiveMenu = () => {
  const translateX = useSharedValue(0);
  const [isActive, setIsActive] = useState(false);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
    },
    onActive: (event, context) => {
      // translateX.value = event.translationX + context.translateX;
      translateX.value = Math.max(event.translationX + context.translateX, 0);
    },
    onEnd: () => {
      if (translateX.value < MAX_TRANSLATE_X / 2) {
        translateX.value = withTiming(0);
        runOnJS(setIsActive)(false);
      } else {
        translateX.value = withTiming(MAX_TRANSLATE_X);
        runOnJS(setIsActive)(true);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 5],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X],
      [0, 25],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        { translateX: translateX.value },
        { perspective: 75 },
        { rotateY: `-${rotate}deg` },
      ],
      borderRadius,
    };
  });

  const onPress = useCallback(() => {
    setIsActive(!isActive);
    if (isActive) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(MAX_TRANSLATE_X);
    }
  }, [isActive, translateX]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.screen, animatedStyle]}>
          <Feather
            name="menu"
            size={32}
            color="black"
            style={styles.menuIcon}
            onPress={onPress}
          />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default PerspectiveMenu;
