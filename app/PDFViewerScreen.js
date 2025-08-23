import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenCapture from "expo-screen-capture";
import apiInstance from "./interceptors";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export default function PDFViewerScreen() {
  const routes = useRoute();
  const { subjectId } = routes.params;

  const [loading, setLoading] = useState(false);
  const [notesData, setNotesData] = useState();
  const [subName, setSubName] = useState("");

  useEffect(() => {
    // Prevent screenshot
    ScreenCapture.preventScreenCaptureAsync();
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const getNotesDetails = async (id) => {
    try {
      setLoading(true);
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      const response = await apiInstance.post(`notes/details/${id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        setSubName(response.data.data[0].subject_name)
        setNotesData(response.data.data[0].notes_html);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      getNotesDetails(subjectId);
      addNotesView();
    }
  }, [subjectId]);

   const addNotesView = async () => {
         try {
           let formData = new FormData();
           const token = await AsyncStorage.getItem("logged_in_user_token");
           formData.append("token", token);
    
           console.log(formData);
           const response = await apiInstance.post(
             `update-counts/1/${subjectId}`,
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

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <View style={{ padding: 10, flex: 1 }}>
          <View style={styles.topPart}>
            <View style={styles.leftside}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                onPress={goBack}
              />
              <Text
                style={styles.pageName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {subName}
              </Text>
            </View>
          </View>

          <WebView
            originWhitelist={["*"]}
            source={{
              html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                  <style>
                    body {
                      font-family: -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
                      font-size: 15px;
                      line-height: 1.6;
                      color: #333;
                    }
                    p { margin: 0 0 12px; }
                    #noData { text-align:center; margin-top:200px; color:gray }
                  </style>
                </head>
                <body>
                  ${
                    notesData ||
                    `<h4 id="noData"}>No notes available for this subject yet.!</h3>`
                  }
                </body>
              </html>
            `,
            }}
            style={{ flex: 1 }}
            startInLoadingState
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  topPart: {
    backgroundColor: "#fff",
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
    // paddingTop: Platform.OS === "android" ? 50 : 50,
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
    color:"black",
    width:"80%"
  },
});
