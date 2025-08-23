  import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
  import { useNavigation, useRouter } from "expo-router";
  import React from "react";
  import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform,
  } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
  import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // make sure you install this

  const tasks = [
    {
      id: "1",
      title: "Create Responsive Design",
      icon: "responsive",
      topic: "HTML, CSS",
      lastValid: "2025-08-31",
    },
    {
      id: "2",
      title: "Add Icons to Navigation",
      icon: "image",
      topic: "React Native",
      lastValid: "2025-08-25",
    },
    {
      id: "3",
      title: "Improve UI Layout",
      icon: "palette",
      topic: "JS, UI/UX",
      lastValid: "2025-09-01",
    },
  ];


  const router = useRouter();
  const goToTaskDetails=()=>{
    router.push("/taskDetails")
  }

  export default function Tasks() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={goToTaskDetails}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={28} color={Colors.bg} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.topic}>{item.topic}</Text>
        <Text style={styles.date}>{item.lastValid}</Text>
      </View>
    </TouchableOpacity>
  );


    const navigation = useNavigation();
    const goBack=()=>{
      navigation.goBack();
    }

    return (
      <View style={styles.container}>
        <View style={styles.topPart}>
          <View style={styles.leftside}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              onPress={goBack}
            />
            <Text style={styles.pageName}>Tasks</Text>
          </View>
        </View>
        <Animated.FlatList
          data={tasks}
          entering={FadeInDown.duration(500).delay(200)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ margin: 20 }}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fafafd",
    },
    topic: {
      color: "gray",
      fontSize: 14,
      fontWeight: 700,
    },
    topPart: {
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 20,
      shadowColor: "lightgrey",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.85,
      shadowRadius: 2,
      elevation: 5,
      borderBottomColor: "lightgrey",
      borderBottomWidth: 0.5,
      paddingTop: Platform.OS === "android" ? 50 : 50,
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
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 12,
      color: "#111827",
    },
    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 14,
      gap: 10,
      marginBottom: 12,
      alignItems: "center",
      elevation: 3,
      shadowColor: "gray",
      shadowOpacity: 1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    iconContainer: {
      backgroundColor: "#EEF2FF",
      padding: 10,
      borderRadius: 10,
      marginRight: 14,
    },
    details: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#111827",
      marginBottom: 4,
    },
    date: {
      fontSize: 12,
      color: "#6B7280",
      fontWeight: 700,
    },
  });
