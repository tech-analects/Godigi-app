import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Entypo, Feather, Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import apiInstance from "./interceptors";
import { BASE_URL } from "@/urlPath";
import { Colors } from "@/constants/Colors";
import { Image } from 'expo-image';

function Notes() {
  const navigation = useNavigation();

  const [notes,setNotes] = useState([]);
  const [allNotes,setAllNotes] = useState([]);
  const [loading,setLoading] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const router = useRouter();

  const goToNotifications=()=>{
    router.push("/notifications")
  }

  const getNotesList=async()=>{
    try {
      setLoading(true);
       const userTok = await AsyncStorage.getItem("logged_in_user_token");
      //  console.log("usetoken is", userTok);
       const formdata = new FormData();
       formdata.append("token", userTok);
       const response = await apiInstance.post("notes/list", formdata, {
         headers: { "Content-Type": "multipart/form-data" },
       });
      //  console.log(response.data);
       if(response.data.status){
        setNotes(response.data.data);
        setAllNotes(response.data.data);
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
          style={{ height: 40, width: 50 }}
           contentFit="fill"
             transition={1000}
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
      <View style={styles.actions}>
        {/* <Feather name="download" size={24} color="#4CAF50" />
        <Feather name="share-2" size={24} color="#2196F3" /> */}
        <View style={{backgroundColor:"green",borderRadius:5,paddingHorizontal:5,paddingVertical:1}}>

        <Text style={{color:"white",fontSize:10,fontWeight:600}}>Free</Text>
        </View>
      </View>
    </View>
  );
};

  const [searchQuery, setSearchQuery] = useState('');
const filterCourses = () => {
  if (searchQuery.trim().length > 0) {
    const filtered = allNotes.filter(c =>
      c.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNotes(filtered);
  } else {
    setNotes(allNotes); // Reset to original list
  }
};


  return (
    <View style={styles.bgMain}>
      {/* Header */}
     <View style={styles.topPart}>
          <Feather name="arrow-left" size={24} 
                      color="#fff"
                      onPress={goBack}
                    />
          <Text style={styles.pageName}>Notes</Text>
          <View>
            {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications}/> */}
          </View>
      </View>

      <View style={styles.topPart1}>
                      <View style={styles.inputBg}>
                       
                          <TextInput
        placeholder="Search Notes"
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
      setNotes(allNotes); // Reset instantly
    }}
  />
                           }
                      </View>
                      {/* <View style={styles.filterBg}>
                        <Ionicons name="options-outline" size={24} color="#fff" />
                      </View> */}
                    </View>

      {/* Notes List */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderNote}
          style={{paddingHorizontal:20}}
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
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
   filterBg:{
    backgroundColor:Colors.bg,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    paddingHorizontal:10,
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
    paddingVertical:10
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
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#e2e2e2",

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
    color:'black'
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Notes;
