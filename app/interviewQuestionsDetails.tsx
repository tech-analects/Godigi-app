import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import ThemeBtn from "@/components/ThemeBtn";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "./interceptors";
import { Colors } from "@/constants/Colors";
import { useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";
import AutoHeightWebView from "react-native-autoheight-webview";
import { BASE_URL } from "@/urlPath";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InterViewQuestionsDetails() {

   const route = useRoute();
    // console.log(route?.params?.id)
    const subjectId = route?.params?.id;

  const [interviewQuestionsList, setInterviewQuestionsList] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
   const [hasMore, setHasMore] = useState(false);
     const [limit, setLimit] = useState();

     useEffect(()=>{
      console.log("this is limit",limit)
     },[limit])

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  
  // const getInterviewQuestionsDetails = async () => {
  //   try {
  //     setLoadingData(true);
  //     const userTok = await AsyncStorage.getItem("logged_in_user_token");
  //     console.log("usetoken is", userTok);
  //     const formdata = new FormData();
  //     formdata.append("token", userTok);
  //     const response = await apiInstance.post(
  //       `question-answer/details/${subjectId}`,
  //       formdata,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log(response.data);
  //     if (response.data.status) {
  //       setInterviewQuestionsList(response.data.data);
  //       setSubjectName(response.data.subject_name);
  //     }else{
  //       setSubjectName(response.data.subject_name);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoadingData(false);
  //   }
  // };

  useEffect(() => {
    getInterviewQuestionsDetails(0);
    addInterviewQuestionsView();
  }, []);

   const getInterviewQuestionsDetails = async (customStart) => {
     try {
       if (customStart == 0) {
         setLoadingData(true);
       } else {
         setLoadingMoreData(true);
       }
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);
       //  formData.append("show", selectedShow);
       formData.append("start", customStart);

       console.log(formData);
       const response = await apiInstance.post(
        `question-answer/details/${subjectId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log("response of data", response.data.subject_name);
      setSubjectName(response.data.subject_name);
       if (response.data.status) {
        //  setInterviewQuestionsList(response.data.data);
         // setLeads(response.data.data)
        //  setHasMore(response.data.has_more || false);
         setHasMore(response.data.has_more);
         let finalDataToPass = response.data.data;
         if (customStart == 0) {
            // console.log("thisis for 0", customStart, finalDataToPass);
            setInterviewQuestionsList(finalDataToPass);
            setLimit(finalDataToPass.length);
            // console.log(finalDataToPass.length);
          } else {
            // console.log("customStart not 0", customStart);
            // console.log("has more in 0 not custom is",response.data.has_more)
            setInterviewQuestionsList((prev) => {
              const newList = [...prev, ...finalDataToPass];
              console.log("prev data here", prev);
              console.log("Previous length:", prev.length);
              console.log("Appended data length:", finalDataToPass.length);
              console.log(
                `new list is for custom start ${customStart}`,
                newList,newList.length
              );
              // setLimit(newList.length);
              setLimit((prev) => prev + finalDataToPass.length);
              if (newList.length < 25) {
                setHasMore(false);
              }
              return newList;
          });
          }
       }
       else{
        setHasMore(false)
       }
     } catch (error) {
       console.log("this is err form adlist", error);
       setInterviewQuestionsList([]);
      setHasMore(false);
       //  setHasMore(false);
     } finally {
       setLoadingData(false);
       setLoadingMoreData(false);
     }
   };

    const addInterviewQuestionsView = async () => {
      try {
        let formData = new FormData();
        const token = await AsyncStorage.getItem("logged_in_user_token");
        formData.append("token", token);

        console.log(formData);
        const response = await apiInstance.post(
          `update-counts/2/${subjectId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("response of view api data", response.data);
      } catch (error) {
        console.log("this is err ", error);
      }
    };


 const myQuestionItem = ({ item,index }) => {
   // Wrap the HTML
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
            margin: 0;
          }
          p { margin: 0 0 8px; }
        </style>
      </head>
      <body>${item.answer}</body>
    </html>
  `;

   return (
     <View style={styles.basedJob}>
       <View style={{ flexDirection: "row", gap: 5 }}>
         <Text style={styles.question}>
           Question {index + 1}
           {")"}
         </Text>
         <Text style={[styles.question, { width: "90%" }]}>
           {item.question}
         </Text>
       </View>

       <View
         style={{ height: "auto", marginTop: 10, flexDirection: "column", gap: 5 }}
       >
         <Text style={styles.answerText}>
           Answer :
         </Text>
         {/* <WebView
           source={{ html: htmlContent }}
           originWhitelist={["*"]}
           style={{ flex: 1 }}
           startInLoadingState
         /> */}
         <AutoHeightWebView
           customStyle={`
            * {font-family: -apple-system, Roboto, Arial; font-size:14px; color:#333;}
            body {margin:0; padding:0;}
          `}
           source={{ html: htmlContent }}
           startInLoadingState
           viewportContent={"width=device-width, user-scalable=no"}
           scrollEnabled={false}
           style={{ width: "100%" }}
         />
       </View>
     </View>
   );
 };

  // const renderFooter = () => {
  //   // if (!loadingMore) return null;
  //   if (!loadingMoreData || !hasMore) return null;
  //   console.log("has more is ", hasMore, loadingMoreData);
  //   return <ActivityIndicator size="large" style={{ margin: 16 }} />;
  // };

  const renderFooter = () => {
    if (loadingMoreData) {
      return <ActivityIndicator size="large" style={{ margin: 16 }} />;
    }
    // if (!hasMore) {
    //   return (
    //     <Text style={{ textAlign: "center", padding: 16, color: "gray" }}>
    //       No more questions
    //     </Text>
    //   );
    // }
    return null;
  };


    const fetchData = () => {
      // console.log("readched end here!", loadingMoreData, limit);
      if (loadingMoreData || !hasMore) return;
      const newStart = limit + 1;
      // console.log("Fetching more leads from start:", newStart, limit);
      getInterviewQuestionsDetails(newStart);
    };

    // const fetchData = () => {
    //   console.log("reached end!", loadingMoreData, hasMore, limit);

    //   // don’t fetch if already fetching OR no more data
    //   if (loadingMoreData || !hasMore) return;

    //   const newStart = limit; // don’t +1, use as offset
    //   console.log("Fetching more questions from start:", newStart);
    //   getInterviewQuestionsDetails(newStart);
    // };




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
          <Text style={styles.pageName} numberOfLines={1} ellipsizeMode="tail">
            {subjectName || "null"} 
          </Text>
        </View>
      </View>
      {loadingData ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={interviewQuestionsList}
          showsVerticalScrollIndicator={false}
          renderItem={myQuestionItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.jobCont}
          scrollEnabled={true}
          initialNumToRender={20}
          contentContainerStyle={{ paddingBottom: 100 }}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  padding: 10,
                  marginTop: 50,
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  No Interview Questions available for this subject yet.
                </Text>
              </View>
            );
          }}
        />
      )}

      {/* Submit Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafd",
  },
  jobCont: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 20,
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
    color: "black",
    width: "80%",
  },
  basedJob: {
    backgroundColor: "#fff",
    width: "100%",
    gap: 5,
    // height: 180,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    padding: 15,
    elevation: 3,
    shadowColor: "gray",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  question: {
    fontSize: 14,
    fontWeight: 800,
    color: Colors.bg,
  },
  answer: {
    fontSize: 13,
    fontWeight: 700,
    color: "gray",
  },
  answerText: {
    fontSize: 13,
    fontWeight: 700,
    color: Colors.bg,
  },
});
