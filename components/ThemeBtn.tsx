import { StyleSheet, View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

interface ThemeBtnComponentProps {
  btnTitle: any;
  onPress: any; // Optional prop
}

const ThemeBtn: React.FC<ThemeBtnComponentProps> = ({ btnTitle, onPress,loadingBtn }) => {
  return (
    <GestureHandlerRootView>
      <LinearGradient
        // colors={["#0036FD", "#064FFD", "#0D6CFD", "#0D6CFD"]}
        colors={["#004B88","#004B88"]}
        // colors={[Colors.bg, "#064FFD", "#0D6CFD", "#0D6CFD"]}
        // colors={["#FD7507", "#FD7507", "#FD7507", "#FD7507"]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }} // Start from top-left corner
        end={{ x: 1, y: 1 }}
        style={styles.themeBtn}
      >
        <Pressable style={styles.touchable} onPress={onPress}>
          {loadingBtn ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.themeBtnTxt}>{btnTitle}</Text>
          )}
        </Pressable>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  themeBtn: {
    backgroundColor: "#001D34",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  touchable: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  themeBtnTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ThemeBtn;
