import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { RadioButton } from "react-native-paper"; // Importing the RadioButton from react-native-paper

function IntroForm() {
  const navigation = useNavigation();

  // State for gender selection
  const [gender, setGender] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const [file, setFile] = useState();

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // You can specify types like application/pdf, image/*, etc.
      });

      if (result.type === "success") {
        setFile(result);
      } else {
        console.log("File selection was canceled");
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={goBack} />
        <Text style={styles.pageName}>Introduction</Text>
      </View>
      <ScrollView style={styles.form}>
        <TouchableOpacity onPress={pickFile} style={styles.upView}>
          <View style={styles.upIcon}>
            <FontAwesome6 name="user-tie" size={30} color="#0069cb" />
          </View>
          <View style={styles.editBtn}>
            <EvilIcons name="pencil" size={18} color="#fff" />
            <Text style={styles.editText}>Edit</Text>
          </View>
          <Text style={styles.upText}>Upload Profile Photo</Text>
        </TouchableOpacity>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Full Name</Text>
          <TextInput
            placeholder=" Enter your name"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Job Profile</Text>
          <TextInput
            placeholder=" Enter Job Profile"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>

        {/* Gender Radio Buttons using react-native-paper */}
        <View style={styles.genderField}>
          <Text style={Colors.inputlable}>Gender</Text>
          <View style={styles.genderOptions}>
            <View style={styles.radioOption}>
              <RadioButton
                value="male"
                status={gender === "male" ? "checked" : "unchecked"}
                onPress={() => setGender("male")}
                color="#0069cb"
                uncheckedColor="#0069cb"
              />
              <Text style={Colors.inputlable} onPress={() => setGender("male")}>
                Male
              </Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="female"
                status={gender === "female" ? "checked" : "unchecked"}
                onPress={() => setGender("female")}
                color="#0069cb"
                uncheckedColor="#0069cb"
              />
              <Text
                style={Colors.inputlable}
                onPress={() => setGender("female")}
              >
                Female
              </Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton
                value="other"
                status={gender === "other" ? "checked" : "unchecked"}
                onPress={() => setGender("other")}
                color="#0069cb"
                uncheckedColor="#0069cb"
              />
              <Text
                style={Colors.inputlable}
                onPress={() => setGender("other")}
              >
                Other
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.nextButton}>
        <ThemeBtn btnTitle={"Update"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  nextButton: {
    position: "absolute",
    bottom: 40, // Position at the bottom of the screen
    left: 20,
    right: 20,
    padding: 20,
  },
  field: {
    marginBottom: 10,
  },
  form: {
    marginBottom: 50,
    padding: 20,
  },
  upIcon: {
    backgroundColor: "rgba(151, 199, 255, 0.32)",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
  },
  upText: {
    color: "#95969D",
    fontWeight: 500,
    marginTop: 10,
  },
  editBtn: {
    flexDirection: "row",
    gap: 0,
    backgroundColor: "#0069cb",
    paddingHorizontal: 4,
    borderRadius: 5,
    paddingVertical: 1,
    position: "absolute",
    bottom: 40,
  },
  editText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 400,
  },
  upView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDF1F3",
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topPart: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 20,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.85,
    shadowRadius: 5,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    paddingTop: Platform.OS == "android" ? 50 : 60,
  },
  genderField: {
    marginBottom: 20,
  },
  genderOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#EDF1F3",
    borderRadius: 5,
  },
});

export default IntroForm;
