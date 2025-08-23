import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper"; // Importing the RadioButton from react-native-paper

function BasicDetailsForm() {
  const navigation = useNavigation();

  // State for gender selection
  const [gender, setGender] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={goBack} />
        <Text style={styles.pageName}>Basic Details</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Email ID</Text>
          <TextInput
            placeholder=" Enter your Email ID"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Mobile Number</Text>
          <TextInput
            placeholder=" Enter Mobile Number"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Address</Text>
          <TextInput
            placeholder=" City, State, Country"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.twoPart}>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Date of Birth</Text>
            <TextInput
              placeholder="DOB"
              autoComplete="off"
              style={[Colors.inputbox, { width: 150 }]}
            />
          </View>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Pin Code</Text>
            <TextInput
              placeholder="Pin code"
              autoComplete="off"
              style={[Colors.inputbox, { width: 150 }]}
            />
          </View>
        </View>
        <Text style={Colors.inputlable}>Experience</Text>
        <View style={styles.twoPart}>
          <View style={styles.field}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="2"
                autoComplete="off"
                style={[Colors.inputbox, { width: 150 }]}
              />
              <Text style={styles.sidetext}>Years</Text>
            </View>
          </View>
          <View style={styles.field}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="3"
                autoComplete="off"
                style={[Colors.inputbox, { width: 150 }]}
              />
              <Text style={styles.sidetext}>Months</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.nextButton}>
        <ThemeBtn btnTitle={"Update"} onPress={goBack} />
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
    bottom: 0, // Position at the bottom of the screen
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
  twoPart: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  upIcon: {
    backgroundColor: "rgba(151, 199, 255, 0.32)",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
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
    paddingBottom: 20,
    paddingTop: Platform.OS == "android" ? 40 : 60,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.85,
    shadowRadius: 5,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  inpView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sidetext: {
    position: "absolute",
    right: 10,
    color: "grey",
  },
});

export default BasicDetailsForm;
