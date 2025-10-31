import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import React, { useContext, useRef, useState } from "react";
// import CheckBox from "react-native-checkbox";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { router, useRouter } from "expo-router";
// import { Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../UserContext";
import { ImagesPath } from "@/constants/ImagesPath";
import Animated, { FadeInDown } from "react-native-reanimated";
import {BASE_URL} from "../../urlPath";
import apiInstance from "../interceptors";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import usePushToken from "../token";
// import analytics from "@react-native-firebase/analytics"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import * as Analytics from 'expo-firebase-analytics';

function Login() {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
        <Animated.ScrollView
          entering={FadeInDown.duration(500).delay(200)}
          style={[styles.main,{marginTop: selectedTab === "login" ? 80 : 20}]}
          // contentContainerStyle={{ justifyContent: "center" }}
            // contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              // keyboardShouldPersistTaps="handled"
        >
          
<StatusBar barStyle={"dark-content"}/>
          <View style={styles.topPart}>
            {/* <Text style={styles.heading}>Get Started Now</Text> */}
            <Image
              source={ImagesPath.logoApp}
              style={{ width: 300, objectFit: "contain", marginVertical: 20 }}
            />
            <Text style={styles.subHeading}>
              Create an account or log in to explore more
            </Text>
          </View>
          <View style={styles.tabsGrp}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "login" && styles.activeTab, // Apply activeTab style if selected
              ]}
              onPress={() => setSelectedTab("login")}
            >
              <Text style={styles.tabText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "signin" && styles.activeTab, // Apply activeTab style if selected
              ]}
              onPress={() => setSelectedTab("signin")}
            >
              <Text style={styles.tabText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {selectedTab == "login" && <LoginForm />}
          {selectedTab == "signin" && <SignInForm />}
        </Animated.ScrollView>
  );
}

