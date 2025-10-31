import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper"; // Importing the RadioButton from react-native-paper
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "./interceptors";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

function IntroForm() {
  const navigation = useNavigation();

  const { loggedInUserImg, setLoggedInUserImg, loggedInUserName, loggedInUserGender, loggedInUserdob, setLoggedInUserDob, setLoggedInUserGender, setLoggedInUserName } = useContext(UserContext);
  // State for gender selection
  const [name, setName] = useState(loggedInUserName || "");
  const [gender, setGender] = useState(loggedInUserGender || null);
  const [dob, setDob] = useState(
    loggedInUserdob ? new Date(loggedInUserdob) : new Date()
  );

  const [showDate, setShowDate] = useState(false);

  console.log(typeof loggedInUserGender, loggedInUserdob)


  const goBack = () => {
    navigation.goBack();
  };

  const [file, setFile] = useState();



const pickImage = async () => {

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setFile(result.assets[0]);
  }
};


   

  const showToast = (msg) => {
    Toast.show({
      type: "success",
      text2: "Success",
      text1: msg,
      position: "top",
    });
  };

  const showErrToast = (msg) => {
    // ToastAndroid.show(
    //   "Status of the user has been changed.",
    //   ToastAndroid.LONG,
    // );
    Toast.show({
      type: "error",
      text2: "Error",
      text1: msg,
      position: "top",
    });
  };

  const inputRef = useRef();

  const [loading, setLoading] = useState(false)
  const updateAccount = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);
      formData.append("name", name);
      let dateToPass = dob.toISOString().split("T")[0];
        formData.append("dob", dateToPass)
        formData.append("gender", gender);
      if (file) {
        formData.append("files", {
          uri: file.uri,
          name: file.name || "profile.jpg",
          type: file.mimeType || "image/jpeg", // or imageFile.type
        });
      }

      console.log(formData, dob);
      const response = await apiInstance.post(`update-user-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("response of data", response.data);
      if (response.data.status) {
        // logout();
        setLoggedInUserName(name)
        setLoggedInUserDob(dateToPass)
        setLoggedInUserGender(gender)
        await AsyncStorage.setItem("logged_in_user_name", name);
        await AsyncStorage.setItem("logged_in_user_gender", gender);
        await AsyncStorage.setItem("logged_in_user_dob", dateToPass);
        if(response.data.profile_url){
          await AsyncStorage.setItem("logged_in_user_img", response.data.profile_url);
          setLoggedInUserImg(response.data.profile_url)
        }
        goBack();
        showToast("Profile updated successfully!")
      }


    } catch (error) {
      console.log("this is err deactivating", error);
      showErrToast("Unable to update profile!")
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const goToNotifications = () => {
    router.push("/notifications")
  }



  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        <Feather name="arrow-left" size={24}
          color={"#fff"}
          onPress={goBack}
        />
        <Text style={styles.pageName}>Update Profile</Text>
        <View>
          {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} /> */}
        </View>
      </View>
      {/* <ScrollView style={styles.form}> */}

        <View style={{ flex: 1, padding: 20 }}>
          {
            loggedInUserImg && !file
              ?
              <View>
                <Image source={{ uri: loggedInUserImg}} style={styles.img}  contentFit="fill"
             transition={1000}/>
                <TouchableOpacity style={{ backgroundColor: Colors.bg, paddingHorizontal: 7, paddingVertical: 7, position: 'absolute', bottom: -20, left: "45%", borderRadius: 40 }} onPress={pickImage}>
                  <Entypo name="camera" size={24} color={"#fff"} />
                </TouchableOpacity>
              </View>
              :
              file ?
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                  <Image
                    source={{ uri: file.uri }}
                     contentFit="fill"
             transition={1000}
                    style={styles.img}
                  />
                  <TouchableOpacity style={{ backgroundColor: Colors.bg, paddingHorizontal: 7, paddingVertical: 7, position: 'absolute', bottom: -20, borderRadius: 40 }} onPress={() => setFile(null)}>
                    <Entypo name="cross" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                :
                <TouchableOpacity onPress={pickImage} style={styles.upView}>
                  <View style={styles.upIcon}>
                    <FontAwesome6 name="user-tie" size={30} color="#0069cb" />
                  </View>
                  <View style={styles.editBtn}>
                    <EvilIcons name="pencil" size={18} color="#fff" />
                    <Text style={styles.editText}>Edit</Text>
                  </View>
                  <Text style={styles.upText}>Upload Profile Photo</Text>
                </TouchableOpacity>

          }

          <View style={[styles.field, { marginTop: 10 }]}>
            <Text style={Colors.inputlable}>Full Name</Text>
            <TextInput
              placeholder=" Enter your name"
              autoComplete="off"
              style={Colors.inputbox}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.field}>
            <Text style={Colors.inputlable}>Date of Birth</Text>
            <TextInput
              ref={inputRef}
              style={Colors.inputbox}
              placeholder="Date of birth"
              placeholderTextColor="grey"
              value={
                dob
                  ? dob.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : ""
              }
              onFocus={() => {
                inputRef.current?.blur(); // 👈 force blur
                setShowDate(true);
              }}
              showSoftInputOnFocus={false}
            />

            {showDate && (
              <DateTimePicker
                testID="dateTimePickerFrom"
                value={dob || new Date()}
                mode="date"
                // minimumDate={new Date()}
                display="default"
                onChange={(event, selectedDate) => {
                  // setIsFrmError(false);
                  if (event.type === "set" && selectedDate) {
                    // setFrmError((prevState) => ({ ...prevState, dob: false }));
                    console.log(selectedDate)
                    setDob(selectedDate);
                  }
                  setShowDate(false); // ✅ hide regardless, but only after checking the event
                }}
              />
            )}

          </View>
          <View style={styles.genderField}>
            <Text style={Colors.inputlable}>Gender</Text>
            <View style={styles.genderOptions}>
              
              <TouchableOpacity style={styles.radioOption}  onPress={() => setGender("0")}>
                <RadioButton
                  value="male"
                  status={gender == "0" ? "checked" : "unchecked"}
                  onPress={() => setGender("0")}
                  color="#0069cb"
                  uncheckedColor="#0069cb"
                  mode={Platform.OS === 'ios' ? 'ios' : 'android'}
                  
                />
                <Text style={Colors.inputlable} onPress={() => setGender("0")}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioOption}  onPress={() => setGender("10")}>
                <RadioButton
                  value="female"
                  status={gender == "10" ? "checked" : "unchecked"}
                  onPress={() => setGender("10")}
                  color="#0069cb"
                  uncheckedColor="#0069cb"
                />
                <Text
                  style={Colors.inputlable}
                  onPress={() => setGender("10")}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.nextButton}> */}
          <View style={styles.buttonContainer}>
            <ThemeBtn btnTitle={"Update"} loadingBtn={loading} onPress={updateAccount} />
          </View>
        </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent", // No background, to avoid blocking other content
  },
  nextButton: {
    // position: "absolute",
    // bottom: 40, // Position at the bottom of the screen
    // left: 20,
    // right: 20,
    // padding: 20,
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
  topPart: {
    backgroundColor: Colors.bg,
       height:100,
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
    paddingHorizontal: 20
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  img: {
    borderRadius: 80,
    height: 120,
    width: 120,
    alignSelf: 'center'
    // transform: "rotate(45deg)",
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
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
    alignItems: "flex-start",
    marginRight: 20,
    width: '40%',
    justifyContent: 'flex-start',
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#EDF1F3",
    borderRadius: 5,
  },
});

export default IntroForm;
