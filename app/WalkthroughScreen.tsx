import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ImagesPath } from "@/constants/ImagesPath";

const slides = [
  {
    key: "one",
    title: "Learn Anytime, Anywhere",
    text: "Join live or recorded online classes, or attend offline sessions - designed to help you build a successful career in IT, no matter where you are.",
    image: ImagesPath.walk1,
    backgroundColor: "#fff",
  },
  {
    key: "two",
    title: "Launch Your Career",
    text: "Explore handpicked job opportunities, internships, and expertly crafted interview preparation tools - all designed to help you land your dream role in the tech industry.",
    image: ImagesPath.walk2,
    backgroundColor: "#fff",
  },
  {
    key: "three",
    title: "Study Smart, Succeed Faster",
    text: "Access high-quality digital notes, study materials, and real-world interview questions to learn faster and perform better in exams and job interviews.",
   image: ImagesPath.walk3,
    backgroundColor: "#fff",
  },
  {
    key: "four",
    title: "Your Personalized Learning Hub",
    text: "Get content tailored to your career goals - classes, jobs, notes, and more - all in one smart, easy-to-use platform built just for learners like you.",
  image: ImagesPath.walk4,
    backgroundColor: "#fff",
  },
];

export default function WalkthroughScreen() {
  const [showRealApp, setShowRealApp] = useState(false);
    const { isLoggedIn, isChecking,isFirstLaunch,setIsFirstLaunch } = useContext(UserContext);


    const router = useRouter();

  const onDone = async() => {
    await AsyncStorage.setItem("hasLaunched", "true");
    const keys = await AsyncStorage.getAllKeys();
    console.log("Remaining Keys After Logout:", keys);
    setIsFirstLaunch(false)
    router.replace('/(auth)/login')
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={ImagesPath.compLogo} style={{width:200,objectFit:"contain"}}/>
      <View style={styles.textCont}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.nextText}>Next</Text>
      </View>
    );
  };
  const renderDontButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.nextText}>Done</Text>
      </View>
    );
  };


  return showRealApp ? (
    <View style={styles.center}>
      <Text style={{ fontSize: 20 }}> 🎉 Main App Screen </Text>
    </View>
  ) : (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onDone}
      activeDotStyle={{ backgroundColor: "#000" }}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDontButton}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 20,
  },
  buttonCircle: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    // Optional styling:
    backgroundColor: "transparent",
  },

  nextText: {
    color: "#000", // 👈 This makes the text yellow
    fontSize: 16,
    fontWeight: "bold",
  },

  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  textCont: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  text: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    paddingHorizontal:20
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
