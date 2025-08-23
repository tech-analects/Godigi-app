import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ThemeBtn from "@/components/ThemeBtn";
import { useNavigation } from "expo-router";

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

    const navigation = useNavigation();

    const goBack = () => {
      navigation.goBack();
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Feedback</Text>
        </View>
      </View>
      <View style={{marginHorizontal:20,paddingTop:10}}>
        <Text style={styles.heading}>We value your feedback! 💬</Text>
        <Text style={styles.subHeading}>
          Help us improve by sharing your experience.
        </Text>

        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRating(index + 1)}
              >
                <Ionicons
                  name={index < rating ? "star" : "star-outline"}
                  size={35}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
        </View>

        {/* Feedback Input */}
        <Text style={styles.label}>Your Comments</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Write your feedback here..."
          value={feedback}
          onChangeText={setFeedback}
        />

        {/* Suggestions */}
        <Text style={styles.label}>What did you like? ✅</Text>
        <View style={styles.suggestions}>
          <View style={styles.suggestionItem}>
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <Text style={styles.suggestionText}>Easy to use</Text>
          </View>
          <View style={styles.suggestionItem}>
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <Text style={styles.suggestionText}>Great content</Text>
          </View>
          <View style={styles.suggestionItem}>
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <Text style={styles.suggestionText}>Helpful examples</Text>
          </View>
        </View>
      <ThemeBtn btnTitle={"Submit "} onPress={goBack}/>
      </View>

      {/* Submit Button */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
    color: "#333",
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    height: 120,
    borderColor: "#ddd",
    borderWidth: 1,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 4,
  },
  suggestionText: {
    marginLeft: 5,
    color: "green",
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
