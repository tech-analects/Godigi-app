import React, { useContext, useState } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
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
  Platform,
  StatusBar,
} from "react-native";
import { Tabs, useRouter } from "expo-router";
import { ImagesPath } from "@/constants/ImagesPath";
import { UserContext } from "../../UserContext";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

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

const Triangle = () => (
  <View
    style={{
      width: 30,
      height: 30,
      backgroundColor:"#fff",
      position: "absolute",
      bottom:19,
      zIndex:-1,
      borderTopLeftRadius:13,
      borderLeftWidth:2,
      borderTopWidth:2,
      borderColor:Colors.bg,
      transform: [{ rotate: "45deg" }]

    }}
  >
    {/* Dot circle */}
    <View
      style={{
        position: "absolute",
        top: 6, // 1.25x of 5 (original)
        left:6,
        alignSelf: "center",
        width: 8.75, // 1.25x of 7
        height: 8.75,
        borderRadius: 4.375, // half of width/height for perfect circle
        backgroundColor: Colors.bg,
      }}
    />
  </View>
);








  return (
    // <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
    //   {/* Tabs (Content of the app) */}
    // </View>
    <>
    <StatusBar barStyle={"light-content"} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.bg,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
          },
          // tabBarStyle: Platform.select({
          //   ios: {
          //     // Use a transparent background on iOS to show the blur effect
          //     // position: "absolute",
          //     backgroundColor: "#fff",
          //     height: 60,
          //     // 🔴 RED BACKGROUND
          //     marginHorizontal: 10,
          //     marginBottom: 20,
          //     borderRadius: 60,
          //     justifyContent: "center",
          //     alignItems: "center",
          //     paddingTop: 10,
          //     overflow: "hidden",
          //     shadowOffset: { width: 2, height: 5 },
          //     shadowColor: "black",
          //     shadowOpacity: 0.02,
          //     elevation: 4,
          //     shadowRadius: 10,
          //   },
          //   android: {
          //     backgroundColor: "#fff",
          //     marginHorizontal: 10,
          //     marginBottom: 20,
          //     // height:50,
          //     borderRadius: 40,
          //     justifyContent: "center",
          //     alignItems: "center",
          //     // paddingTop: 10,
          //     // paddingBottom: 10,
          //     height: 60,
          //     shadowOffset: { width: 0, height: -3 },
          //     shadowColor: "grey",
          //     shadowOpacity: 0.02,
          //     elevation: 4,
          //     shadowRadius: 10,
          //   },
          //   default: {
          //     backgroundColor: "#fff",
          //     marginHorizontal: 10,
          //     marginVertical: 10,
          //     borderRadius: 20,
          //     justifyContent: "center",
          //     alignItems: "center",
          //     paddingTop: 5,
          //   },
          // }),
           tabBarStyle: {
          position: "absolute",   // make it float
          // backgroundColor: "rgba(255,255,255,0.8)", // transparent white
          backgroundColor: "#fff", // transparent white
          bottom:20,
          borderRadius: 40,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          // shadowOffset: { width: 0, height: 5 },
          // shadowColor: "black",
          // shadowOpacity: 0.1,
          // shadowRadius: 8,
          // elevation: 5,
          borderColor:Colors.bg,
          borderWidth:2,
          borderTopWidth:2
        },
          // headerLeft: () => <DrawerButton />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <>
                  <Foundation name="home" size={28} color={color} />
                  {focused && <Triangle />}
                </>
              ) : (
                <Octicons name="home" size={24} color={color} />
              );
            },
            headerTitle: () => (
              <Image
                source={ImagesPath.logoWhite} // <-- change path as needed
                style={{ width: 100, height: 30, resizeMode: "contain" }}
              />
            ),
            headerTitleAlign: "center",
            headerShown: true,
            headerStyle: { backgroundColor: Colors.bg, shadowColor: Colors.bg,height: 100, },
            headerLeft: () => (
              <TouchableOpacity
                // onPress={toggleDrawer}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ paddingHorizontal: 20 }}
              >
                {/* <Entypo name="menu" size={30} color="#fff" /> */}
                <Image source={ImagesPath.menuIcon} />
              </TouchableOpacity>
            ),
            // headerRight: () => (
            //   <TouchableOpacity onPress={goToNotifications} style={styles.icon}>
            //     <Fontisto name="bell" size={22} color="#fff" />
            //     {/* <FontAwesome name="bell" size={18} color="#fff" /> */}
            //   </TouchableOpacity>
            // ),
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
                <>
                  {focused && <Triangle />}
                  <FontAwesome5 name="book-open" size={24} color={color} />
                </>
              ) : (
                <Feather name="book-open" size={24} color={color} />
              );
            },
            headerStyle: {
              height: 100,
              backgroundColor: Colors.bg,
              shadowColor: "#fff",
              // borderBottomLeftRadius: 30,
              // borderBottomRightRadius: 30,
            },
              headerTitleAlign: "center",
           headerTitle: () => (
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>Courses</Text>
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
            // headerRight: () => (
            //   <TouchableOpacity
            //     style={{ paddingHorizontal: 20 }}
            //     onPress={goToNotifications}
            //   >
            //      <Fontisto name="bell" size={22} color="#fff" />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Tabs.Screen
          name="jobs"
          options={{
            title: "Jobs",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <>
                  {focused && <Triangle />}
                  <Entypo name="briefcase" size={24} color={color} />
                </>
              ) : (
                <Ionicons name="briefcase-outline" size={24} color={color} />
              );
            },
            headerStyle: {
              height: 100,
              backgroundColor: Colors.bg,
              shadowColor: "#fff",
              // borderBottomLeftRadius: 30,
              // borderBottomRightRadius: 30,
            },
              headerTitleAlign: "center",
             headerTitle: () => (
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>My Jobs</Text>
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
            //  headerRight: () => (
            //   <TouchableOpacity
            //     style={{ paddingHorizontal: 20 }}
            //     onPress={goToNotifications}
            //   >
            //      <Fontisto name="bell" size={22} color="#fff" />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <>
                  {focused && <Triangle />}
                  <Ionicons name="person-sharp" size={24} color={color} />
                </>
              ) : (
                <FontAwesome6 name="user" size={24} color={color} />
              );
            },
            headerStyle: {
              height: 100,
              backgroundColor: Colors.bg,
              shadowColor: "#fff",
              // borderBottomLeftRadius: 30,
              // borderBottomRightRadius: 30,
            },
              headerTitleAlign: "center",
             headerTitle: () => (
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>Profile</Text>
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
            //  headerRight: () => (
            //   <TouchableOpacity
            //     style={{ paddingHorizontal: 20 }}
            //     onPress={goToNotifications}
            //   >
            //      <Fontisto name="bell" size={22} color="#fff" />
            //   </TouchableOpacity>
            // ),
          }}
        />
      </Tabs>
    </>
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
    // backgroundColor: "rgba(151, 199, 255, 0.32)",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginRight:10
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