export function LoginForm() {
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status

  const router = useRouter();
  // Function to toggle the checkbox
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

   const passwordRef = useRef(null);

  //   const logEventsLogin = async () => {
  //   await analytics().logLogin({
  //     method:'email'
  //   })
  // };

//     const logEventsLogin = async () => {
//     await Analytics.logEvent('login', {
//   method: 'email',
// });
//   };

  const { isLoggedIn, setIsLoggedIn ,setLoggedInUserName,setLoggedInUserImg} = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
   const [passwordShow, setPasswordShow] = useState(true);
  const [frmError, setFrmError] = useState({
    email: false,
    password: false,
  });

  const token = usePushToken();
  // console.log("device token is",token)

  const logHaslaunched=async()=>{
     await AsyncStorage.setItem("hasLaunched", "false");
    const keys = await AsyncStorage.getItem("hasLaunched");
      console.log("Remaining Keys After Logout:", keys);
  }

  const login = async () => {
    try {
      if (!email) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, email: true }));
        return;
      }
      if (!password) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, password: true }));
        return;
      }
      setLoading(true);
      const url = `${BASE_URL}login`;
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      const trimmedToken = token
        .replace("ExponentPushToken[", "")
        .replace("]", "");
      formdata.append("token", trimmedToken);
      console.log(formdata)
      const response = await apiInstance.post("login", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        console.log(response.data,response.data.data.profile_url)
        setLoggedInUserName(response.data.data.user_name);
        setLoggedInUserImg(response.data.data.profile_url);
        let user_token = response.data.token;
        let user_id = response.data.data.user_id || "";
        let user_type = response.data.data.user_type || "";
        let user_name = response.data.data.user_name || "";
        let user_email = response.data.data.user_email || "";
        let user_gender = response.data.data.user_gender || "";
        let user_dob = response.data.data.user_dob || "";
        let user_img = response.data.data.profile_url || "";
        console.log(user_token,user_id,user_type)
        await AsyncStorage.setItem("logged_in_user_token", user_token);
        await AsyncStorage.setItem("logged_in_user_type", user_type);
        await AsyncStorage.setItem("logged_in_user_id", user_id);
        await AsyncStorage.setItem("logged_in_user_name", user_name);
        await AsyncStorage.setItem("logged_in_user_email", user_email);
        await AsyncStorage.setItem("logged_in_user_gender", user_gender);
        await AsyncStorage.setItem("logged_in_user_dob", user_dob);
        await AsyncStorage.setItem("logged_in_user_img", user_img);
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        await AsyncStorage.removeItem('otp_attempts');
        // logEventsLogin();
      console.log("hasLaunched from login",hasLaunched)
        setIsLoggedIn(true);
        // router.push("/(main)/(tabs)/home");
      } else {
        setErr(response.data.message);
      }
    } catch (error) {
      setErr(error.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const goToWalk=()=>{
    router.push("/WalkthroughScreen")
  }

  const logAllAsyncStorageItems = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        console.log(keys)
        stores.forEach(([key, value]) => {
          try {
            const parsedValue = JSON.parse(value);
            console.log(`${key}:`, parsedValue);
          } catch (err) {
            console.log(`${key}:`, value); // fallback if not JSON
          }
        });
      } catch (error) {
        console.error("Failed to load AsyncStorage:", error);
      }
    };


  const goToForgotPass = () => {
    router.push("forgotPassword");
  };



  return (
        // <View>

        <KeyboardAvoidingView
  style={{ flex: 1,paddingHorizontal:20 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={50}
>
         {/* <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "height" : "height"}
  keyboardVerticalOffset={50}
>
<KeyboardAwareScrollView
contentContainerStyle={{ paddingHorizontal: 20,backgroundColor:'red', }}
enableOnAndroid
extraScrollHeight={0}
keyboardShouldPersistTaps="handled"

> */}
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Email</Text>
            <TextInput
              placeholder=" Enter your Email ID"
              autoComplete="off"
              onFocus={() => console.log("focused")}
              keyboardType="email-address"
              placeholderTextColor={"gray"}
              style={Colors.inputbox}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setFrmError((prev) => ({ ...prev, email: false }));
                setErr(false);
              }}
              returnKeyType="next"
onSubmitEditing={() => passwordRef.current?.focus()}

            />
            {frmError.email && <Text style={styles.errText}>Enter Email.</Text>}
          </View>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Password</Text>
            <TextInput
            ref={passwordRef}
              placeholder=" Enter your Password"
              autoComplete="off"
              style={Colors.inputbox}
              secureTextEntry={passwordShow}
              placeholderTextColor={"gray"}
              keyboardType="web-search"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setFrmError((prev) => ({ ...prev, password: false }));
                setErr(false);
              }}
              returnKeyType="done" // shows "Done" on iOS, "Enter" on Android
              blurOnSubmit={false} // keeps focus behavior correct
              onSubmitEditing={()=>{
                Keyboard.dismiss();
                login();
              }}
            />
            {frmError.password && (
              <Text style={styles.errText}>Enter Password.</Text>
            )}
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
          {err && <Text style={styles.errText}>{err}</Text>}
          <View style={styles.midPart}>
            {/* <View>
          <CheckBox
            // style={{ scaleX: 0.8 }}
            label="Remember Me"
            color="#0069cb" // Change the color of the checkbox when checked
            uncheckedColor="#0069cb"
            value={isChecked} // Pass the current checkbox state
            onValueChange={toggleCheckbox} // Update state on changechecked or unchecked
          />
        </View> */}
            <View
              style={{
                flexDirection: "row",
                gap: 0,
                alignItems: "center",
              }}
            >
              {/* <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => setIsChecked(!isChecked)}
            color="#0069cb" // Change the color of the checkbox when checked
            uncheckedColor="#0069cb"
          />
          <Text style={{ fontSize: 14, color: "grey" }}>Remember Me</Text> */}
            </View>
            <TouchableOpacity onPress={goToForgotPass}>
              <Text style={styles.forPass}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          <ThemeBtn btnTitle={"Log In"} onPress={login} loadingBtn={loading} />
          {/* <ThemeBtn btnTitle={"Log In has launched"} onPress={logHaslaunched} loadingBtn={loading} /> */}
          {/* <ThemeBtn btnTitle={"check has launched"} onPress={logAllAsyncStorageItems} loadingBtn={loading} /> */}
        {/* </KeyboardAwareScrollView> */}
    </KeyboardAvoidingView>
        //</View> 
  );
}

