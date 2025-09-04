import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { AntDesign } from "@expo/vector-icons"; // caret icons
import apiInstance from "./interceptors";
import { useNavigation } from "expo-router";
import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PlansScreen = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null); // store expanded plan id

  const getPlanDetails = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);

      const response = await apiInstance.post(`plan/list`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        setPlans(response.data.data.plans);
      }
    } catch (error) {
      console.log("Error fetching plans", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlanDetails();
  }, []);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedPlan === item.id;

     const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style>
          body {
            font-family: -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            color: #333;
            padding: 0;
          }
        </style>
      </head>
      <body>${item?.descriptions || "Not disclosed"}</body>
    </html>
  `;

    return (
      <View style={styles.card}>
        {/* Header Row with caret */}
        <TouchableOpacity
          style={styles.headerRow}
          onPress={() => toggleExpand(item.id)}
        >
          <View>
            <Text style={styles.title}>{item.plan}</Text>
            <Text style={styles.price}>₹ {item.amount}</Text>
            <Text style={styles.days}>{item.no_of_days} Days</Text>
          </View>
          <AntDesign
            name={isExpanded ? "caretup" : "caretdown"}
            size={20}
            color="#333"
          />
        </TouchableOpacity>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.details}>
            <AutoHeightWebView
              style={{ width: width - 40, marginTop: 5 }}
              customStyle={`
                * {
                  font-size: 14px;
                  color: #333;
                  line-height: 1.5;
                }
                li { margin-bottom: 8px; }
              `}
              source={{ html: htmlContent }}
              scrollEnabled={false}
            />

            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Choose {item.plan}</Text>
            </TouchableOpacity> */}
            <ThemeBtn btnTitle={item.plan} />
          </View>
        )}
      </View>
    );
  };

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
                <Text style={styles.pageName}>Plans</Text>
              </View>
            </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={plans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    // padding: 16,
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
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#2c3e50",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.bg,
  },
  days: {
    fontSize: 14,
    color: "#555",
  },
  details: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
