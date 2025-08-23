import React from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Animated, { FadeInRight } from "react-native-reanimated";

const updatesData = [
  {
    id: "1",
    title: "React Hooks Deep Dive",
    time: "10:00 AM - 12:00 PM",
    date: "09 Aug 2025",
    points: [
      "Covered useState and useEffect basics",
      "Built a small Todo App",
      "Discussed performance optimizations",
    ],
  },
  {
    id: "2",
    title: "JavaScript Closures",
    time: "2:00 PM - 3:00 PM",
    date: "09 Aug 2025",
    points: [
      "Explained lexical scope",
      "Practical closure examples",
      "Assigned closure-based exercise",
    ],
  },
];

export default function ClassUpdatesScreen() {
  const renderUpdate = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="school-outline" size={28} color="#4CAF50" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subText}>
            {item.date} • {item.time}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        {item.points.map((point, index) => (
          <View key={index} style={styles.pointRow}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#2196F3"
            />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>
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
          <Text style={styles.pageName}>Today's Lecture Updates</Text>
        </View>
      </View>
      <Animated.FlatList
        data={updatesData}
        entering={FadeInRight.duration(500).delay(200)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUpdate}
        showsVerticalScrollIndicator={false}
        style={{padding:20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafd",
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
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  pointText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
  },
});
