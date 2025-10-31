import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Platform,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import ThemeBtn from "@/components/ThemeBtn";
// import * as DocumentPicker from "expo-document-picker";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { useNavigation } from "@react-navigation/native";

function WorkExpForm() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [selectedExp, setSelectedExp] = useState("");

  const [file, setFile] = useState();

  const pickFile = async () => {
    // try {
    //   const result = await DocumentPicker.getDocumentAsync({
    //     type: "*/*", // You can specify types like application/pdf, image/*, etc.
    //   });

    //   if (result.type === "success") {
    //     setFile(result);
    //   } else {
    //     console.log("File selection was canceled");
    //   }
    // } catch (error) {
    //   console.error("Error picking document: ", error);
    // }
    console.log("hello")
  };

  const navigation = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    console.log("hello");
    setIsModalOpen(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const successModal = (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 40,
            borderRadius: 30,
            width: "90%",
            height: "70%",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={ImagesPath.resetModalImg}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
            }}
          >
            Congratulations !!
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 30,
              color: "#6C7278",
            }}
          >
            Your profile setup has been completed successfully
          </Text>
          <ThemeBtn btnTitle={"Continue"} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.bg}>
      <ScrollView style={styles.bgMain}>
        <View style={styles.topPart}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.heading}>Work Experience</Text>
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Job Title</Text>
          <TextInput
            placeholder="UI/UX designer"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Company</Text>
          <TextInput
            placeholder="Company name"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>

        <View style={styles.fromPart}>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>From</Text>
            <TextInput
              placeholder="From"
              autoComplete="off"
              style={[Colors.inputbox, { width: 150 }]}
            />
          </View>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>To</Text>
            <TextInput
              placeholder="To"
              autoComplete="off"
              style={[Colors.inputbox, { width: 150 }]}
            />
          </View>
        </View>

        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Enter a description only"
          placeholderTextColor="grey"
        />

        <View style={styles.field}>
          <Text style={Colors.inputlable}>Location</Text>
          <TextInput
            placeholder="Location"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Employment type</Text>
          <TextInput
            placeholder="Employment type"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Job Level</Text>
          <TextInput
            placeholder="Associate"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>
        <View style={styles.field}>
          <Text style={Colors.inputlable}>Job Function</Text>
          <TextInput
            placeholder="IT and Software"
            autoComplete="off"
            style={Colors.inputbox}
          />
        </View>

        <View style={styles.field}>
          <Text style={Colors.inputlable}>Annual Salary</Text>
          <View style={styles.inpView}>
            <TextInput
              placeholder="96,000"
              autoComplete="off"
              style={Colors.inputbox}
            />
            <Text style={styles.sidetext}>Per Year</Text>
          </View>
        </View>

        <Text style={Colors.inputlable}>Add media (optional)</Text>
        <TouchableOpacity onPress={pickFile} style={styles.upView}>
          <MaterialIcons name="upload-file" size={24} color="#0069CB" />
          <Text style={styles.upText}>Upload files</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Positioned Button at the Bottom */}
      <View style={styles.buttonContainer}>
        <ThemeBtn btnTitle={"Update"} onPress={goBack} />
      </View>
      {/* {successModal} */}
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#FAFAFD",
  },
  bgMain: {
    padding: 20,
    marginBottom: 80, // Make space for the button
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  upView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingVertical: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDF1F3",
    marginBottom: 50,
  },
  upText: {
    color: "#0069CB",
    fontWeight: "500",
    fontSize: 18,
  },
  topPart: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingTop: Platform.OS == "android" ? 40 : 60,
  },
  field: {
    marginBottom: 10,
  },
  fromPart: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  textArea: {
    height: 150,
    borderColor: "#EDF1F3",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
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
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent", // No background, to avoid blocking other content
  },
});

export default WorkExpForm;
