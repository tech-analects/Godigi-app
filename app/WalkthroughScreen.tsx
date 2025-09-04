import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const slides = [
  {
    key: "one",
    title: "Welcome",
    text: "Discover amazing features in our app!",
    // image: require("./assets/intro1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Stay Organized",
    text: "Track your plans, subscriptions & more easily.",
    // image: require("./assets/intro2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Get Started",
    text: "Sign up and enjoy our premium services.",
    // image: require("./assets/intro3.png"),
    backgroundColor: "#22bcb5",
  },
];

export default function WalkthroughScreen() {
  const [showRealApp, setShowRealApp] = useState(false);
    const { isLoggedIn, isChecking,isFirstLaunch } = useContext(UserContext);


    const router = useRouter();

  const onDone = async() => {
    router.push('/(auth)/login')
    await AsyncStorage.setItem("hasLaunched", "true");
    const keys = await AsyncStorage.getAllKeys();
      console.log("Remaining Keys After Logout:", keys);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      {/* <Image source={item.image} style={styles.image} /> */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return showRealApp ? (
    <View style={styles.center}>
      <Text style={{ fontSize: 20 }}> 🎉 Main App Screen </Text>
    </View>
  ) : (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={false}
      onSkip={onDone}
      activeDotStyle={{ backgroundColor: "#000" }}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