export function SignInForm() {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

   const token = usePushToken();
  // console.log("device token is",token)


  const [frmError, setFrmError] = useState({
    email: false,
    password: false,
    cPassword: false,
    fName: false,
    phone: false,
    samePass: false,
    invalidEmail: false,
    invalidPhone: false,
  });

  // const signUpAccount = () => {
  //   setIsLoggedIn(true);
  //   router.push("/home");
  // };

  const navigation = useNavigation();
   const goToVerifyUser = (otp, userId, screen) => {
     // navigation.navigate("verifyCode");
     console.log(otp);
     navigation.navigate("verifyUser", {
       otp: otp,
       userId: userId,
     });
     // router.push("/")
   };

  const signUpAccount = async () => {
    try {
      if (!firstName) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, fName: true }));
        return;
      }
      if (!email) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, email: true }));
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         setErr(true);
         setFrmError((prevState) => ({ ...prevState, invalidEmail: true }));
        return;
      }
      if (!phone) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, phone: true }));
        return;
      }
      if (phone.length !== 10) {
        // Alert.alert("Select the sales person")
        setErr(true);
        setFrmError((prevState) => ({ ...prevState, invalidPhone: true }));
        return;
      }
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
      const url = `${BASE_URL}login`;
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("name", firstName);
      formdata.append("password", password);
      formdata.append("phone", phone);
      const trimmedToken = token
        .replace("ExponentPushToken[", "")
        .replace("]", "");
      formdata.append("token", trimmedToken);
      const response = await apiInstance.post("register", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("signup",formdata)
      console.log(response.data);
      if (response.data.status) {
        goToVerifyUser(response.data.otp,response.data.user_id)
      }
      else{
        setErr(true);
        setErrMsg(response.data.message)
        console.log(response.data.message)
      }
    } catch (error) {
      // setErrMsg(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior="height"
    //   keyboardVerticalOffset={60}
    //   // style={{backgroundColor:"yellow"}}
    //    style={{ flex: 1 }}
    // >
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={50}
>
<KeyboardAwareScrollView
contentContainerStyle={{ paddingHorizontal: 20,paddingBottom:50 }}
enableOnAndroid
extraScrollHeight={20}
keyboardShouldPersistTaps="handled"

>

        {/* <Animated.ScrollView
          entering={FadeInDown.duration(500).delay(200)}
          style={[styles.loginForm]}
           contentContainerStyle={{ paddingBottom: 20 }}
        > */}
          {/* <View style={styles.fnamePart}>
           
            <View style={styles.field}>
              <Text style={Colors.inputlable}>Last Name</Text>
              <TextInput
                placeholder="Enter Last name"
                style={[Colors.inputbox, { width: 150 }]}
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                  setFrmError((prevState) => ({
                    ...prevState,
                    lName: false,
                  }));
                }}
              />
            </View>
          </View> */}
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={Colors.inputbox}
              placeholderTextColor={"gray"}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setFrmError((prevState) => ({
                  ...prevState,
                  fName: false,
                }));
              }}
            />
          </View>
          {frmError.fName && (
            <Text style={styles.errText}>Enter First Name.</Text>
          )}

          <View style={styles.field}>
            <Text style={Colors.inputlable}>Email</Text>
            <TextInput
              placeholder=" Enter your Email ID"
              style={Colors.inputbox}
              value={email}
              placeholderTextColor={"gray"}
              onChangeText={(text) => {
                setEmail(text);
                setFrmError((prevState) => ({
                  ...prevState,
                  email: false,
                  invalidEmail: false,
                }));
              }}
              keyboardType="email-address"
            />
          </View>
          {frmError.email && <Text style={styles.errText}>Enter Email.</Text>}
          {frmError.invalidEmail && (
            <Text style={styles.errText}>Enter valid Email.</Text>
          )}

          <View style={styles.field}>
            <Text style={Colors.inputlable}>Phone Number</Text>
            <TextInput
              placeholder=" Enter your Phone Number"
              style={Colors.inputbox}
              placeholderTextColor={"gray"}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                setFrmError((prevState) => ({
                  ...prevState,
                  phone: false,
                  invalidPhone: false,
                }));
              }}
              keyboardType="phone-pad"
            />
          </View>
          {frmError.phone && (
            <Text style={styles.errText}>Enter Phone Number.</Text>
          )}
          {frmError.invalidPhone && (
            <Text style={styles.errText}>Enter valid Phone Number.</Text>
          )}

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
                  samePass: false,
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
          {/* {errMsg && (
            <Text style={styles.errText}>
              There is an error registering you.
            </Text>
          )} */}
          {
            err && 
            <Text style={styles.errText}>
              {errMsg}
            </Text>
          }
          <ThemeBtn
            btnTitle={"Sign Up"}
            onPress={signUpAccount}
            loadingBtn={loading}
          />
        {/* </Animated.ScrollView> */}
