import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, Feather, Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Linking, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { WebView } from "react-native-webview";
import apiInstance from "./interceptors";
import Toast from "react-native-toast-message";


export default function DashIntern() {
  const router = useRouter();

  const [showButton, setShowButton] = useState(false);
  const [htmldata, setHtmldata] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [buying, setBuying] = useState(false);
  const [name, setName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [coursesArray, setCoursesArray] = useState([]);
  const [price, setPrice] = useState("00");
  const [wd, setWd] = useState("70%");
  const [err, setErr] = useState(false);

  const getInternDashData = async () => {
    try {
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);

      console.log(formData);
      const response = await apiInstance.post(
        `internship-dashboard`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("response of view api data", response.data);
      if (response.data.status) {
        setHtmldata(response.data.data.descriptions)
      }
    } catch (error) {
      console.log("this is err ", error);
    }
  };

  useEffect(() => {
    getInternDashData();
    getCoursesListing();
    setPreValues();
  }, [])

  const setPreValues = async () => {
    const userEmail = await AsyncStorage.getItem("logged_in_user_email");
    const userName = await AsyncStorage.getItem("logged_in_user_name");
    setName(userName)
    setEmail(userEmail)
  }

  const handlePrice = async (id) => {
    console.log(id)
    setPrice(id.price)
  }


  const { width } = useWindowDimensions();

  const htmlContentDesc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style>
  body {
    font-family: -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 14px;
    color: #333;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;   /* ✅ stops horizontal scroll */
  }
  .container {
    width: 100% !important;   /* ✅ container takes full screen width */
    max-width: 100% !important;
    box-sizing: border-box;
  }
  img, iframe, table {
    max-width: 100% !important; /* ✅ scale media correctly */
    height: auto !important;
  }
</style>

      </head>
      <body>${htmldata || "Description not provided"}</body>
    

    </html>
  `;


  const goToNotifications = () => {
    router.push("/notifications")
  }

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const getCoursesListing = async () => {
    try {
      //  setLoadingData(true);
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);

      console.log(formData);
      const response = await apiInstance.post(`course/list`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("response of data", response.data);
      if (response.data.status) {
        let dataOfTheCourses = response.data.data;
        const mappedCourses = dataOfTheCourses.map((item) => ({
          label: item.title,
          value: item.id,
          price: item.internship_price,
        }));
        console.log(mappedCourses)
        setCoursesArray(mappedCourses)
      }

    } catch (error) {
      console.log("this is err form adlist", error);
    } finally {
      //  setLoadingData(false);
    }
  };


  const openBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url); // opens in default browser
    } else {
      console.log("Can't open this URL:", url);
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

  const handleBuyCourse = async () => {

    try {
      if(!selectedCourse){
        setErr(true);
      }
      setBuying(true)
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      // formdata.append("order_reference_type", "course");
      formdata.append("course_id", selectedCourse);
      // formdata.append("order_from", "android");
      console.log(formdata)
      const response = await apiInstance.post(`course/generate-internship-payment-url/${selectedCourse}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data)
      if (response.data.status) {
        // goToPaymentScreen(response.data.payUrl)
        // goToUrl(response.data.payUrl)
        openBrowser(response.data.data.payment_url);
        setModalOpen(false)
      }
      // goToPaymentScreen("https://www.godigiinfotech.com/transaction-success-app")
    } catch (error) {
      console.log(error)
    }
    finally {
      setBuying(false);
    }
  }

  const successModal = (
    <Modal
      visible={modalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { height: wd, }]}>
          <View style={{justifyContent:'space-between'}}>
            <Entypo name="cross" size={24} color="black" style={{alignSelf:'flex-end'}} onPress={()=>{setModalOpen(false);setPrice('00');setSelectedCourse('')}}/>
            <View style={{height:'100%'}}>
              <View style={styles.field}>
              <Text style={Colors.inputlable}>Email</Text>
              <TextInput
                placeholder=" Enter your Email ID"
                autoComplete="off"
                editable={false}
                onFocus={() => console.log("focused")}
                keyboardType="email-address"
                placeholderTextColor={"gray"}
                style={[Colors.inputbox, { backgroundColor: "lightgrey", borderWidth: 0 }]}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  //  setFrmError((prev) => ({ ...prev, email: false }));
                  //  setErr(false);
                }}


              />
            </View>
            <View style={styles.field}>
              <Text style={Colors.inputlable}>Name</Text>
              <TextInput
                placeholder=" Enter Name"
                autoComplete="off"
                onFocus={() => console.log("focused")}
                placeholderTextColor={"gray"}
                style={[Colors.inputbox, { backgroundColor: "lightgrey", borderWidth: 0 }]}
                value={name}
                editable={false}
                onChangeText={(text) => {
                  setName(text);
                  //  setFrmError((prev) => ({ ...prev, email: false }));
                  //  setErr(false);
                }}


              />
            </View>
            <View style={styles.field}>
              <Text style={Colors.inputlable}>In which Technology are you interested?</Text>
              <View style={styles.pickerWrapper}>
                <Dropdown
                  containerStyle={{ backgroundColor: "#f8fafc", borderRadius: 20 }}
                  inputSearchStyle={{ marginTop: 5, borderRadius: 15 }}
                  // style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  // placeholderStyle={styles.placeholderStyle}
                  // selectedTextStyle={styles.selectedTextStyle}
                  // inputSearchStyle={styles.inputSearchStyle}
                  // iconStyle={styles.iconStyle}
                  placeholder="--Choose--"
                  placeholderStyle={{ color: "grey" }}
                  data={coursesArray}
                  onFocus={() => setWd("75%")}
                  onBlur={() => setWd("70%")}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  // placeholder={!isFocus ? "Select item" : "..."}
                  searchPlaceholder="Search..."
                  // value={value}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedCourse(item.value);
                    handlePrice(item)
                    setErr(false)
                  }}
                />
              </View>
            </View>

                {
                  err &&
            <Text style={{ textAlign: 'left', fontWeight: 600,marginTop:-5,color:'red', fontSize: 12 }}>Select course.</Text>
                }
            <Text style={{ textAlign: 'left',marginTop:10, fontWeight: 700, fontSize: 18 }}>Total: Rs. {price}/-</Text>
            </View>
             

            <ThemeBtn
              btnTitle={"Pay & Subscribe"}
              onPress={handleBuyCourse}
              loadingBtn={buying}
              />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
       <Feather name="arrow-left" size={24} 
            color="#fff"
            onPress={goBack}
          />
        <Text style={styles.pageName}>Apply Internship</Text>
        <View>
          {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} /> */}
        </View>
      </View>
      <WebView
        source={{ html: htmlContentDesc }}
        style={styles.webview}
        startInLoadingState
        javaScriptEnabled={true}
        domStorageEnabled={true}

      />




      {successModal}
      <View style={styles.btnView}>
        <ThemeBtn
          btnTitle={"Apply Now"}
          onPress={() => setModalOpen(true)}
        // loadingBtn={loadingApply}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnView: {
    position: "absolute",
    bottom: 0,
    padding: 5,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "#fff",
    paddingBottom: Platform.OS == "android" ? 40 : 50,
  },
    buttonContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent", // No background, to avoid blocking other content
  },
  webview: {
    flex: 1,
  },
  buttonWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: Platform.OS == "android" ? 50 : 60,
    backgroundColor: Colors.bg,
       height:100,
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
    overflow: 'scroll',
    paddingTop: 60
  },
  field: {
    marginBottom: 10,
  },
  pickerWrapper: {
    // width: 200, // Set width for the picker wrapper
    height: 40, // Set height for the wrapper
    padding: 10,
    justifyContent: "center",
    borderWidth: 1, // Apply border
    borderColor: "lightgrey", // Set border color
    borderRadius: 8, // Optional: round the corners
    overflow: "hidden", // Hide any overflow (especially important for iOS)
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    // backgroundColor:'red'
  },
});
