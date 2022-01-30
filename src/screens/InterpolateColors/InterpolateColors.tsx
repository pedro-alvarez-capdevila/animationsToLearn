import React, { useState } from "react";
import { Dimensions, StyleSheet, Switch, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#EEE",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};

type Theme = "light" | "dark";

const { width } = Dimensions.get("window");
const SIZE_CIRCLE = width * 0.7;
const InterpolateColors = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const progress = useDerivedValue(() => {
    return theme === "dark"
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 });
  }, [theme]);

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color,
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor,
    };
  });

  const circleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <Animated.View>
        <Animated.Text style={[styles.text, textStyle]}>THEME</Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.circle, circleStyle]} >
        <Switch
          value={theme === "dark"}
          onValueChange={(toggled) => {
            setTheme(toggled ? "dark" : "light");
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 70,
    color: "rgba(256,256,256,0.76)",
    fontWeight: "600",
    letterSpacing: 13,
  },
  circle: {
    height: SIZE_CIRCLE,
    width: SIZE_CIRCLE,
    backgroundColor: "rgba(256,256,256, 0.03)",
    borderRadius: SIZE_CIRCLE / 2,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});

export default InterpolateColors;
