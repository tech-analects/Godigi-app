import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import ThemeBtn from "@/components/ThemeBtn";

export default function ExamDetails() {
  // Example exam data
  const exam = {
    title: "JavaScript Fundamentals",
    icon: "language-javascript",
    color: "#F0DB4F",
    questions: 50,
    duration: "60 min",
    difficulty: "Beginner",
    type: "Multiple Choice",
    price: 199, // set 0 for free
    description:
      "Test your knowledge of JavaScript fundamentals, including variables, functions, arrays, objects, and ES6 features. This exam is perfect for beginners looking to validate their skills.",
  };

  const isFree = exam.price === 0;

   const navigation = useNavigation();
      const goBack = () => {
        navigation.goBack();
      };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.topPart}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.pageName}>JavaScript Exam</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name={exam.icon}
            size={50}
            color={exam.color}
          />
          <Text style={styles.title}>{exam.title}</Text>
          <Text style={styles.subtitle}>
            {exam.questions} Questions • {exam.duration}
          </Text>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsRow}>
          <View style={styles.infoCard}>
            <Feather name="clock" size={24} color="#0069cb" />
            <Text style={styles.cardLabel}>Duration</Text>
            <Text style={styles.cardValue}>{exam.duration}</Text>
          </View>
          <View style={styles.infoCard}>
            <AntDesign name="questioncircleo" size={24} color="#0069cb" />
            <Text style={styles.cardLabel}>Questions</Text>
            <Text style={styles.cardValue}>{exam.questions}</Text>
          </View>
        </View>

        <View style={styles.cardsRow}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color="#0069cb"
            />
            <Text style={styles.cardLabel}>Difficulty</Text>
            <Text style={styles.cardValue}>{exam.difficulty}</Text>
          </View>
          <View style={styles.infoCard}>
            <Feather name="file-text" size={24} color="#0069cb" />
            <Text style={styles.cardLabel}>Type</Text>
            <Text style={styles.cardValue}>{exam.type}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descSection}>
          <Text style={styles.descTitle}>About this exam</Text>
          <Text style={styles.descText}>{exam.description}</Text>
        </View>

        {/* Action Button */}
        {/* <TouchableOpacity
        //   style={[
        //     styles.actionBtn,
        //     { backgroundColor: isFree ? "#4CAF50" : "#FF9800" },
        //   ]}
        style={Colors.themeBtn}
        >
          <Text style={Colors.themeBtnTxt}>
            {isFree ? "Start Exam" : `Buy for ₹${exam.price}`}
          </Text>
        </TouchableOpacity> */}
        <ThemeBtn btnTitle={"Continue"}/>
      </View>
    </ScrollView>
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
    paddingTop: Platform.OS === "android" ? 40 : 50,
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
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  descSection: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
