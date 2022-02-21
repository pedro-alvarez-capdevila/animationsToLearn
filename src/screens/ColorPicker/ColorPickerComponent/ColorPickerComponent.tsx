import React from 'react';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { CIRCLE_PICKER_WIDTH, styles } from '../styles';

interface IColorPickerComponent extends LinearGradientProps {
  pickerWidth: number;
  onColorChange: (color: string | number) => void;
}

type contextType = {
  translateX: number;
  translateY: number;
};

const ColorPickerComponent = ({
  colors,
  start,
  end,
  pickerWidth,
  onColorChange,
}: IColorPickerComponent) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      pickerWidth - CIRCLE_PICKER_WIDTH,
    );
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextType
  >({
    onStart: (event, context) => {
      context.translateX = adjustedTranslateX.value;
      translateY.value = withTiming(-CIRCLE_PICKER_WIDTH * 1.2);
      scale.value = withTiming(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
    },
    onEnd: () => {
      scale.value = withTiming(1);
      translateY.value = withTiming(0);
    },
  });

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: event => {
        translateY.value = withTiming(-CIRCLE_PICKER_WIDTH * 1.2);
        scale.value = withTiming(1.2);
        translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_WIDTH);
      },
      onEnd: () => {
        scale.value = withTiming(1);
        translateY.value = withTiming(0);
      },
    });

  const circlePickerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const internalCirclePickerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [
        (0 / 9) * pickerWidth,
        (1 / 9) * pickerWidth,
        (2 / 9) * pickerWidth,
        (3 / 9) * pickerWidth,
        (4 / 9) * pickerWidth,
        (5 / 9) * pickerWidth,
        (6 / 9) * pickerWidth,
        (7 / 9) * pickerWidth,
        (8 / 9) * pickerWidth,
      ],
      colors,
      'RGB',
    );

    runOnJS(onColorChange)(backgroundColor);
    return {
      backgroundColor,
    };
  });

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <LinearGradient
          colors={colors}
          start={start}
          end={end}
          style={[styles.linearGradient, { width: pickerWidth }]}
        />
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.circlePicker, circlePickerStyle]}>
            <Animated.View
              style={[styles.internalCirclePicker, internalCirclePickerStyle]}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ColorPickerComponent;
