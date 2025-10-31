import React from "react";
import { ImagesPath } from "@/constants/ImagesPath";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { UserContext } from "./UserContext";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";


export default function Splash() {


  return <ImageIcon />;
}

export function ImageIcon() {
  const width = useSharedValue(100);
  const height = useSharedValue(100);
  const rotate = useSharedValue(0);

  // Animated style for rotation and scaling
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      // transform: [
      //   { rotate: `${rotate.value}deg` }, // Correcting rotation
      // ],
    };
  });

  const navigation = useNavigation();
  const router = useRouter();

  // const getIfFirstLaunchedScreen = async () => {
  //   const firstLaunch = await AsyncStorage.getItem("hasLaunched");
  //   console.log("this is from the fuctiobn here", firstLaunch);
  // };

  useEffect(() => {
    // Animate width and height (scaling up)
    width.value = withTiming(300, {
      duration: 1500,
      easing: Easing.ease,
    });

    height.value = withTiming(150, {
      duration: 1500,
      easing: Easing.ease,
    });

    // Animate rotation (360 degrees)
    rotate.value = withTiming(360, {
      duration: 2000,
      easing: Easing.linear,
    });

    // let isFirstLaunch = true;

    // getIfFirstLaunchedScreen();

    // let isLoggedIn = true;

    // setTimeout(() => {
    //   // setLoaded(true);
    //     if (!isLoggedIn) {
    //       router.push("/(auth)/login");
    //     } else {
    //       // console.log("no");
    //       router.push("/(main)/");
    //     }
    // }, 1000);
  }, []);

  return (
    // <View
    // style={{
    //   flex: 1,
    //   backgroundColor: "blue",
    //   justifyContent: "center",
    //   alignItems: "center",
    // }}
    // >
    // </View>

    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Image
        source={ImagesPath.logoWhite}
        style={[styles.image,animatedStyles]} // Apply both image and animated styles
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300, // Initial width of the image
    height: 150, // Initial height of the image
    objectFit:'contain',
  },
});
