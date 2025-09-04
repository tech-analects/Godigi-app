import React, { useContext, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Tabs, useRouter } from "expo-router";
import { ImagesPath } from "@/constants/ImagesPath";
import { UserContext } from "../../UserContext";
import { DrawerActions, useNavigation } from "@react-navigation/native";

function DrawerButton() {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="menu" size={24} color="black" />
    </Pressable>
  );
}

export default function TabLayout() {
  // const [drawerOpen, setDrawerOpen] = useState(false);
  // const drawerAnim = new Animated.Value(-300); // Start offscreen, assuming drawer width is 300

  // const toggleDrawer = () => {
  //   let status = !drawerOpen ? "open" : "close";
  //   console.log("hello", status);
  //   const toValue = drawerOpen ? -300 : 2800; // Move drawer in or out
  //   setDrawerOpen(!drawerOpen);
  //   Animated.spring(drawerAnim, {
  //     toValue,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const navigation = useNavigation();

  const { setIsLoggedIn } = useContext(UserContext);

  const router = useRouter();

  const goToNotifications=()=>{
    router.push("/notifications")
  }
  return (
    <View style={{ flex: 1 }}>
      {/* Tabs (Content of the app) */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0069CB",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
          },
          // headerLeft: () => <DrawerButton />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Godigi",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <Foundation name="home" size={28} color={color} />
              ) : (
                <Octicons name="home" size={24} color={color} />
              );
            },
            headerTitle: () => (
              <Image
                source={ImagesPath.logoApp} // <-- change path as needed
                style={{ width: 100, height: 30, resizeMode: "contain" }}
              />
            ),
            headerShown: true,
            headerStyle: { backgroundColor: "#fff", shadowColor: "#fff" },
            headerLeft: () => (
              <TouchableOpacity
                // onPress={toggleDrawer}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingHorizontal: 20 }}
              >
                <Image source={ImagesPath.menuIcon} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={goToNotifications} style={styles.icon}>
                <FontAwesome name="bell" size={18} color="#0069CB" />
              </TouchableOpacity>
            ),
          }}
        />
        {/* <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            tabBarIcon: ({ color, focused }) => {
              // Correct way to conditionally render the icon
              return focused ? (
                <FontAwesome name="bookmark" size={24} color={color} />
              ) : (
                <FontAwesome5 name="bookmark" size={24} color={color} />
              );
            },
            headerStyle: { backgroundColor: "#fff" },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, fontWeight: "500" }}
                >
                  Bookmark
                </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                // onPress={toggleDrawer}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingHorizontal: 20 }}
              >
                <Image source={ImagesPath.menuIcon} />
              </TouchableOpacity>
            ),
          }}
        /> */}

        <Tabs.Screen
          name="courses"
          options={{
            title: "Courses",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <FontAwesome5 name="book-open" size={24} color={color} />
              ) : (
                <Feather name="book-open" size={24} color={color} />
              );
            },
            headerStyle: { backgroundColor: "#fff" },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, fontWeight: "500" }}
                >
                  Courses
                </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                // onPress={toggleDrawer}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingHorizontal: 20 }}
              >
                <Image source={ImagesPath.menuIcon} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="jobs"
          options={{
            title: "Jobs",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <Entypo name="briefcase" size={24} color={color} />
              ) : (
                <Ionicons name="briefcase-outline" size={24} color={color} />
              );
            },
            headerStyle: { backgroundColor: "#fff" },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, fontWeight: "500" }}
                >
                  My Jobs
                </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                // onPress={toggleDrawer}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingHorizontal: 20 }}
              >
                <Image source={ImagesPath.menuIcon} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <Ionicons name="person-sharp" size={24} color={color} />
              ) : (
                <FontAwesome6 name="user" size={24} color={color} />
              );
            },
            headerStyle: {
              backgroundColor: "#fff",
              shadowColor: "transparent",
              elevation: 0,
            },
            headerTitle: () => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, fontWeight: "500" }}
                >
                  Profile
                </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                // onPress={toggleDrawer}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingHorizontal: 20 }}
              >
                <Image source={ImagesPath.menuIcon} />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
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
  menuIcons: {
    width: 20,
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "rgba(151, 199, 255, 0.32)",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginRight:20
  },
  options: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
  },
  rightTop: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    gap: 10,
    paddingHorizontal: 10,
  },
  line: {
    marginVertical: 20,
    marginTop: 20,
    width: "90%",
    borderColor: "#EDF1F3",
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
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
    color: "#0069cb",
    fontSize: 13,
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
});
