import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import CheckBox from "react-native-checkbox";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImagesPath } from "@/constants/ImagesPath";
import apiInstance from "../interceptors";

function ResetPassword() {
  const [selectedTab, setSelectedTab] = useState("email");
  const navigation = useNavigation();

  const route = useRoute();
  const userId = route?.params?.userId;
  console.log(userId)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const goToVerifyCode = () => {
    navigation.navigate("verifyCode"); // Fixed typo and used react-navigation method
  };
  const goToLogin = () => {
    setIsModalOpen(false);
    navigation.navigate("login"); // Fixed typo and used react-navigation method
  };

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
      const [passwordShow, setPasswordShow] = useState(true);
      const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
    const [resettingPass, setResettingPass] = useState(false);
    const [err,setErr] = useState("")

  const resetPassword=async()=>{
    try {
      if(!password || !confirmPassword){
        setErr("Enter both feilds")
        return;
      }
      if(password !== confirmPassword ){
        setErr("Confirm password should be same as password!")
        return
      }
      setResettingPass(true)
      const formdata = new FormData();
      formdata.append("user_id",userId);
      formdata.append("password", password);
      const response = await apiInstance.post(
        "forgot-password-change-password",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response)
      if(response.data.status){
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error)
      setErr("There was a error resetting your pass!")
    }
    finally{
      setResettingPass(false)
    }
  }

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
            New password has been generated successfully.
          </Text>
          {/* <ThemeBtn btnTitle={"Login Account"} onPress={gotToLogin} /> */}
          <ThemeBtn btnTitle={"Continue"} onPress={goToLogin} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.bgMain}>
      <TouchableOpacity onPress={goBack} style={{marginTop:20}}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.main}>
        <View style={styles.topPart}>
          <Text style={styles.heading}>Reset Password</Text>
          <Text style={styles.subHeading}>
            Enter your new password and confirm the password to reset the
            password.
          </Text>
        </View>
        <View style={styles.passView}>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Password</Text>
            <TextInput
              placeholder=" Enter your Password"
              autoComplete="off"
              style={Colors.inputbox}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErr("");
              }}
              secureTextEntry={passwordShow}
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
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your Password"
              autoComplete="off"
              style={Colors.inputbox}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErr("");
              }}
              secureTextEntry={confirmPasswordShow}
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
        </View>
        {err && <Text style={styles.errText}>{err}</Text>}
        <ThemeBtn
          btnTitle={"Reset Password"}
          onPress={resetPassword}
          loadingBtn={resettingPass}
        />
      </View>
      {successModal}
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    flex: 1,
    backgroundColor: "#FAFAFD",
    padding: 20,
  },
  errText: {
    color: "red",
    fontSize: 12,
    fontWeight: 700,
  },
  main: {
    marginTop: 100,
    height: "70%",
    padding: 10,
  },
  topPart: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
    textAlign: "center",
  },
  passView: {
    marginTop: 50,
    marginBottom: 50,
    gap: 20,
  },
});

export default ResetPassword;
