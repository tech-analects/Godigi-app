import { AntDesign, Entypo, Feather, Fontisto } from "@expo/vector-icons";
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
  TextInput,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import apiInstance from "./interceptors";
import { Colors } from "@/constants/Colors";
import { Image } from 'expo-image';



export default function InterviewQuestionsList() {

    const [interviewQuestionsList, setInterviewQuestionsList] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
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
        // console.log(response.data.data);
        setInterviewQuestionsList(response.data.data);
        setAllQuestions(response.data.data);
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
          style={{ height: 40, width: 50}}
           contentFit="fill"
             transition={1000}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.subject_name}</Text>
        <View style={{flexDirection:'row',justifyContent:"flex-start",alignItems:"baseline",gap:10}}>
        <Text style={styles.count}>{item.question_count} Questions</Text>
          <View style={{backgroundColor:"green",borderRadius:5,paddingHorizontal:5,paddingVertical:1}}>
         
                 <Text style={{color:"white",fontSize:10,fontWeight:600}}>Free</Text>
                 </View>
        </View>
      </View>
      <Icon name="chevron-right" size={18} color="#ccc" />
    </TouchableOpacity>
  );
};


    const navigation = useNavigation();
  
    const goBack = () => {
      navigation.goBack();
    };


  const goToNotifications=()=>{
    router.push("/notifications")
  }

    const [searchQuery, setSearchQuery] = useState('');
    const filterCourses = () => {
  if (searchQuery.trim().length > 0) {
    const filtered = allQuestions.filter(c =>
      c.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setInterviewQuestionsList(filtered);
  } else {
    setInterviewQuestionsList(allQuestions); // Reset to original list
  }
};

  return (
    <View style={styles.container}>
     <View style={styles.topPart}>
         <Feather name="arrow-left" size={24} 
                     color="#fff"
                     onPress={goBack}
                   />
          <Text style={styles.pageName}>Interview Questions</Text>
          <View>
            {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications}/> */}
          </View>
      </View>

       <View style={styles.topPart1}>
                      <View style={styles.inputBg}>
                       
                          <TextInput
        placeholder="Search Interview Questions"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor="#929090ff"
        autoComplete="off"
        style={[
          Colors.inputbox,
          {
            backgroundColor: "white",
            borderColor: "#fff",
            borderRadius: 10,
            elevation: 2,
            shadowColor: "lightgray",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 5,
            shadowOpacity: 0.8,
            borderWidth: 0.5,
            paddingLeft: 40,
            borderColor: "#e2e2e2",
          },
        ]}
        returnKeyType="search"   // Shows "Search" button on the keyboard
        blurOnSubmit={false}     // Keeps input focused if you want
        onSubmitEditing={() => {
          // ✅ This will run when Enter/Search/Done is pressed
          // console.log("Search submitted:", searchQuery);
          filterCourses(); // <-- your method
        }}
      />
      
                           <Feather name="search" size={22} color="#929090ff" style={{position:"absolute",left:10}}/>
                           {
                            searchQuery.length > 0
                            &&
                           <Entypo name="cross" size={24} color="#929090ff" style={{position:"absolute",right:10}}  onPress={() => {
      setSearchQuery("");
      setInterviewQuestionsList(allQuestions); // Reset instantly
    }}
  />
                           }
                      </View>
                      {/* <View style={styles.filterBg}>
                        <Ionicons name="options-outline" size={24} color="#fff" />
                      </View> */}
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
          style={{ paddingTop: 10,}}
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
    backgroundColor: "#F2F2F2",
  },
  inputBg:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    width:'100%',
    flexDirection:"row"
  },
  topPart1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop:10
  },
   topPart: {
    backgroundColor: Colors.bg,
       height:100,
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
    // marginHorizontal: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#fff"
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
    marginBottom: 5,
  shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#e2e2e2",
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
    color: "#000",
  },
  count: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
