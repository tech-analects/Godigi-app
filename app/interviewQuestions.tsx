import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import apiInstance from "./interceptors";

const interviewQuestions = [
  {
    id: "1",
    title: "HTML & CSS",
    icon: "html5",
    questions: 25,
    color: "#E44D26",
  },
  {
    id: "2",
    title: "JavaScript",
    icon: "js",
    questions: 40,
    color: "#F7DF1E",
  },
  {
    id: "3",
    title: "React.js",
    icon: "react",
    questions: 35,
    color: "#61DAFB",
  },
  {
    id: "4",
    title: "Node.js",
    icon: "node-js",
    questions: 20,
    color: "#68A063",
  },
  {
    id: "5",
    title: "DevOps",
    icon: "server",
    questions: 18,
    color: "#6C63FF",
  },
];

export default function InterviewQuestionsList() {

    const [interviewQuestionsList, setInterviewQuestionsList] = useState([]);
    const [loadingData, setLoadingData] = useState(false);


   const getInterviewQuestions = async () => {
    try {
      setLoadingData(true);
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      console.log("usetoken is", userTok);
      const formdata = new FormData();
      formdata.append("token", userTok);
      const response = await apiInstance.post(
        `question-answer/list`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.status) {
        console.log(response.data.data);
        setInterviewQuestionsList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getInterviewQuestions();
  }, []);

  const router = useRouter();
  const goToInterviewQuestionsDetails = (id) => {
    router.push({
      pathname: "/interviewQuestionsDetails",
      params: { id: id }, // pass the param here
    });
  };

const renderItem = ({ item }) => {
  let newUrl = `https://godigiinfotech.com/${item.url}`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => goToInterviewQuestionsDetails(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Image
          source={{ uri: newUrl }}
          style={{ height: 40, width: 50, objectFit: "contain" }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.subject_name}</Text>
        <Text style={styles.count}>30 Questions</Text>
      </View>
      <Icon name="chevron-right" size={18} color="#ccc" />
    </TouchableOpacity>
  );
};


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
          <Text style={styles.pageName}>Interview Questions</Text>
        </View>
      </View>
      {loadingData ? (
        <ActivityIndicator style={{marginTop:50}}/>
      ) : (
        <Animated.FlatList
          data={interviewQuestionsList}
          entering={FadeInDown.duration(500).delay(200)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 20,}}
          contentContainerStyle={{paddingBottom:80}}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  padding: 10,
                  marginTop:50
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  No Interview Question Set found!
                </Text>
              </View>
            );
          }}
        />
      )}
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
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "gray",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  count: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
