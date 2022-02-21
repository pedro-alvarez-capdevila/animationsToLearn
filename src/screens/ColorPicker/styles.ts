import { StyleSheet } from 'react-native';

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
export const CIRCLE_PICKER_WIDTH = 50;
export const INTERNAL_CIRCLE_PICKER_WIDTH = CIRCLE_PICKER_WIDTH / 2;

export const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'red',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: CIRCLE_PICKER_WIDTH,
    borderRadius: CIRCLE_PICKER_WIDTH / 2,
  },
  circlePicker: {
    width: CIRCLE_PICKER_WIDTH,
    height: CIRCLE_PICKER_WIDTH,
    borderRadius: CIRCLE_PICKER_WIDTH / 2,
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalCirclePicker: {
    width: INTERNAL_CIRCLE_PICKER_WIDTH,
    height: INTERNAL_CIRCLE_PICKER_WIDTH,
    borderRadius: INTERNAL_CIRCLE_PICKER_WIDTH / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});
