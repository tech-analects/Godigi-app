import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserContext } from "../../UserContext";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import ThemeBtn from "@/components/ThemeBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "@/app/interceptors";
import { Image } from 'expo-image';

function Profile() {
  const router = useRouter();

  const [isSuccessModalOpen,setIsSuccessModalOpen] = useState(false)
  const { logout,loggedInUserName,loggedInUserImg } = useContext(UserContext);
  console.log(loggedInUserImg)

  const handleBuyCourse = () => {
  const url = "exp://192.168.1.17:8082/--/buyCourse?courseId=3&isPurchased=true"
  Linking.openURL(url).catch(err => 
    console.error("Failed to open URL:", err)
  );
};

  const goToIntroForm = () => {
    router.push("/introForm");
  };

  const goToBasicDetailsForm = () => {
    router.push("/basicDetails");
  };

  const goToProfSumm = () => {
    router.push("/profSummary");
  };

  const goToProfDetails = () => {
    router.push("/proffessionalDetails");
  };

  const goToWorkExpForm = () => {
    router.push("/workExpForm");
  };

  const goToProjDetailsForm = () => {
    router.push("/projDetailsForm");
  };
  const goToPassChangeForm = () => {
    router.push("/changePass");
    // Linking.openURL('exp://192.168.1.19:8081/--/home')
  };
  // const goToPassChangeForm = () => {
  //   router.push("/changePass");
  // };

  const goToSkillsForm = () => {
    router.push("/skillsDetails");
  };

  const goToEdu = () => {
    router.push("/(auth)/education");
  };

  const goToCerti = () => {
    router.push("/certificateDetails");
  };

  const goToResume = () => {
    router.push("/resume");
  };

  const goToVideo = () => {
    router.push("/introVid");
  };

    const [loading,setLoading] = useState(false)

const deactivateAccount = async () => {
     try {
         setLoading(true);
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);

       const response = await apiInstance.post(`deactive-account`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });

       if(response.data.status){
        logout();
       }
       
     } catch (error) {
       console.log("this is err deactivating", error);
     } finally {
       setLoading(false);
     }
   };

   const successModal = (
      <Modal
        visible={isSuccessModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalText1}>
              Are you sure you want to delete the account?
            </Text>
              <Text style={styles.modalText}>
                This is will remove all your data from our system.
          </Text>
           <View style={{flexDirection:"row",gap:20,justifyContent:'space-between',marginTop:40}}>
            
            <TouchableOpacity onPress={deactivateAccount} disabled={loading} style={[styles.btn,{backgroundColor:'#ff4d4f',opacity:loading ? 0.5 : 1}]}>
             
              {loading ? <ActivityIndicator color={"#fff"}/> : <Text style={[styles.btnText,{color:'white'}]}>Delete</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSuccessModalOpen(false)} style={styles.btn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
    );

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        <View style={styles.rightTop}>
          <View style={styles.imgBg}>
            {
              loggedInUserImg 
              ?
              <Image source={{uri:loggedInUserImg}} style={styles.img} 
               contentFit="fill"
             transition={1000}
              />
              :
              <Image source={ImagesPath.human} style={styles.img}  contentFit="fill"
             transition={1000}/>
            }
            {/* <Text style={styles.numPercent}>25%</Text> */}
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>{loggedInUserName || "User"}</Text>
            {/* <Text style={styles.role}>UI/UX Developer</Text> */}
             {/* <FontAwesome
            name="pencil"
            size={24}
            onPress={goToIntroForm}
            color={Colors.bg}
          /> */}
          </View>
        </View>
        {/* <View style={styles.leftTop}>
          <FontAwesome
            name="pencil"
            size={24}
            onPress={goToIntroForm}
            color={Colors.bg}
          />
        </View> */}
      </View>
      <Animated.ScrollView entering={FadeInDown.duration(500)}style={styles.prfBg} >
        {/* <TouchableOpacity onPress={goToBasicDetailsForm} style={styles.prfBtn}>
          <View style={styles.right}>
            <AntDesign name="user" size={24}  color={Colors.bg} />
            <Text style={styles.btnTitle}>Basic details</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22}  color={Colors.bg} />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={goToVideo} style={styles.prfBtn}>
          <View style={styles.right}>
            <AntDesign name="videocamera" size={22} color="#0069cb" />
            <Text style={styles.btnTitle}>Intro Video</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.prfBtn} onPress={goToProfSumm}>
          <View style={styles.right}>
            <AntDesign name="file1" size={24} color="#0069cb" />
            <Text style={styles.btnTitle}>Profile Summary</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.prfBtn} onPress={goToProfDetails}>
          <View style={styles.right}>
            <Ionicons name="cube-outline" size={24} color="#0069cb" />
            <Text style={styles.btnTitle}>Proffesional Details</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={goToWorkExpForm} style={styles.prfBtn}>
          <View style={styles.right}>
            <Ionicons name="briefcase-outline" size={22} color="#0069cb" />
            <Text style={styles.btnTitle}>Work Experience</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={goToEdu} style={styles.prfBtn}>
          <View style={styles.right}>
            <Feather name="book-open" size={22} color="#0069cb" />
            <Text style={styles.btnTitle}>Education</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={goToSkillsForm} style={styles.prfBtn}>
          <View style={styles.right}>
            <Ionicons name="bulb-outline" size={24} color="#0069cb" />
            <Text style={styles.btnTitle}>Key Skills</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={goToProjDetailsForm} style={styles.prfBtn}>
          <View style={styles.right}>
            <Entypo name="pie-chart" size={24}  color={Colors.bg} />
            <Text style={styles.btnTitle}>Career Details</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22}  color={Colors.bg} />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={goToIntroForm} style={styles.prfBtn}>
          <View style={styles.right}>
         <FontAwesome name="user" size={24}  color={Colors.bg} />
          </View>
          <View style={styles.left}>
            <Text style={styles.btnTitle}>Update profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToPassChangeForm} style={styles.prfBtn}>
          <View style={styles.right}>
           <Entypo name="key" size={24}  color={Colors.bg} />
          </View>
          <View style={styles.left}>
            <Text style={styles.btnTitle}>Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setIsSuccessModalOpen(true)} style={styles.prfBtn}>
          <View style={styles.right}>
         <FontAwesome5 name="user-slash" size={20}  color={Colors.bg} />
          </View>
          <View style={styles.left}>
            <Text style={styles.btnTitle}>Delete Account</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={goToCerti} style={styles.prfBtn}>
          <View style={styles.right}>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={24}
              color="#0069cb"
            />
            <Text style={styles.btnTitle}>Certifications</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={goToResume} style={styles.prfBtn}>
          <View style={styles.right}>
            <AntDesign name="filetext1" size={24} color="#0069cb" />
            <Text style={styles.btnTitle}>Resume</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity> */}
          <TouchableOpacity onPress={logout} style={styles.prfBtn}>
          <View style={styles.right}>
           <Ionicons name="log-out" size={28} color="#ff4d4f" />
          </View>
          <View style={styles.left}>
          <Text style={[styles.btnTitle, { color: "red" }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </Animated.ScrollView>
      {successModal}
    </View>
  );
}

const styles = StyleSheet.create({
   modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  btn:{
    padding:10,
    width:"40%",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"lightgray",
    borderRadius:10
  },
  btnText:{
    fontWeight:600,
    fontSize:14,
    color:'black'
  },
   modalText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#6C7278",
  },
   modalText1: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight:600,
    fontSize:18,
    color: Colors.bg,
  },
  modalContent: {
    backgroundColor: "#fff",
    justifyContent:'center',
    alignItems:'center',
    padding: 40,
    borderRadius: 30,
    width: "90%",
    height: "40%",
  },
  bgMain: {
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
  btnTitle: {
    color: "black",
    fontWeight: 500,
    fontSize: 16,
  },
  add: {
     color:Colors.bg,
    fontWeight: 500,
    fontSize: 16,
  },
  right: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    width:'10%',
    justifyContent:'center'
  },
  left: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  prfBtn: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap:10,
    shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#e2e2e2",
  },
  prfBg: {
    backgroundColor: "#fafafd",
    flex: 1,
    paddingBottom: 50,
    paddingTop:20
  },
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  nameView: {
    gap: 30,
    flexDirection:'row',
    alignItems:'center',
    
  },
  role: {
    color: Colors.bg,
    fontSize: 13,
    fontWeight: 600,
    textAlign:"center"
  },
  numPercent: {
    backgroundColor: "#fff",
    position: "absolute",
    left: -10,
    bottom: 0,
    color: "#000",
    fontSize: 10,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    fontWeight: "bold",
    transform: "rotate(45deg)",
  },
  topPart: {
    backgroundColor: "#fafafd",
    paddingVertical: 20,
    // height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 0.4,
    // borderBottomColor: "grey",
    // shadowColor: "grey",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 5,
  },

  imgBg: {
    borderRadius: 400,
    padding: 7,
    borderTopWidth: 2, // Top border width
    borderRightWidth: 2, // Right border width
    borderBottomWidth: 2, // Bottom border width
    borderLeftWidth: 2, // Left border width
    // borderTopColor: "lightgrey", // Top border in red
    // borderRightColor: "lightgrey", // Right border in green
    // borderBottomColor: "lightgrey", // Bottom border in blue
    borderColor: Colors.bg, // Left border in blue
    transform: [{ rotate: "-45deg" }],
  },
  rightTop: {
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    gap: 10,
    paddingHorizontal: 30,
  },
  leftTop: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    borderRadius: 50,
    height: 100,
    width: 100,
    transform: "rotate(45deg)",
  },
});

export default Profile;
