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
import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserContext } from "../../UserContext";
import Animated, { FadeInDown } from "react-native-reanimated";

function Profile() {
  const router = useRouter();

  const { logout } = useContext(UserContext);

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

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        <View style={styles.rightTop}>
          <View style={styles.imgBg}>
            <Image source={ImagesPath.human} style={styles.img} />
            <Text style={styles.numPercent}>25%</Text>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>Rakesh Saini</Text>
            <Text style={styles.role}>UI/UX Developer</Text>
          </View>
        </View>
        <View style={styles.leftTop}>
          <FontAwesome
            name="pencil"
            size={24}
            onPress={goToIntroForm}
            color="#0069cb"
          />
        </View>
      </View>
      <Animated.ScrollView entering={FadeInDown.duration(500)}style={styles.prfBg} >
        <TouchableOpacity onPress={goToBasicDetailsForm} style={styles.prfBtn}>
          <View style={styles.right}>
            <AntDesign name="user" size={24} color="#0069cb" />
            <Text style={styles.btnTitle}>Basic details</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={goToProjDetailsForm} style={styles.prfBtn}>
          <View style={styles.right}>
            <Entypo name="pie-chart" size={24} color="#0069cb" />
            <Text style={styles.btnTitle}>Projects</Text>
          </View>
          <View style={styles.left}>
            <AntDesign name="plus" size={22} color="#0069cb" />
            <Text style={styles.add}>Add</Text>
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
            {/* <AntDesign name="filetext1" size={24} color="#0069cb" /> */}
            <Ionicons name="log-out" size={28} color="#ff4d4f" />
            <Text style={[styles.btnTitle, { color: "red" }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  btnTitle: {
    color: "black",
    fontWeight: 500,
    fontSize: 16,
  },
  add: {
    color: "#0069cb",
    fontWeight: 500,
    fontSize: 16,
  },
  right: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
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
    margin: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  prfBg: {
    backgroundColor: "#fafafd",
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 50,
  },
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  nameView: {
    gap: 5,
  },
  role: {
    color: "#0069cb",
    fontSize: 15,
    fontWeight: 600,
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
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingVertical: 10,
    paddingBottom: 30,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: "grey",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },

  imgBg: {
    borderRadius: 40,
    padding: 7,
    borderTopWidth: 2, // Top border width
    borderRightWidth: 2, // Right border width
    borderBottomWidth: 2, // Bottom border width
    borderLeftWidth: 2, // Left border width
    borderTopColor: "lightgrey", // Top border in red
    borderRightColor: "lightgrey", // Right border in green
    borderBottomColor: "lightgrey", // Bottom border in blue
    borderLeftColor: "#0069cb", // Left border in blue
    transform: [{ rotate: "-45deg" }],
  },
  rightTop: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    gap: 20,
    paddingHorizontal: 30,
  },
  leftTop: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    borderRadius: 50,
    height: 60,
    width: 60,
    transform: "rotate(45deg)",
  },
});

export default Profile;
