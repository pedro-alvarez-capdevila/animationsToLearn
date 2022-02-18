import { View } from 'react-native';
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
} from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT, styles } from './styles';

type BottomSheetProps = {
  children: ReactNode;
};
export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = forwardRef<BottomSheetProps, BottomSheetRefProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const context = useSharedValue({ y: 0 });

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    const scrollTo = useCallback((destination: number) => {
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          runOnJS(scrollTo)(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          runOnJS(scrollTo)(MAX_TRANSLATE_Y);
        }
      });

    const rStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{ translateY: translateY.value }],
        borderRadius,
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default BottomSheet;
