import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { Entypo, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {  Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'expo-image';
import { UserContext } from "../UserContext";

export default function CustomDrawerContent({ navigation }) {
  const router = useRouter();
  const goToScreen = (path) => {
    if(path == "courses"){
      router.push({
        pathname:path,
        params:{my:true}
      });
    }
    else{
      router.push(path)
    }
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const goToTabsScreen = (path) => {
    console.log(path)
    router.push(path);
    // navigation.dispatch(DrawerActions.closeDrawer());
  };

  const itemStyles = {
    labelStyle: { fontSize: 15, fontWeight: "600", color: "#333" },
    style: { backgroundColor: "transparent" },
  };

  const { logout, loggedInUserName,loggedInUserImg,isUserOfflineStudent } = useContext(UserContext);

  const goToUrl = async (url) => {
    try {
      const supported = await Linking.canOpenURL(`https://${url}`);

      if (supported) {
        await Linking.openURL(`https://${url}`);
      } else {
        Alert.alert("Error", `Can't open this URL: ${url}`);
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };


  return (
    <>
      <DrawerContentScrollView>
        {/* Profile Section */}
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.rightTop} onPress={() => goToScreen("profile")}>
            <View style={[styles.imgBg, { borderColor: Colors.bg }]}>
              {
                loggedInUserImg
                ?
                <Image source={{uri:loggedInUserImg}} style={styles.img}  contentFit="fill"
             transition={1000}/>
                :
                <Image source={ImagesPath.human} style={styles.img}  contentFit="fill"
             transition={1000}/>
              }
              {/* <Text style={styles.numPercent}>25%</Text> */}
            </View>
            <View style={styles.nameView} >
              <Text style={styles.name}>{loggedInUserName || "User"}</Text>
              {/* <Text style={[styles.role, { color: Colors.bg }]}>
                UI/UX Developer
              </Text> */}
            </View>
          </TouchableOpacity>
          <Entypo
            name="cross"
            size={22}
            color={Colors.bg}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          />
        </View>

        <View style={styles.hr} />
        {/* <DrawerItem
        {...itemStyles}
        label="Plans"
        onPress={() => goToScreen("planScreen")}
        icon={({ size }) => (
          <MaterialIcons name="subscriptions" size={size} color={Colors.bg} />
        )}
      /> */}

        {/* Drawer Items */}
        <DrawerItem
          {...itemStyles}
          label="My Courses"
          onPress={() => goToScreen("courses")}
          icon={({ size }) => (
            <FontAwesome5 name="book-open" size={20} color={Colors.bg} />
          )}
        />
        <DrawerItem
          {...itemStyles}
          label="Matching Jobs"
          onPress={() => goToScreen("jobs")}
          icon={({ size }) => (
            <Entypo name="briefcase" size={24} color={Colors.bg} />
          )}
        />
        <DrawerItem
          {...itemStyles}
          label="Matching Internships"
          onPress={() => goToScreen("internships")}
          icon={({ size }) => (
            <MaterialIcons name="computer" size={24} color={Colors.bg} />
          )}
        />
        <DrawerItem
          {...itemStyles}
          label="Bookmarks"
          onPress={() => goToScreen("bookmarks")}
          icon={({ size }) => (
            <FontAwesome name="bookmark" size={size} color={Colors.bg} style={{ paddingLeft: 5 }} />
          )}
        />
        <DrawerItem
          {...itemStyles}
          label="Notes"
          onPress={() => goToScreen("notes")}
          icon={({ size }) => (
            <Entypo name="text" size={size} color={Colors.bg} />
          )}
        />
        {/* <DrawerItem
        {...itemStyles}
        label="Exams"
        onPress={() => goToScreen("exams")}
        icon={({ size }) => (
          <MaterialIcons name="assignment" size={size} color={Colors.bg} />
        )}
      /> */}
        <DrawerItem
          {...itemStyles}
          label="Interview Questions"
          onPress={() => goToScreen("interviewQuestions")}
          icon={({ size }) => (
            <Ionicons name="help-circle" size={size} color={Colors.bg} />
          )}
        />
        {
          isUserOfflineStudent == 1 &&
          <DrawerItem
            {...itemStyles}
            label="Feedback"
            onPress={() => goToScreen("feedback")}
            icon={({ size }) => (
             <MaterialIcons name="feedback" size={size}  color={Colors.bg} />
            )}
          />

        }
        <DrawerItem
          {...itemStyles}
          label="Join Internship"
          onPress={() => goToScreen("dashIntern")}
          icon={({ size }) => (
          <FontAwesome6 name="laptop-code" size={20} color={Colors.bg} />
          )}
        />
        {/* <DrawerItem
        {...itemStyles}
        label="Class Updates"
        onPress={() => goToScreen("classUpdates")}
        icon={({ size }) => (
          <Ionicons name="school" size={size} color={Colors.bg} />
        )}
      />
      <DrawerItem
        {...itemStyles}
        label="Tasks"
        onPress={() => goToScreen("tasks")}
        icon={({ size }) => (
          <Ionicons name="checkmark-done" size={size} color={Colors.bg} />
        )}
      />
      <DrawerItem
        {...itemStyles}
        label="Installments"
        onPress={() => goToScreen("installments")}
        icon={({ size }) => (
          <MaterialIcons name="payments" size={size} color={Colors.bg} />
        )}
      /> */}

        {/* <DrawerItem
        {...itemStyles}
        label="Help"
        onPress={() => goToScreen("feedback")}
        icon={({ size }) => (
          <Entypo name="message" size={size} color={Colors.bg} />
        )}
      /> */}

        <DrawerItem
          {...itemStyles}
          label="Logout"
          onPress={logout}
          icon={({ size }) => (
            <Ionicons name="log-out" size={28} color="#ff4d4f" />
          )}
          labelStyle={{ fontSize: 15, fontWeight: "600", color: "#ff4d4f" }}
        />
      </DrawerContentScrollView>
      <View style={styles.btPart}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.instagram.com/godigiinfotech")}
        >
          <Image
            source={ImagesPath.insta}
            style={{ width: 30, height: 30 }}
             contentFit="fill"
             transition={1000}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.facebook.com/godigiinfotech")}
        >
          <Image
            source={ImagesPath.fb}
            style={{ width: 30, height: 30 }}
             contentFit="fill"
             transition={1000}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.linkedin.com/company/godigi-infotech/")}
        >
          <Image
            source={ImagesPath.linkedin}
            style={{ width: 30, height: 30 }}
            contentFit="fill"
             transition={1000}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.youtube.com/@godigiinfotech")}
        >
          <Image
            source={ImagesPath.yt}
            style={{ width: 30, height: 30 }}
             contentFit="fill"
             transition={1000}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.godigiinfotech.com/?source=mobile_app")}
        >
          <Image
            source={ImagesPath.logo}
            style={{ width: 30, height: 30 }}
             contentFit="fill"
             transition={1000}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btPart: {
    // width:"100%",
    // height:50,
    padding: 10,
    paddingHorizontal:10,
    paddingBottom:40,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  hr: {
    borderColor: "lightgray",
    borderWidth: 0.5,
    marginVertical: 20,
  },
  rightTop: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    gap: 10,
    paddingHorizontal: 10,
  },
  imgBg: {
    borderRadius: 40,
    padding: 4,
    borderWidth: 2,
    transform: [{ rotate: "-45deg" }],
  },
  img: {
    borderRadius: 50,
    height: 60,
    width: 60,
    transform: "rotate(45deg)",
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  nameView: {
    gap: 5,
  },
  role: {
    fontSize: 13,
    fontWeight: "600",
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
});
