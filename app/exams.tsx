import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Exams() {
  const examsData = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      icon: "language-javascript",
      color: "#F0DB4F",
      questions: 50,
      duration: "60 min",
      priceType: "Paid",
    },
    {
      id: "2",
      title: "HTML Basics",
      icon: "language-html5",
      color: "#E44D26",
      questions: 40,
      duration: "45 min",
      priceType: "Free",
    },
    {
      id: "3",
      title: "CSS Mastery",
      icon: "language-css3",
      color: "#264DE4",
      questions: 45,
      duration: "50 min",
      priceType: "Paid",
    },
    {
      id: "4",
      title: "React.js Advanced",
      icon: "react",
      color: "#61DBFB",
      questions: 60,
      duration: "90 min",
      priceType: "Paid",
    },
    {
      id: "5",
      title: "Node.js Essentials",
      icon: "nodejs",
      color: "#3C873A",
      questions: 35,
      duration: "40 min",
      priceType: "Free",
    },
  ];

  const router = useRouter();

  const renderExam = ({ item }) => (
    <View style={styles.card}>
      {/* Badge */}
      <View
        style={[
          styles.badge,
          {
            backgroundColor: item.priceType === "Free" ? "#4CAF50" : "#E53935",
          },
        ]}
      >
        <Text style={styles.badgeText}>{item.priceType}</Text>
      </View>

      {/* Left side */}
      <View style={styles.left}>
        <MaterialCommunityIcons name={item.icon} size={36} color={item.color} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.examTitle}>{item.title}</Text>
          <Text style={styles.examDetails}>
            {item.questions} Questions • {item.duration}
          </Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.startBtn}>
        <Feather
          name="arrow-right-circle"
          size={28}
          color="#fff"
          onPress={() => router.push("/examDetails")}
        />
      </TouchableOpacity>
    </View>
  );

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

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
          <Text style={styles.pageName}>Exams</Text>
        </View>
      </View>
      <Animated.FlatList
        data={examsData}
        entering={FadeInDown.duration(500).delay(200)}
        keyExtractor={(item) => item.id}
        renderItem={renderExam}
        contentContainerStyle={{ margin: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafd",
    flex: 1,
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 25,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  examTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  examDetails: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  startBtn: {
    backgroundColor: "#0069cb",
    padding: 8,
    borderRadius: 50,
  },
  badge: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderTopLeftRadius: 8,
    borderRadius: 2,
    zIndex: 1,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
});
