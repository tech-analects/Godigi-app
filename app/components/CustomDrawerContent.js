import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserContext } from "../UserContext";

export default function CustomDrawerContent({ navigation }) {
  const router = useRouter();
  const goToScreen = (path) => {
    router.push(path);
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

  const {logout,loggedInUserName} = useContext(UserContext);

  return (
    <DrawerContentScrollView>
      {/* Profile Section */}
      <View style={styles.topSection}>
        <View style={styles.rightTop}>
          <View style={[styles.imgBg, { borderColor: Colors.bg }]}>
            <Image source={ImagesPath.human} style={styles.img} />
            <Text style={styles.numPercent}>25%</Text>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>{loggedInUserName || "User"}</Text>
            <Text style={[styles.role, { color: Colors.bg }]}>
              UI/UX Developer
            </Text>
          </View>
        </View>
        <Entypo
          name="cross"
          size={22}
          color={Colors.bg}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </View>

      <View style={styles.hr} />
      <DrawerItem
        {...itemStyles}
        label="Plans"
        onPress={() => goToScreen("planScreen")}
        icon={({ size }) => (
          <MaterialIcons name="subscriptions" size={size} color={Colors.bg} />
        )}
      />

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
          <MaterialIcons name="computer" size={24} color={Colors.bg}/>
        )}
      />
        <DrawerItem
          {...itemStyles}
          label="Bookmarks"
          onPress={() => goToScreen("bookmarks")}
          icon={({ size }) => (
             <FontAwesome name="bookmark" size={size} color={Colors.bg} />
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

      <DrawerItem
        {...itemStyles}
        label="Help"
        onPress={() => goToScreen("feedback")}
        icon={({ size }) => (
          <Entypo name="message" size={size} color={Colors.bg} />
        )}
      />

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
  );
}

const styles = StyleSheet.create({
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
    padding: 7,
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
