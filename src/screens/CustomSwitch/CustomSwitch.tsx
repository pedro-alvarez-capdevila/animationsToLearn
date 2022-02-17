import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Switch from './Switch/Switch';
import { styles } from './styles';

const CustomSwitch = () => {
  const [isActive, setIsActive] = useState(false);
  const onPress = () => {
    setIsActive(!isActive);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Switch size={90} onPress={onPress} isActive={isActive} />
    </SafeAreaView>
  );
};

export default CustomSwitch;