</KeyboardAwareScrollView>

     </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  bgMain: {
    flex: 1,
    backgroundColor: "#FAFAFD",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  main: {
    paddingTop: 50,
    // padding: 20,
    // flex:1
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
    backgroundColor: "#f2f2f2",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  tab: {
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 5,
    width: "50%",
    backgroundColor:'#F2F6FD'
  },
  errText: {
    color: "red",
    fontSize: 12,
    fontWeight: 700,
  },
  activeTab: {
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 400,
    color:"black"
  },
  loginForm: {
    marginTop: -10,
    paddingHorizontal:20,
    // height: "60%",
    // flex:1,
    // backgroundColor:"red"
  },
  field: {
    marginBottom: 10,
  },
  midPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  forPass: {
    color: "#0069CB",
    fontWeight: "500",
    fontSize: 14,
  },
  remme: {
    color: "#6C7278",
  },
  fnamePart: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
});

export default Login;


// import ThemeBtn from "@/components/ThemeBtn";
// import { Colors } from "@/constants/Colors";
// import React, { useContext, useState } from "react";
// // import CheckBox from "react-native-checkbox";
// import {
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import { router, useRouter } from "expo-router";
// // import { Checkbox } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { UserContext } from "../UserContext";
// import { ImagesPath } from "@/constants/ImagesPath";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import {BASE_URL} from "../../urlPath";
// import apiInstance from "../interceptors";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import usePushToken from "../token";

// function Login() {
//   const [selectedTab, setSelectedTab] = useState("login");

//   return (
//     <KeyboardAvoidingView
//       // behavior={Platform.OS === "ios" ? 200 : 100}
//         behavior="padding"
//       style={styles.bgMain}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <Animated.ScrollView
//           entering={FadeInDown.duration(500).delay(200)}
//           style={[styles.main,{marginTop:selectedTab == "login" && 100}]}
//           contentContainerStyle={{ justifyContent: "center" }}
//         >
//           <View style={styles.topPart}>
//             {/* <Text style={styles.heading}>Get Started Now</Text> */}
//             <Image
//               source={ImagesPath.logoApp}
//               style={{ width: 300, objectFit: "contain", marginVertical: 20 }}
//             />
//             <Text style={styles.subHeading}>
//               Create an account or log in to explore more
//             </Text>
//           </View>
//           <View style={styles.tabsGrp}>
//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 selectedTab === "login" && styles.activeTab, // Apply activeTab style if selected
//               ]}
//               onPress={() => setSelectedTab("login")}
//             >
//               <Text style={styles.tabText}>Log In</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 selectedTab === "signin" && styles.activeTab, // Apply activeTab style if selected
//               ]}
//               onPress={() => setSelectedTab("signin")}
//             >
//               <Text style={styles.tabText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//           {selectedTab == "login" && <LoginForm />}
//           {selectedTab == "signin" && <SignInForm />}
//         </Animated.ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//     // <View style={styles.bgMain}>
//     // </View>
//   );
// }

// export function LoginForm() {
//   const [isChecked, setIsChecked] = useState(false); // State to track checkbox status

//   const router = useRouter();
//   // Function to toggle the checkbox
//   const toggleCheckbox = () => {
//     setIsChecked(!isChecked);
//   };

//   const { isLoggedIn, setIsLoggedIn ,setLoggedInUserName} = useContext(UserContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState(false);
//   const [loading, setLoading] = useState(false);
//    const [passwordShow, setPasswordShow] = useState(true);
//   const [frmError, setFrmError] = useState({
//     email: false,
//     password: false,
//   });

//   const token = usePushToken();
//   console.log("device token is",token)

