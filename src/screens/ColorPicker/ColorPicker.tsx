import { Dimensions, View } from 'react-native';
import React, { useCallback } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';
import ColorPickerComponent from './ColorPickerComponent/ColorPickerComponent';
import { COLORS } from './colors';

const { width } = Dimensions.get('window');
const PICKER_WIDTH = width * 0.9;

const ColorPicker = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);

  const onColorChange = useCallback(
    (color: string | number) => {
      pickedColor.value = withTiming(color, { duration: 50 });
    },
    [pickedColor],
  );

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPickerComponent
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          pickerWidth={PICKER_WIDTH}
          onColorChange={onColorChange}
        />
      </View>
    </>
  );
};

export default ColorPicker;
