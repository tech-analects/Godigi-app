import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useNavigation } from "expo-router";

export default function TaskDetails() {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type: "*/*",
    // });
    // if (result.assets && result.assets.length > 0) {
    //   setSelectedFile(result.assets[0]);
    // }
    console.log("file selected")
  };

    const navigation = useNavigation();
      const goBack=()=>{
        navigation.goBack();
      }
  return (
    <View style={styles.container}>

      <View style={styles.topPart}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Create a Responsive Design</Text>
        </View>
      </View>
      <ScrollView style={{ marginHorizontal: 20,paddingBottom:50,paddingTop:20 }}>
        {/* Task Dates */}
        <View style={styles.dateRow}>
          <View style={styles.dateItem}>
            <MaterialIcons name="event" size={20} color="#888" />
            <Text style={styles.dateText}>Date Issued: 09 Aug 2025</Text>
          </View>
          <View style={styles.dateItem}>
            <Feather name="calendar" size={20} color="#888" />
            <Text style={styles.dateText}>Last Valid Date: 20 Aug 2025</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Task Description</Text>
        <Text style={styles.description}>
          You are required to create a fully responsive design for both mobile
          and web. The design should include relevant icons, smooth animations,
          and a clean UI. Ensure that it adapts to different screen sizes
          seamlessly.
        </Text>


        <Text style={styles.sectionTitle}>Tutorial Video</Text>
        <View style={{ height: 200, borderRadius: 10, overflow: "hidden" }}>
          <WebView
            source={{ uri: "https://www.youtube.com/embed/dD2EISBDjWM" }}
            style={{ flex: 1 }}
            startInLoadingState
          />
        </View>

        {/* <Text style={styles.sectionTitle}>Submit Your Task</Text>
        <TextInput
          placeholder="Add any notes about your submission..."
          style={styles.input}
          multiline
        />
        <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
          <Feather name="upload" size={20} color="#fff" />
          <Text style={styles.uploadText}>
            {selectedFile ? selectedFile.name : "Upload File"}
          </Text>
        </TouchableOpacity> */}

        {/* {selectedFile && (
          <Text style={styles.fileName}>Selected: {selectedFile.name}</Text>
        )} */}

        {/* <TouchableOpacity style={styles.submitButton}>
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.submitText}>Submit Task</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  topPart: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 2,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    paddingTop: Platform.OS === "android" ? 50 : 50,
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  dateRow: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  dateItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  dateText: { fontSize: 14, color: "black", fontWeight: 600 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    marginTop: 20,
  },
  description: { fontSize: 14, color: "#444", lineHeight: 20 },
  example: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 5,
  },
  exampleText: { fontSize: 14 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  uploadText: { color: "#fff", fontWeight: "bold" },
  fileName: { fontSize: 12, color: "#666", marginTop: 5 },
  submitButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "bold" },
});
