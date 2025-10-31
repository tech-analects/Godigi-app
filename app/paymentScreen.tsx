import ThemeBtn from "@/components/ThemeBtn";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentScreen() {
  const route = useRoute();
  const paymentUrl = route?.params?.paymentUrl;
  const courseId = route?.params?.courseId;

  const router = useRouter();

  const [showButton, setShowButton] = useState(false);

  const goBackWithResult = (isPurchased) => {
    router.replace({
      pathname: "/buyCourse", // 👈 your previous route
      params: { isPurchased, id: courseId },
    });
  };

  // 🚫 Block hardware back button (Android)
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
  //     return true; // prevent going back
  //   });
  //   return () => backHandler.remove();
  // }, []);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: paymentUrl }}
        style={styles.webview}
        startInLoadingState
        onNavigationStateChange={(navState) => {
          console.log("URL =>", navState.url);
          if (navState.url.includes("success")) {
            setShowButton(true);
          }
        }}
      />

      {showButton && (
        <View style={styles.buttonWrapper}>
          <ThemeBtn
            btnTitle={"Finish Payment"}
            onPress={() => goBackWithResult(true)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
