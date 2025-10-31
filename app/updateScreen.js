import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import React from "react";
import { View, Text, TouchableOpacity, Linking, Platform, StyleSheet, Image } from "react-native";

export default function UpdateRequiredScreen() {
  const handleUpdate = () => {
    const url =
      Platform.OS === "ios"
        ? "https://apps.apple.com/in/app/godigi-infotech/id6752398532"
        : "https://play.google.com/store/apps/details?id=com.app.godigi_infotech&hl=en";
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
         <Image
                      source={ImagesPath.logoApp}
                      style={{ width: 300, objectFit: "contain", marginVertical: 20 }}
                    />
      <Text style={styles.title}>Update your application to the latest version.</Text>
      <Text style={styles.subtitle}>
        A brand new version of the GoDigi InfoTech is available in the {Platform.OS == "android" ? "Play Store" : "App Store"}. Please update your app to use the amazing features.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", color: "#333", marginBottom: 10 },
  subtitle: { fontSize: 14,fontWeight:400, color: "#666", textAlign: "left", marginBottom: 20 },
  button: { backgroundColor: Colors.bg, paddingVertical: 12,width:'100%', paddingHorizontal: 30, borderRadius: 8,position:'absolute',bottom:100 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600",textAlign:'center' },
});
