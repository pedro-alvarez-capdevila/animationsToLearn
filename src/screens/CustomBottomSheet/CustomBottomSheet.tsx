import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from './styles';
import BottomSheet, { BottomSheetRefProps } from './BottomSheet/BottomSheet';

const CustomBottomSheet = () => {
  const ref = useRef<BottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheet ref={ref}>
          <View style={styles.children} />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomBottomSheet;
