import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import apiInstance from "./interceptors";
import { BASE_URL } from "@/urlPath";

function Notes() {
  const navigation = useNavigation();

  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };


  const getNotesList=async()=>{
    try {
      setLoading(true);
       const userTok = await AsyncStorage.getItem("logged_in_user_token");
       console.log("usetoken is", userTok);
       const formdata = new FormData();
       formdata.append("token", userTok);
       const response = await apiInstance.post("notes/list", formdata, {
         headers: { "Content-Type": "multipart/form-data" },
       });
       console.log(response.data);
       if(response.data.status){
        setNotes(response.data.data);
       }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getNotesList();
  },[])

//  const renderNote = ({ item }) => (
//    <View style={styles.noteCard}>
//      <TouchableOpacity
//        style={styles.noteInfo}
//        onPress={() =>
//          navigation.navigate("PDFViewerScreen", {
//            code:`<p>hello</p>`
//          })
//        }
//      >
//        <MaterialCommunityIcons name={item.icon} size={40} color={item.color} />
//        <Text style={styles.noteTitle}>{item.subject_name}</Text>
//      </TouchableOpacity>

//      <View style={styles.actions}>
//        <TouchableOpacity onPress={() => downloadNote(item.fileUrl)}>
//          <Feather name="download" size={24} color="#4CAF50" />
//        </TouchableOpacity>
//        <TouchableOpacity onPress={() => shareNote(item.title, item.fileUrl)}>
//          <Feather name="share-2" size={24} color="#2196F3" />
//        </TouchableOpacity>
//      </View>
//    </View>
//  );

const renderNote = ({ item }) => {
  let newUrl = `https://godigiinfotech.com/${item.url}`;
  return (
    <View style={styles.noteCard}>
      <TouchableOpacity
        style={styles.noteInfo}
        onPress={() =>
          navigation.navigate("PDFViewerScreen", {
            subjectId: item.id,
          })
        }
      >
        {/* Show image instead of MaterialCommunityIcons */}
        <Image
          source={{ uri: newUrl }}
          style={{ height: 40, width: 50, objectFit: "contain" }}
        />
        {/* <SvgUri width="40" height="40" uri={newUrl} /> */}
        {/* <SvgUri
          uri="https://godigiinfotech.com/assets/images/subject_icons/3fbf008c016fc2ed8e85ce7199675c68.svg"
          width={50}
          height={40}
        /> */}
        <Text style={styles.noteTitle}>{item.subject_name}</Text>
      </TouchableOpacity>

      {/* Actions with icons only (no functionality) */}
      {/* <View style={styles.actions}>
        <Feather name="download" size={24} color="#4CAF50" />
        <Feather name="share-2" size={24} color="#2196F3" />
      </View> */}
    </View>
  );
};


  return (
    <View style={styles.bgMain}>
      {/* Header */}
      <View style={styles.topPart}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Notes</Text>
        </View>
      </View>

      {/* Notes List */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderNote}
          style={{padding:20}}
          // contentContainerStyle={{ padding: 16 }}
          contentContainerStyle={{ paddingBottom: 80 }}
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
                  No Notes found!
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
  bgMain: {
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
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "gray",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  noteInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width:"70%"
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Notes;
