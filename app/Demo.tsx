import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const screenWidth = Dimensions.get('screen').width - 50
console.log(screenWidth)

export default function LeftToRightBorder() {
  const width = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value, // directly animating width
    };
  });

  let sc = Platform.OS == "ios" ? screenWidth - 30 : screenWidth - 50 

  useEffect(() => {
    width.value = withTiming(sc, {
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.borderView, animatedStyles]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start", // important: anchor line at left
    // paddingHorizontal:10,
  },
  borderView: {
    height: 4,
    backgroundColor: Colors.bg,
    width: 0, // start at 0
    marginLeft:-10,
    marginTop:-15,
    borderRadius:10,
    alignSelf: "flex-start", // makes sure it grows left → right
  },
});
