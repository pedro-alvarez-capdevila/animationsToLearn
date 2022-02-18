import { StyleSheet } from 'react-native';

export const styles = (props: { size: number }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slidingCounter: {
      flexDirection: 'row',
      borderRadius: props.size / 2,
      width: props.size * 1.5,
      height: props.size * 0.6,
      backgroundColor: '#111111',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: props.size * 0.3,
      color: 'white',
    },
    textContainer: {
      width: (props.size * 1.5) / 3,
      height: props.size * 0.6,
      borderRadius: (props.size * 0.6) / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slider: {
      width: (props.size * 1.4) / 3,
      height: props.size * 0.44,
      borderRadius: (props.size * 0.44) / 2,
      position: 'absolute',
      backgroundColor: '#232323',
    },
  });
