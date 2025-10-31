import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome6, Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiInstance from "./interceptors";
import { Image } from "expo-image";

function Bookmark() {
 

  const router = useRouter();

 const goToJobDetails = (id) => {
    console.log("hello",id);
    router.push({
      pathname:'/applyJobs',
      params:{id:id,prf:"Jobs"}
    });
  };

  const [loadingData,setLoadingData] = useState(false);
  const [bookMarkData,setBookMarkData] = useState([]);

   const getBookMarks = async () => {
     try {
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);

       console.log(formData);
       const response = await apiInstance.post(`bookmark/list`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });

       console.log("response of data", response.data);
       if(response.data.status){
          setBookMarkData(response.data.data)
       }
      
     } catch (error) {
       console.log("this is err form adlist", error);
       //  setHasMore(false);
     } finally {
       setLoadingData(false);
     }
   };

   useEffect(()=>{
    getBookMarks();
},[])

//   const prfBasedJobItem = ({ item }) => (
//     <TouchableOpacity style={styles.basedJob} onPress={goToJobDetails}>
//       <View style={styles.topPartRec}>
//         <View style={styles.topBased}>
//           <View style={styles.imageBg}>
//             <Image
//               source={ImagesPath.tcs}
//               style={{ width: 50, height: 50, objectFit: "contain" }}
//             />
//           </View>
//           <View>
//             <Text style={styles.roleText}>{item.role}</Text>
//             <View style={styles.compBased}>
//               <Text style={styles.compText}>{item.company}</Text>
//               <View style={styles.review}>
//                 <Text style={styles.subText}>
//                   <AntDesign
//                     name="star"
//                     size={14}
//                     color="#FFCC00"
//                     style={{ marginHorizontal: 50 }}
//                   />
//                   {item.rating}
//                 </Text>
//                 <View style={styles.line}></View>
//                 <Text style={styles.rev}>Review</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <FontAwesome
//           name="bookmark"
//           size={24}
//           color="#0069CB"
//           onPress={() => setBottomSheetVisible(!bottomSheetVisible)}
//         />
//       </View>
//       <View style={styles.package}></View>
//       <View style={styles.typeView}>
//         {item.type.map((i, index) => {
//           // Return the Text component for each job type
//           return (
//             <Text style={styles.type} key={index}>
//               {i}
//             </Text>
//           );
//         })}
//       </View>
//       <View style={styles.dottedLine}></View>
//       <View style={styles.bottompart}>
//         <View style={styles.btRightPart}>
//           <Entypo name="location-pin" size={24} color="grey" />
//           <Text style={styles.btsubText}>{item.location}</Text>
//         </View>
//         <View style={styles.btLeftPart}>
//           <Text style={styles.btsubText}>{item.posted}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

