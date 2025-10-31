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
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Feather,
  Fontisto,
} from "@expo/vector-icons";
import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@/urlPath";
import apiInstance from "./interceptors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function ChnagePassForm() {
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
          <Text style={styles.modalTitle}>SuccessFull !!</Text>
          <Text style={styles.modalText}>
            You have changed the password successfully!
          </Text>
          <ThemeBtn btnTitle={"Continue"} onPress={goBack} />
        </View>
      </View>
    </Modal>
  );


    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword ] = useState('');
    const [passwordShow, setPasswordShow] = useState(true);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
  
    const [frmError, setFrmError] = useState({
      password: false,
      cPassword: false,
      samePass: false,
    });

  const changePass = async () => {
    try {
      if (!password) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, password: true }));
        return;
      }
      if (!confirmPassword) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, cPassword: true }));
        return;
      }
      if (password !== confirmPassword) {
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, samePass: true }));
        return;
      }
      setLoading(true);
      const formdata = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
         formdata.append("token", token);
      formdata.append("password", password);
      const response = await apiInstance.post("change-password", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data.status);
      if (response.data.status) {
        setIsModalOpen(true)
      }
    } catch (error) {
      setErrMsg(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const goToNotifications=()=>{
    router.push("/notifications")
  }

  return (
    <View style={styles.container}>
       <View style={styles.topPart}>
         <Feather name="arrow-left" size={24} color={"#fff"}
            onPress={goBack}
          />
          <Text style={styles.pageName}>Change Password</Text>
          <View>
            {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications}/> */}
          </View>
      </View>

       <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"} // height works better on Android
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // adjust based on header height
  >
     <View style={{ flex: 1, padding: 20, }}>

       <View style={styles.field}>
                   <Text style={Colors.inputlable}>Password</Text>
                   <TextInput
                     placeholder=" Enter your Password"
                     style={Colors.inputbox}
                     placeholderTextColor={"gray"}
                     secureTextEntry={passwordShow}
                     value={password}
                     onChangeText={(text) => {
                       setPassword(text);
                       setFrmError((prevState) => ({
                         ...prevState,
                         password: false,
                         samePass:false
                       }));
                     }}
                   />
                   <TouchableOpacity
                     style={{ position: "absolute", right: 15, top: "60%" }}
                     onPress={() => setPasswordShow(!passwordShow)}
                   >
                     <Feather
                       name={passwordShow ? "eye" : "eye-off"}
                       size={20}
                       color="grey"
                     />
                   </TouchableOpacity>
                 </View>
                 {frmError.password && (
                   <Text style={styles.errText}>Enter Password.</Text>
                 )}
        <View style={styles.field}>
                   <Text style={Colors.inputlable}>Confirm Password</Text>
                   <TextInput
                     placeholder=" Confirm Password"
                     placeholderTextColor={"gray"}
                     style={Colors.inputbox}
                     secureTextEntry={confirmPasswordShow}
                     value={confirmPassword}
                     onChangeText={(text) => {
                       setConfirmPassword(text);
                       setFrmError((prevState) => ({
                         ...prevState,
                         cPassword: false,
                         samePass:false
                       }));
                     }}
                   />
                   <TouchableOpacity
                     style={{ position: "absolute", right: 15, top: "60%" }}
                     onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
                   >
                     <Feather
                       name={confirmPasswordShow ? "eye" : "eye-off"}
                       size={20}
                       color="grey"
                     />
                   </TouchableOpacity>
                 </View>
                 {frmError.cPassword && (
                   <Text style={styles.errText}>Enter Confirm Password.</Text>
                 )}
                 {frmError.samePass && (
                   <Text style={styles.errText}>
                     Password and Confirm Password are not same.
                   </Text>
                 )}
                 {errMsg && (
                   <Text style={styles.errText}>
                     There is an error changing your password right now.
                   </Text>
                 )}
      <View style={styles.buttonContainer}>
        <ThemeBtn btnTitle={"Change Password"} onPress={changePass} loadingBtn={loading} />
      </View>
     </View>
  </KeyboardAvoidingView>

      {/* <ScrollView style={styles.formContainer}>

      </ScrollView> */}

      {/* Positioned Button at the Bottom */}
      {successModal}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
   errText: {
    color: "red",
    fontSize: 12,
    fontWeight: 700,
  },
  formContainer: {
    padding: 20,
    marginBottom: 80, // Make space for the button
  },
    topPart: {
    backgroundColor: Colors.bg,
       height:100,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 2,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    paddingTop: Platform.OS === "android" ? 50 : 70,
    paddingHorizontal:20
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#fff"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
    twoPart: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  field: {
    marginBottom: 10,
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
   form: {
    marginBottom: 50,
    padding: 20,
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
    bottom: 40,
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

export default ChnagePassForm;