//   const login = async () => {
//     try {
//       if (!email) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, email: true }));
//         return;
//       }
//       if (!password) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, password: true }));
//         return;
//       }
//       setLoading(true);
//       const url = `${BASE_URL}login`;
//       const formdata = new FormData();
//       formdata.append("email", email);
//       formdata.append("password", password);
//       const trimmedToken = token
//         .replace("ExponentPushToken[", "")
//         .replace("]", "");
//       formdata.append("token", trimmedToken);
//       console.log(formdata)
//       const response = await apiInstance.post("login", formdata, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response.data)
//       if (response.data.status) {
//         let user_token = response.data.token;
//         let user_id = response.data.data.user_id;
//         let user_type = response.data.data.user_type;
//         let user_name = response.data.data.user_name;
//         console.log(user_token,user_id,user_type)
//         await AsyncStorage.setItem("logged_in_user_token", user_token);
//         await AsyncStorage.setItem("logged_in_user_type", user_type);
//         await AsyncStorage.setItem("logged_in_user_id", user_id);
//         await AsyncStorage.setItem("logged_in_user_name", user_name);
//         setIsLoggedIn(true);
//         setLoggedInUserName(response.data.data.user_name);
//         router.push("/(tabs)/");
//       } else {
//         setErr(response.data.message);
//       }
//     } catch (error) {
//       setErr(error.message);
//       console.log(error)
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToWalk=()=>{
//     router.push("/WalkthroughScreen")
//   }

  // const logAllAsyncStorageItems = async () => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();
  //       const stores = await AsyncStorage.multiGet(keys);
  //       console.log(keys)
  //       stores.forEach(([key, value]) => {
  //         try {
  //           const parsedValue = JSON.parse(value);
  //           console.log(`${key}:`, parsedValue);
  //         } catch (err) {
  //           console.log(`${key}:`, value); // fallback if not JSON
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Failed to load AsyncStorage:", error);
  //     }
  //   };


//   const goToForgotPass = () => {
//     router.push("forgotPassword");
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // adjust if you have a header
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <Animated.ScrollView
//           entering={FadeInDown.duration(500).delay(200)}
//           style={styles.loginForm}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         >
//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>Email</Text>
//             <TextInput
//               placeholder=" Enter your Email ID"
//               autoComplete="off"
//               placeholderTextColor={"gray"}
//               style={Colors.inputbox}
//               value={email}
//               onChangeText={(text) => {
//                 setEmail(text);
//                 setFrmError((prev) => ({ ...prev, email: false }));
//                 setErr(false);
//               }}
//             />
//             {frmError.email && <Text style={styles.errText}>Enter Email.</Text>}
//           </View>
//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>Password</Text>
//             <TextInput
//               placeholder=" Enter your Password"
//               autoComplete="off"
//               style={Colors.inputbox}
//               secureTextEntry={passwordShow}
//               placeholderTextColor={"gray"}
//               value={password}
//               onChangeText={(text) => {
//                 setPassword(text);
//                 setFrmError((prev) => ({ ...prev, password: false }));
//                 setErr(false);
//               }}
//               returnKeyType="done" // shows "Done" on iOS, "Enter" on Android
//               blurOnSubmit={false} // keeps focus behavior correct
//               onSubmitEditing={()=>{
//                 Keyboard.dismiss();
//                 login();
//               }}
//             />
//             {frmError.password && (
//               <Text style={styles.errText}>Enter Password.</Text>
//             )}
//             <TouchableOpacity
//               style={{ position: "absolute", right: 15, top: "60%" }}
//               onPress={() => setPasswordShow(!passwordShow)}
//             >
//               <Feather
//                 name={passwordShow ? "eye" : "eye-off"}
//                 size={20}
//                 color="grey"
//               />
//             </TouchableOpacity>
//           </View>
//           {err && <Text style={styles.errText}>{err}</Text>}
//           <View style={styles.midPart}>
//             {/* <View>
//           <CheckBox
//             // style={{ scaleX: 0.8 }}
//             label="Remember Me"
//             color="#0069cb" // Change the color of the checkbox when checked
//             uncheckedColor="#0069cb"
//             value={isChecked} // Pass the current checkbox state
//             onValueChange={toggleCheckbox} // Update state on changechecked or unchecked
//           />
//         </View> */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 gap: 0,
//                 alignItems: "center",
//               }}
//             >
//               {/* <Checkbox
//             status={isChecked ? "checked" : "unchecked"}
//             onPress={() => setIsChecked(!isChecked)}
//             color="#0069cb" // Change the color of the checkbox when checked
//             uncheckedColor="#0069cb"
//           />
//           <Text style={{ fontSize: 14, color: "grey" }}>Remember Me</Text> */}
//             </View>
//             <TouchableOpacity onPress={goToForgotPass}>
//               <Text style={styles.forPass}>Forgot Password ?</Text>
//             </TouchableOpacity>
//           </View>
//           <ThemeBtn btnTitle={"Log In"} onPress={login} loadingBtn={loading} />
//         </Animated.ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// export function SignInForm() {
//   const router = useRouter();
//   const { setIsLoggedIn } = useContext(UserContext);

//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [passwordShow, setPasswordShow] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
//   const [err, setErr] = useState(false);
//   const [errMsg, setErrMsg] = useState("");

//   const [frmError, setFrmError] = useState({
//     email: false,
//     password: false,
//     cPassword: false,
//     fName: false,
//     phone: false,
//     samePass: false,
//     invalidEmail: false,
//     invalidPhone: false,
//   });

//   // const signUpAccount = () => {
//   //   setIsLoggedIn(true);
//   //   router.push("/home");
//   // };

//   const navigation = useNavigation();
//    const goToVerifyUser = (otp, userId, screen) => {
//      // navigation.navigate("verifyCode");
//      console.log(otp);
//      navigation.navigate("verifyUser", {
//        otp: otp,
//        userId: userId,
//      });
//      // router.push("/")
//    };

//   const signUpAccount = async () => {
//     try {
//       if (!firstName) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, fName: true }));
//         return;
//       }
//       if (!email) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, email: true }));
//         return;
//       }
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//          setErr(true);
//          setFrmError((prevState) => ({ ...prevState, invalidEmail: true }));
//         return;
//       }
//       if (!phone) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, phone: true }));
//         return;
//       }
//       if (phone.length !== 10) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, invalidPhone: true }));
//         return;
//       }
//       if (!password) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, password: true }));
//         return;
//       }
//       if (!confirmPassword) {
//         // Alert.alert("Select the sales person")
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, cPassword: true }));
//         return;
//       }
//       if (password !== confirmPassword) {
//         setErr(true);
//         setFrmError((prevState) => ({ ...prevState, samePass: true }));
//         return;
//       }
//       setLoading(true);
//       const url = `${BASE_URL}login`;
//       const formdata = new FormData();
//       formdata.append("email", email);
//       formdata.append("name", firstName);
//       formdata.append("password", password);
//       formdata.append("phone", phone);
//       const response = await apiInstance.post("register", formdata, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response.data);
//       if (response.data.status) {
//         goToVerifyUser(response.data.otp,response.data.user_id)
//       }
//     } catch (error) {
//       setErrMsg(true);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80} // adjust if you have a header
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <Animated.ScrollView
//           entering={FadeInDown.duration(500).delay(200)}
//           style={styles.loginForm}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         >
//           {/* <View style={styles.fnamePart}>
           