const prfBasedJobItem = ({ item, index }) => (
    <View style={styles.basedJob}>
      {/* <View style={styles.topBased}>
      </View> */}
      <View style={styles.topPartRec}>
          {
                   item.img_url == null
                     ?
                     <View style={styles.nameBg}>
                       <Text style={{ color: Colors.bg, fontWeight: 600, fontSize: 25 }}>{item?.company_name?.charAt(0) || "A"}</Text>
                     </View>
                     :
                     <View style={styles.imageBg}>
                       <Image
                         source={{ uri: `https://godigiinfotech.com/${item.img_url}` }}
                         // source={{uri:``}}
                         style={{ height: 50, width: "100%" }}
                         transition={1000}
                         contentFit="scale-down"
                       />
                     </View>
                 }
        <TouchableOpacity
          onPress={() => goToJobDetails(item.job_id)}
          // onPress={()=>showToast("hello")}
          style={{ width: "75%"}}
        >
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            <Text
              style={[styles.roleText, { width: "100%" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
             {/* {addingBookmark && (item.id == jobIdBookmarking || item.bookmark_id == jobIdBookmarking) ? (
            <ActivityIndicator />
          ) : item.bookmark_id == null ? (
            <FontAwesome
              name="bookmark-o"
              size={24}
              color={Colors.bg}
              onPress={() => addBookmark(item.id)}
            />
          ) : (
            <FontAwesome
              name="bookmark"
              size={24}
              color={Colors.bg}
              onPress={() => removeBookmark(item.bookmark_id)}
            />
          )} */}
          </View>
 <View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                marginTop: 5,
                justifyContent: 'flex-start'
              }}
            >
              <View style={{ width: 20, justifyContent: "center", alignItems: "center" }}>
                <FontAwesome name="building" size={16} color="#929090ff" />
              </View>
              {/* <FontAwesome6 name="building-columns" size={16} color="#AEAEAE" /> */}

              <Text style={styles.compText} >{item.company_name || "Not Disclosed"}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                marginTop: 5,
                justifyContent: 'flex-start'
              }}
            >
              <View style={{ width: 20, justifyContent: "flex-start", alignItems: "flex-start" }}>
                <Entypo name="location-pin" size={20} color="#929090ff" />
              </View>
              <Text
                style={[styles.btsubText, { width: "80%" }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.city_names}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      

      <View style={styles.bottompart}>
        <View style={styles.bottomEnit}>
          <Text style={styles.btsubText}>{item.no_of_openings} vacancies</Text>
        </View>
        <View style={styles.bottomEnit}>
          <Text style={styles.btsubText}>{item.min_year_of_exp + "-" + item.max_year_of_exp} Years</Text>
        </View>
        <View style={styles.bottomEnit}>
          <Text style={styles.btsubText}>{item.created_at?.split(" ")[0] || "NA"}</Text>
        </View>
      </View>
    </View>
  );

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [isFilterViewOpen, setIsFilterViewOpen] = useState(false);

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
   const [activeTab, setActiveTab] = useState("Courses");
   
     const goToNotifications=()=>{
       router.push("/notifications")
     }

  return (
    <View style={styles.bgMain}>
     <View style={styles.topPart}>
          <Feather name="arrow-left" size={24} 
            color="#fff"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Bookmarks</Text>
          <View>
            {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications}/> */}
          </View>
      </View>
      {/* <View style={styles.topPart}>
        <View style={styles.savedText}>
          <Text style={styles.jobNumber}>422</Text>
          <Text style={styles.jobText}>Total jobs saved</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsFilterViewOpen(!isFilterViewOpen)}
        >
          <Image source={ImagesPath.data} style={styles.img} />
        </TouchableOpacity>
      </View> */}

      {
        loadingData
        ?
        <ActivityIndicator style={{marginTop:50}}/>
        :
      <View style={{ paddingHorizontal: 10 }}>
      
            <FlatList
              data={bookMarkData}
              showsVerticalScrollIndicator={false}
              renderItem={prfBasedJobItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{padding:10}}
              ListEmptyComponent={() => {
                          return (
                            <View
                              style={{
                                justifyContent: "center",
                                padding: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: "gray",
                                  fontWeight: 600,
                                  textAlign: "center",
                                  marginTop: 50,
                                }}
                              >
                                No Bookmarks added!
                              </Text>
                            </View>
                          );
                        }}
            />
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  filText: {
    fontSize: 14,
    fontWeight: 500,
  },
  filCont: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
    marginVertical: 5,
    padding: 5,
  },
  filterView: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 50,
    zIndex: 100,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0,
    elevation: 5,
  },
  hr: {
    width: "100%",
    height: 0,
    borderWidth: 0.5,
    marginVertical: 10,
    borderColor: "grey",
  },
  modalheading: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

  tab: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: "center",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    color: "black",
    textAlign: "center",
  },
  topPartHead: {
    backgroundColor: Colors.bg,
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
    color:"#fff"
  },
  savedText: {
    flexDirection: "row",
    gap: 5,
  },
  jobNumber: {
    color: "#0069cb",
    fontSize: 16,
    fontWeight: "bold",
  },
  jobText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  img: {
    height: 20,
    width: 20,
  },
  leftBottomPart: {
    width: "60%",
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 15,
  },
  rightBottomPart: {
    width: "40%",
    height: "100%",
  },
  createText: {
    fontSize: 18,
    fontWeight: 600,
  },
  imgBtm: {
    width: "100%",
    height: "100%",
  },
  topBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "flex-start",
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    gap: 10,
  },
  topCmp: {
    backgroundColor: "#fff",
    width: 120,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    // Adjust shadow properties
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 }, // This will add shadow below the component
    shadowRadius: 5, // Softens the shadow
    shadowOpacity: 0.8, // Light opacity for the shadow
    elevation: 5, // For Android to add a shadow
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },

  recJob: {
    backgroundColor: "#fff",
    width: 300,
    height: 200,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  basedJob: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#e2e2e2",
  },
  topPartRec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  imageBg: {
    borderRadius: 5,
    height: 50,
    borderColor: "lightgray",
    width: "15%",
    borderWidth: 0.8,
    // width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  nameBg: {
    borderRadius: 10,
    borderColor: Colors.bg,
    borderWidth: 1,
    width: "15%",
    height: 50,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:Colors.bg
  },
  dottedLine: {
    marginVertical: 10,
    width: "100%",
    height: 0,
    borderColor: "#D9D9D9",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  roleText: {
    fontWeight: "600",
    fontSize: 16,
  },
  compText: {
    fontWeight: "600",
    color: "#929090ff",
    fontSize: 14,
  },
  subText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 14,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  package: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  type: {
    backgroundColor: "#F2F4FA",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "semibold",
  },
  btRightPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bttimeText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 14,
    marginTop: 5,
  },
  btLeftPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bottompart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
    bottomEnit: {
    backgroundColor: "#F2F4FA",
    borderRadius: 5,
    padding: 5
  },
   btsubText: {
    color: "#929090ff",
    fontWeight: 600,
    fontSize: 13,
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  line: {
    width: 0,
    height: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  rev: {
    color: "grey",
    fontSize: 14,
    fontWeight: 500,
  },
});

export default Bookmark;
