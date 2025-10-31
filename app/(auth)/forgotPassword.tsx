import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import apiInstance from "../interceptors";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ForgotPassword() {
  const [selectedTab, setSelectedTab] = useState("email");
  const [sendingCode, setSendingCode] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };


  const goToVerifyCode = (otp,userId) => {
    // navigation.navigate("verifyCode");
    console.log(otp)
    navigation.navigate("verifyCode", { otp:otp ,userId:userId});
    // navigation.navigate("resetPassword");
    // router.push("/verifyCode")
  };

  // const sendCode = async () => {
   

  //   try {
  //     if (!emailOrPhone.trim()) {
  //       setErrorMessage("Please enter your Email or Phone number.");
  //       return;
  //     }

  //     if (selectedTab === "email") {
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       if (!emailRegex.test(emailOrPhone)) {
  //         setErrorMessage("Please enter a valid Email address.");
  //         return;
  //       }
  //     } else {
  //       const phoneRegex = /^[0-9]{10}$/;
  //       if (!phoneRegex.test(emailOrPhone)) {
  //         setErrorMessage("Please enter a valid 10-digit Phone number.");
  //         return;
  //       }
  //     }
  //     setSendingCode(true);
  //      const formdata = new FormData();
  //      formdata.append("phone_email", emailOrPhone);
  //      console.log(formdata)
  //      const response = await apiInstance.post(
  //        "forgot-password-send-otp",
  //        formdata,
  //        {
  //          headers: { "Content-Type": "multipart/form-data" },
  //        }
  //      );
  //      console.log(response.data,JSON.parse(response.data.status))
  //      if(JSON.parse(response.data.status)){
  //         goToVerifyCode(response.data.otp, response.data.user_id);
  //      }
  //      else{
  //        setErrorMessage(response.data.message)
  //      }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSendingCode(false);
  //   }
  // };

  const sendCode = async () => {
  try {
    // === OTP LIMIT LOGIC START ===
    const now = Date.now();
    const storedData = await AsyncStorage.getItem('otp_attempts');
    let attempts = storedData ? JSON.parse(storedData) : [];

    // Filter only attempts within last 10 minutes
    attempts = attempts.filter(t => now - t < 10 * 60 * 1000);

    if (attempts.length >= 3) {
      setErrorMessage("You have reached the maximum OTP requests. Try again after 10 minutes.");
      return;
    }

    // === Validation Section ===
    if (!emailOrPhone.trim()) {
      setErrorMessage("Please enter your Email or Phone number.");
      return;
    }

    if (selectedTab === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailOrPhone)) {
        setErrorMessage("Please enter a valid Email address.");
        return;
      }
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(emailOrPhone)) {
        setErrorMessage("Please enter a valid 10-digit Phone number.");
        return;
      }
    }

    setSendingCode(true);
    const formdata = new FormData();
    formdata.append("phone_email", emailOrPhone);

    attempts.push(now);
      await AsyncStorage.setItem('otp_attempts', JSON.stringify(attempts));
      console.log("added")

    const response = await apiInstance.post(
      "forgot-password-send-otp",
      formdata,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log(response.data);

    if (JSON.parse(response.data.status)) {
      // Store this attempt
      attempts.push(now);
      await AsyncStorage.setItem('otp_attempts', JSON.stringify(attempts));

      goToVerifyCode(response.data.otp, response.data.user_id);
    } else {
      setErrorMessage(response.data.message);
    }
  } catch (error) {
    console.log(error);
    setErrorMessage("Something went wrong. Please try again.");
  } finally {
    setSendingCode(false);
  }
};

  return (
    <View style={styles.bgMain}>
      <TouchableOpacity onPress={goBack} style={{ marginTop: 40 }}>
        <Feather name="arrow-left" size={24}  color="black" />
      </TouchableOpacity>

      <View style={styles.main}>
        <View style={styles.topPart}>
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.subHeading}>
            Enter your phone number or email, and we will send you the
            verification code.
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsGrp}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "email" && styles.activeTab]}
            onPress={() => setSelectedTab("email")}
          >
            <Text style={styles.tabText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "phNumber" && styles.activeTab]}
            onPress={() => setSelectedTab("phNumber")}
          >
            <Text style={styles.tabText}>Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {selectedTab === "email" && (
          <EmailForm
            setEmailOrPhone={setEmailOrPhone}
            emailOrPhone={emailOrPhone}
            setErrorMessage={setErrorMessage}
          />
        )}
        {selectedTab === "phNumber" && (
          <PhoneForm
            setEmailOrPhone={setEmailOrPhone}
            emailOrPhone={emailOrPhone}
            setErrorMessage={setErrorMessage}
          />
        )}

        {/* Error Message */}
        {errorMessage ? (
          <Text style={styles.errText}>{errorMessage}</Text>
        ) : null}

        <ThemeBtn
          btnTitle={"Send Code"}
          onPress={sendCode}
          // onPress={goToVerifyCode}
          loadingBtn={sendingCode}
        />
      </View>
    </View>
  );
}

export function EmailForm({ emailOrPhone, setEmailOrPhone ,setErrorMessage}) {
  return (
    <View style={styles.Form}>
      <TextInput
        placeholder="Enter your Email ID"
        autoComplete="off"
        keyboardType="email-address"
        value={emailOrPhone}
        onChangeText={(text)=>{setEmailOrPhone(text);setErrorMessage("")}}
        style={Colors.inputbox}
        placeholderTextColor={"gray"}
      />
    </View>
  );
}

export function PhoneForm({ emailOrPhone, setEmailOrPhone, setErrorMessage }) {
  return (
    <View style={styles.Form}>
      <TextInput
        placeholder="Enter your Phone Number"
        autoComplete="off"
        keyboardType="numeric"
        value={emailOrPhone}
        onChangeText={(text) => {
          setEmailOrPhone(text);
          setErrorMessage("");
        }}
        style={Colors.inputbox}
        placeholderTextColor={"gray"}
      />
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
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },
  main: {
    marginTop: 100,
    flex: 1,
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
  tabsGrp: {
    backgroundColor: "#F2F6FD",
    width: "100%",
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    marginTop: 50,
  },
  tab: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  Form: {
    marginVertical: 40,
  },
});

export default ForgotPassword;
