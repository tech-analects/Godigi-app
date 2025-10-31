import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import React, { useContext, useRef, useState } from "react";
import CheckBox from "react-native-checkbox";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import apiInstance from "../interceptors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../UserContext";
import { useRouter } from "expo-router";

function VerifyCode() {
  const [selectedTab, setSelectedTab] = useState("email");
  const navigation = useNavigation();
  const [err,setErr] = useState("")

  const goBack = () => {
    navigation.goBack();
  };

    const route = useRoute();
    console.log(route?.params)
    let otp = route?.params?.otp;
    let userId = route?.params?.userId;
    let screen = route?.params?.screen;
    console.log(screen)

  const goToResetPassword = () => {
    navigation.navigate("resetPassword",{userId:userId});
  };

   const otpInputRef = useRef(null);
   const router = useRouter();
   const [loading,setLoading] = useState(false)
     const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
   

   const handleOTPChange = (otpentered) => {
     console.log("OTP Entered:", otpentered);
     if (otpentered.length === 4) {
       // verify OTP
       if (otpentered == otp) {
         goToResetPassword();
       } else {
         console.log("otp dont match");
         setErr("OTP does not match.")
       }
     }
   };

   const verifyUser = async () => {
     try {
       setLoading(true);
       const formdata = new FormData();
       formdata.append("user_id", userId);
       const response = await apiInstance.post("verify-otp", formdata, {
         headers: { "Content-Type": "multipart/form-data" },
       });
       console.log(response.data);
      if (response.data.status) {
        let user_token = response.data.token;
        await AsyncStorage.setItem("logged_in_user_token", user_token);
        setIsLoggedIn(true);
        router.push("/(tabs)/");
      } else {
        setErr(response.data.message);
      }
     } catch (error) {
       setErr(error.message);
       console.log(error);
     } finally {
       setLoading(false);
     }
   };

  return (
    <View style={styles.bgMain}>
      <Feather name="arrow-left" size={24}
        onPress={goBack}
        style={{ marginTop: 40 }}
      />
      <View style={styles.main}>
        <View style={styles.topPart}>
          <Text style={styles.heading}>Verify Code</Text>
          <Text style={styles.subHeading}>
            Enter the verification code from email or phone number that we've
            sent.
          </Text>
        </View>
        <View style={styles.otpView}>
          <OTPTextInput
            ref={otpInputRef}
            inputCount={4}
            tintColor="#0F71C3"
            offTintColor="#cccccc"
            handleTextChange={handleOTPChange}
            textInputStyle={styles.otpInput}
          />
        </View>
        {err && (
          <Text style={[styles.errText, { textAlign: "center" }]}>{err}</Text>
        )}
        {/* <View style={styles.resend}>
          <Text style={styles.resendText}>Resend OTP in</Text>
        </View> */}
        {screen == "signUp" && (
          <ThemeBtn
            btnTitle={"Verify"}
            onPress={verifyUser}
            loadingBtn={loading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    flex: 1,
    backgroundColor: "#FAFAFD",
    padding: 20,
  },
  main: {
    marginTop: 100,
    padding: 10,
    height: "70%",
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
  txtBorder: {
    borderWidth: 2,
    borderColor: "#FAFAFD",
    borderRadius: 10,
    height: 65,
    width: 65,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  otpView: {
    marginTop: 80,
    marginBottom: 20,
    padding: 20,
  },
  errText: {
    color: "red",
    fontSize: 12,
    fontWeight: 700,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6C7278",
  },
  resend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
});

export default VerifyCode;