//             <View style={styles.field}>
//               <Text style={Colors.inputlable}>Last Name</Text>
//               <TextInput
//                 placeholder="Enter Last name"
//                 style={[Colors.inputbox, { width: 150 }]}
//                 value={lastName}
//                 onChangeText={(text) => {
//                   setLastName(text);
//                   setFrmError((prevState) => ({
//                     ...prevState,
//                     lName: false,
//                   }));
//                 }}
//               />
//             </View>
//           </View> */}
//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>First Name</Text>
//             <TextInput
//               placeholder="Enter your name"
//               style={Colors.inputbox}
//               placeholderTextColor={"gray"}
//               value={firstName}
//               onChangeText={(text) => {
//                 setFirstName(text);
//                 setFrmError((prevState) => ({
//                   ...prevState,
//                   fName: false,
//                 }));
//               }}
//             />
//           </View>
//           {frmError.fName && (
//             <Text style={styles.errText}>Enter First Name.</Text>
//           )}

//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>Email</Text>
//             <TextInput
//               placeholder=" Enter your Email ID"
//               style={Colors.inputbox}
//               value={email}
//               placeholderTextColor={"gray"}
//               onChangeText={(text) => {
//                 setEmail(text);
//                 setFrmError((prevState) => ({
//                   ...prevState,
//                   email: false,
//                   invalidEmail: false,
//                 }));
//               }}
//               keyboardType="email-address"
//             />
//           </View>
//           {frmError.email && <Text style={styles.errText}>Enter Email.</Text>}
//           {frmError.invalidEmail && (
//             <Text style={styles.errText}>Enter valid Email.</Text>
//           )}

