import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ImagesPath } from "@/constants/ImagesPath";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

function Notifications() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const notifications = [
    {
      id: 1,
      message:
        "Beats want to take a final interview of you where head of HR....more",
      time: "3.30 am",
      flag: "today",
      img: "beats",
    },
    {
      id: 2,
      message:
        "TCS want to take a final interview of you where head of HR....more",
      time: "3.30 am",
      flag: "today",
      img: "tcs",
    },
    {
      id: 3,
      message: "New message received.",
      time: "3.30 am",
      flag: "today",
      img: "fb",
    },
    {
      id: 4,
      message: "Your application was viewed.",
      time: "3.30 am",
      flag: "yesterday",
      img: "tcs",
    },
    {
      id: 5,
      message: "Your password has been changed.",
      time: "3.30 am",
      flag: "yesterday",
      img: "tcs",
    },
    {
      id: 6,
      message:
        "Beats want to take a final interview of you where head of HR....more",
      time: "3.30 am",
      flag: "yesterday",
      img: "beats",
    },
    {
      id: 7,
      message: "Your password has been changed.",
      time: "3.30 am",
      flag: "yesterday",
      img: "fb",
    },
    {
      id: 8,
      message: "Your password has been changed.",
      time: "1.30 am",
      flag: "today",
      img: "beats",
    },
  ];

  // Separate notifications based on the flag (today or yesterday)
  const todayNotifications = notifications.filter(
    (item) => item.flag === "today"
  );
  const yesterdayNotifications = notifications.filter(
    (item) => item.flag === "yesterday"
  );

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image style={styles.img} source={ImagesPath[item.img]} />
      <View style={styles.notiView}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        <Feather name="arrow-left" size={24} 
            color="#fff"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Notifications</Text>
          <View>
          </View>
      </View>

      {/* Today Notifications */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Today</Text>
      </View>
      <Animated.FlatList
        entering={FadeInDown.duration(500).delay(200)}
        data={todayNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Yesterday Notifications */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionText}>Yesterday</Text>
      </View>
      <Animated.FlatList
        entering={FadeInDown.duration(500).delay(200)}
        data={yesterdayNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    flex: 1,
    backgroundColor: "#fafafd",
  },
  notiView: {
    width: "80%",
  },
    topPart: {
    backgroundColor: Colors.bg,
    // backgroundColor: "red",
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
    paddingHorizontal:20
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#fff"
  },
  sectionTitle: {
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: "#fafafd",
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationItem: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  img: {
    width: 40,
    height: 40,
  },
  notificationMessage: {
    fontSize: 13,
    fontWeight: "500",
    color: "#676767",
  },
  notificationTime: {
    fontSize: 12,
    color: "#676767",
    // marginTop: 2,
    textAlign: "right",
  },
});

export default Notifications;
