import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import apiInstance from "./interceptors";

function Bookmark() {
  const recJobArray = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TCS",
      packageRange: "$60,000 - $80,000",
      rating: 4.5,
      location: "San Francisco, CA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 2,
      role: "UX/UI Designer",
      company: "DesignCo",
      packageRange: "$50,000 - $70,000",
      rating: 4.2,
      location: "New York, NY",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 3,
      role: "Marketing Manager",
      company: "TCS",
      packageRange: "$70,000 - $90,000",
      rating: 4.7,
      location: "Los Angeles, CA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 4,
      role: "Backend Developer",
      company: "Amdocs",
      packageRange: "$80,000 - $100,000",
      rating: 4.6,
      location: "Austin, TX",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 5,
      role: "Product Manager",
      company: "NextGen Solutions",
      packageRange: "$90,000 - $120,000",
      rating: 4.8,
      location: "Seattle, WA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
  ];

  const type = ["Full Time", "Remote", "Director"];

  const router = useRouter();

 const goToJobDetails = (id) => {
    console.log("hello");
    router.push({
      pathname:'/applyJobs',
      params:{id:id}
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
    <TouchableOpacity onPress={() => goToJobDetails(item.job_id)} style={styles.basedJob}>
      <View style={styles.topPartRec}>
        <View style={styles.topBased}>
          <Image
            source={ImagesPath.fb}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
          <View>
            <Text
              style={[styles.roleText, { width: 200 }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <View style={styles.compBased}>
              <Text style={styles.compText}>{item.company_name}</Text>
              {/* <View style={styles.review}>
                <Text style={styles.subText}>
                  <AntDesign
                    name="star"
                    size={14}
                    color="#FFCC00"
                    style={{ marginHorizontal: 50 }}
                  />
                  {item.rating}
                </Text>
              </View> */}
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={styles.btRightPart}>
                <Entypo name="location-pin" size={22} color="grey" />
                <Text style={styles.btsubText}>{item.city_name}</Text>
              </View>
              <View style={styles.btRightPart}>
                <FontAwesome name="briefcase" size={18} color="gray" />
                <Text style={styles.btsubText}>{item.salary}</Text>
              </View>
              {/* <Text style={styles.bttimeText}>posted 20h ago</Text> */}
            </View>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "column",
            height: 120,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <FontAwesome name="bookmark" size={24} color={Colors.bg} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "gray" }}>
              2k
            </Text>
            <AntDesign name="eye" size={18} color="gray" />
          </View>
        </View> */}
      </View>


      {/* <View style={styles.bottompart}>
        <View style={styles.btRightPart}>
          <Entypo name="location-pin" size={24} color="grey" />
          <Text style={styles.btsubText}>{item.location}</Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [isFilterViewOpen, setIsFilterViewOpen] = useState(false);

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
   const [activeTab, setActiveTab] = useState("Courses");

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPartHead}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Bookmarks</Text>
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
      <View style={{ paddingHorizontal: 20 }}>
      
            <FlatList
              data={bookMarkData}
              showsVerticalScrollIndicator={false}
              renderItem={prfBasedJobItem}
              keyExtractor={(item) => item.id.toString()}
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
      {/* {isFilterViewOpen && (
        <View style={styles.filterView}>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Alphabetical (A -Z)</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Most recent</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Highest Salary</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Newly posted</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Ending Soon</Text>
          </View>
        </View>
      )} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalheading}>Remove from saved ?</Text>
            <View style={styles.hr}></View>
            <View style={styles.basedJob}>
              <View style={styles.topPartRec}>
                <View style={styles.topBased}>
                  <View style={styles.imageBg}>
                    <Image
                      source={ImagesPath.tcs}
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                  </View>
                  <View>
                    <Text style={styles.roleText}>Frontend Developer</Text>
                    <View style={styles.compBased}>
                      <Text style={styles.compText}>TCS</Text>
                      <View style={styles.review}>
                        <Text style={styles.subText}>
                          <AntDesign
                            name="star"
                            size={14}
                            color="#FFCC00"
                            style={{ marginHorizontal: 50 }}
                          />
                          4.5
                        </Text>
                        <View style={styles.line}></View>
                        <Text style={styles.rev}>Review</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <FontAwesome
                  name="bookmark"
                  size={24}
                  color="#0069CB"
                  onPress={() => setBottomSheetVisible(!bottomSheetVisible)}
                />
              </View>
              <View style={styles.package}></View>
              <View style={styles.typeView}>
                {type.map((i, index) => {
                  // Return the Text component for each job type
                  return (
                    <Text style={styles.type} key={index}>
                      {i}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.dottedLine}></View>
              <View style={styles.bottompart}>
                <View style={styles.btRightPart}>
                  <Entypo name="location-pin" size={24} color="grey" />
                  <Text style={styles.btsubText}>San Francisco,CA</Text>
                </View>
                <View style={styles.btLeftPart}>
                  <Text style={styles.btsubText}>5 days ago</Text>
                </View>
              </View>
            </View>
            <View style={styles.btns}>
              <ThemeBtn
                btnTitle={"Cancel"}
                onPress={() => setBottomSheetVisible(!bottomSheetVisible)}
              />
              <ThemeBtn btnTitle={"Yes,Remove"} onPress={goToJobDetails} />
            </View>
          </View>
        </View>
      </Modal>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15, // optional: if you want overall rounding
    overflow: "hidden", // to clip child radius
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#e2e2e2",
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
    marginVertical: 10,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  topPartRec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "lightgrey",
    borderWidth: 1,
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
    fontWeight: "400",
    fontSize: 14,
    color: "#0069CB",
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
  btsubText: {
    color: "grey",
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