//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>Phone Number</Text>
//             <TextInput
//               placeholder=" Enter your Phone Number"
//               style={Colors.inputbox}
//               placeholderTextColor={"gray"}
//               value={phone}
//               onChangeText={(text) => {
//                 setPhone(text);
//                 setFrmError((prevState) => ({
//                   ...prevState,
//                   phone: false,
//                   invalidPhone: false,
//                 }));
//               }}
//               keyboardType="phone-pad"
//             />
//           </View>
//           {frmError.phone && (
//             <Text style={styles.errText}>Enter Phone Number.</Text>
//           )}
//           {frmError.invalidPhone && (
//             <Text style={styles.errText}>Enter valid Phone Number.</Text>
//           )}

//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>Password</Text>
//             <TextInput
//               placeholder=" Enter your Password"
//               style={Colors.inputbox}
//               placeholderTextColor={"gray"}
//               secureTextEntry={passwordShow}
//               value={password}
//               onChangeText={(text) => {
//                 setPassword(text);
//                 setFrmError((prevState) => ({
//                   ...prevState,
//                   password: false,
//                 }));
//               }}
//             />
//             <TouchableOpacity
//               style={{ position: "absolute", right: 15, top: "60%" }}
//               onPress={() => setPasswordShow(!passwordShow)}
//             >
//               <Feather
//                 name={passwordShow ? "eye" : "eye-off"}
//                 size={20}
//                 color="grey"
//               />
//             </TouchableOpacity>
//           </View>
//           {frmError.password && (
//             <Text style={styles.errText}>Enter Password.</Text>
//           )}

//           <View style={styles.field}>
//             <Text style={Colors.inputlable}>Confirm Password</Text>
//             <TextInput
//               placeholder=" Confirm Password"
//               placeholderTextColor={"gray"}
//               style={Colors.inputbox}
//               secureTextEntry={confirmPasswordShow}
//               value={confirmPassword}
//               onChangeText={(text) => {
//                 setConfirmPassword(text);
//                 setFrmError((prevState) => ({
//                   ...prevState,
//                   cPassword: false,
//                 }));
//               }}
//             />
//             <TouchableOpacity
//               style={{ position: "absolute", right: 15, top: "60%" }}
//               onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
//             >
//               <Feather
//                 name={confirmPasswordShow ? "eye" : "eye-off"}
//                 size={20}
//                 color="grey"
//               />
//             </TouchableOpacity>
//           </View>
//           {frmError.cPassword && (
//             <Text style={styles.errText}>Enter Confirm Password.</Text>
//           )}
//           {frmError.samePass && (
//             <Text style={styles.errText}>
//               Password and Confirm Password are not same.
//             </Text>
//           )}
//           {errMsg && (
//             <Text style={styles.errText}>
//               There is an error registering you.
//             </Text>
//           )}
//           <ThemeBtn
//             btnTitle={"Sign Up"}
//             onPress={signUpAccount}
//             loadingBtn={loading}
//           />
//         </Animated.ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }


// const styles = StyleSheet.create({
//   bgMain: {
//     flex: 1,
//     backgroundColor: "#FAFAFD",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     padding: 20,
//   },
//   main: {
//     paddingTop: 50,
//     padding: 10,
//   },
//   topPart: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   subHeading: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "grey",
//     textAlign: "center",
//   },
//   tabsGrp: {
//     backgroundColor: "#F2F6FD",
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 2,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   tab: {
//     padding: 10,
//     paddingLeft: 50,
//     paddingRight: 50,
//     borderRadius: 5,
//     width: "50%",
//   },
//   errText: {
//     color: "red",
//     fontSize: 12,
//     fontWeight: 700,
//   },
//   activeTab: {
//     backgroundColor: "#fff",
//     padding: 10,
//     paddingLeft: 50,
//     paddingRight: 50,
//     borderRadius: 5,
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 400,
//     color:"black"
//   },
//   loginForm: {
//     marginTop: 20,
//     height: "70%",
//   },
//   field: {
//     marginBottom: 10,
//   },
//   midPart: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   forPass: {
//     color: "#0069CB",
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   remme: {
//     color: "#6C7278",
//   },
//   fnamePart: {
//     flexDirection: "row",
//     gap: 10,
//     justifyContent: "space-between",
//   },
// });

// export default Login;