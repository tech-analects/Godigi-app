import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Modal,
  Image,
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
import * as DocumentPicker from "expo-document-picker";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { useNavigation } from "@react-navigation/native";

function ProjDetailsForm() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedExp, setSelectedExp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const goToLogin = () => {
    setIsModalOpen(false);
    navigation.navigate("login");
  };

  const handleNext = () => {
    setIsModalOpen(true);
  };

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

  const successModal = (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalImageContainer}>
            <Image
              source={ImagesPath.resetModalImg}
              style={styles.modalImage}
            />
          </View>
          <Text style={styles.modalTitle}>Congratulations !!</Text>
          <Text style={styles.modalText}>
            Your profile setup has been completed successfully
          </Text>
          <ThemeBtn btnTitle={"Continue"} onPress={goToLogin} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <View style={styles.topPart}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.heading}>Project Details</Text>
        </View>

        {/* Project Form Fields */}
        {["Project Name", "Role", "Project URL"].map((label, index) => (
          <View style={styles.field} key={index}>
            <Text style={Colors.inputlable}>{label}</Text>
            <TextInput
              placeholder={label}
              autoComplete="off"
              style={Colors.inputbox}
            />
          </View>
        ))}

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

        <Text style={Colors.inputlable}>Description (optional)</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder="Project description (optional)"
          placeholderTextColor="grey"
        />
      </ScrollView>

      {/* Positioned Button at the Bottom */}
      <View style={styles.buttonContainer}>
        <ThemeBtn btnTitle={"Update"} onPress={goBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFD",
  },
  formContainer: {
    padding: 20,
    marginBottom: 80, // Make space for the button
  },
  topPart: {
    marginBottom: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? 40 : 60,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
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
    backgroundColor: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent", // No background, to avoid blocking other content
  },
  upView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingVertical: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDF1F3",
    marginVertical: 10,
  },
  upText: {
    color: "#0069CB",
    fontWeight: "500",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 30,
    width: "90%",
    height: "70%",
  },
  modalImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    marginVertical: 30,
    color: "#6C7278",
  },
});

export default ProjDetailsForm;
