import { Pressable, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { MotiTransitionProp, MotiView } from 'moti';
import { observer } from 'mobx-react-lite';
import { Easing } from 'react-native-reanimated';
import { ISwitch } from './types';
import { styles } from './styles';

const _colors = {
  active: '#010101',
  inactive: '#DCDCDC',
};

const transition: MotiTransitionProp = {
  type: 'timing',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const Switch = ({ size = 60, onPress, isActive }: ISwitch) => {
  const trackWidth = useMemo(() => {
    // the trackWidth is going to change only when the trackWidth change
    return size * 1.5;
  }, [size]);

  const trackHeight = useMemo(() => {
    return size * 0.4;
  }, [size]);

  const knobSize = useMemo(() => {
    return size * 0.7;
  }, [size]);

  const knobIndicatorSize = useMemo(() => {
    return size * 0.45;
  }, [size]);

  return (
    <Pressable onPress={onPress} style={{ width: trackWidth }}>
      <View style={styles.container}>
        {/* track */}
        <MotiView
          transition={transition}
          animate={{
            backgroundColor: isActive ? _colors.active : _colors.inactive,
          }}
          style={{
            position: 'absolute',
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
          }}
        />
        {/* knob container */}
        <MotiView
          transition={transition}
          animate={{
            translateX: isActive ? trackWidth / 3.3 : -trackWidth / 3.3,
          }}
          style={{
            height: knobSize,
            width: knobSize,
            backgroundColor: 'white',
            borderRadius: knobSize / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* knob indicator */}
          <MotiView
            transition={transition}
            animate={{
              borderRadius: isActive ? 0 : knobIndicatorSize / 2,
              borderColor: isActive ? _colors.active : _colors.inactive,
              width: isActive ? knobIndicatorSize * 0.1 : knobIndicatorSize,
            }}
            style={{
              height: knobIndicatorSize,
              width: knobIndicatorSize,
              borderWidth: size * 0.04,
              borderRadius: knobIndicatorSize / 2,
              borderColor: _colors.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

export default observer(Switch);
