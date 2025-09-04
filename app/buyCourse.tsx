import ThemeBtn from "@/components/ThemeBtn";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "./interceptors";
import AutoHeightWebView from "react-native-autoheight-webview";

function BuyCourses() {
  const navigation = useNavigation();
  const [selectedInfo, setSelectedInfo] = useState("Overview");
  const goBack = () => {
    navigation.goBack();
  };

  const route = useRoute();
  console.log(route?.params?.id)
  const courseId = route?.params?.id

  const type = ["Online","Projects", "Practicals"];

  const jobArray = [
    {
      id: 1,
      name: "Overview",
    },
    {
      id: 2,
      name: "Course Content",
    },
    {
      id: 3,
      name: "Notes",
    },
    {
      id: 4,
      name: "Certificate",
    },
    {
      id: 5,
      name: "Interview Questions",
    },
  ];

  const [loading,setLoading] = useState(false)
  const [courseDetails,setCourseDetails] = useState([]);
  const [courseNotes,setCourseNotes] = useState([]);

  useEffect(()=>{
    getCourseDetails();
    addCourseView();
  },[])

  const getCourseDetails=async()=>{
    try {
      setLoading(true)
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);

       console.log(formData);
       const response = await apiInstance.post(
         `course/details/${courseId}`,
         formData,
         {
           headers: { "Content-Type": "multipart/form-data" },
         }
       );
       if(response.data.status){
         console.log(response.data.data.course_details[0])
        setCourseDetails(response.data.data.course_details[0])
        setCourseNotes(response.data.data.course_notes)
       }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.jobCategoryItem,
        selectedInfo === item.name && styles.selectedJobCategory,
      ]}
      onPress={() => {setSelectedInfo(item.name);}}
    >
      <Text
        style={[
          styles.jobCategoryText,
          selectedInfo === item.name && styles.selectedJobText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const qualifications = [
    "Bachelor's degree in Computer Science or related field.",
    "2+ years of experience in Frontend Development.",
    "Proficiency in JavaScript, React, and modern front-end frameworks.",
    "Experience with HTML, CSS, and responsive design principles.",
    "Familiarity with version control systems (Git).",
    "Strong problem-solving and debugging skills.",
    "Excellent communication and teamwork abilities.",
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.iconText}>{item.icon}</Text>
      <Text style={styles.subHeadText}>{item.perk}</Text>
    </View>
  );

  const requiredSkills = [
    { id: "1", skill: "React Native" },
    { id: "2", skill: "JavaScript" },
    { id: "3", skill: "HTML-CSS" },
    { id: "4", skill: "Version control" },
    { id: "5", skill: "Redux" },
    { id: "6", skill: "Rest API" },
    { id: "7", skill: "Database " },
  ];

  const renderSkills = ({ item }) => (
    <View style={styles.skillContainer}>
      <Text style={styles.skillText}>{item.skill}</Text>
    </View>
  );

  const router = useRouter();

  const goToApplications = () => {
    router.push("/application");
  };

  const successModal = (
    <Modal
      visible={isSuccessModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalImageContainer}>
            <Image
              source={ImagesPath.resetModalImg}
              style={styles.modalImage}
            />
          </View>
          <Text style={styles.modalTitle}>Successfully</Text>
          <Text style={styles.modalText}>
            You have successfully appiled to this job vancancy , you can see the
            status of this application in "Applilcations" section.
          </Text>
          <ThemeBtn
            btnTitle={"Discover More Jobs"}
            onPress={goToApplications}
          />
          <ThemeBtn
            btnTitle={"Cancel"}
            onPress={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
          />
        </View>
      </View>
    </Modal>
  );

  const errorModal = (
    <Modal
      visible={isErrorModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsErrorModalOpen(!isErrorModalOpen)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalImageContainer}>
            <Image source={ImagesPath.errImg} style={styles.modalImage} />
          </View>
          <Text style={styles.modalTitleErr}>Oops, Failed !</Text>
          <Text style={styles.modalText}>
            Please check your internet connection and try again
          </Text>
          <ThemeBtn
            btnTitle={"Try again"}
            onPress={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
          />
          <ThemeBtn
            btnTitle={"Cancel"}
            onPress={() => setIsErrorModalOpen(!isErrorModalOpen)}
          />
        </View>
      </View>
    </Modal>
  );

  const courseContent = [
    { id: "1", name: "Introduction to React Native & Environment Setup" },
    { id: "2", name: "Understanding Components, JSX, and Props" },
    { id: "3", name: "State Management & Hooks (useState, useEffect)" },
    { id: "4", name: "Handling User Input & Forms" },
    { id: "5", name: "Navigation (Stack, Tab, Drawer) using React Navigation" },
    { id: "6", name: "Fetching Data from APIs (Axios / Fetch)" },
    { id: "7", name: "Managing Global State with Redux or Context API" },
    { id: "8", name: "Styling with Flexbox, Stylesheet, and Tailwind CSS" },
    { id: "9", name: "Working with Images, Icons, and SVGs" },
    { id: "10", name: "Using Device Features (Camera, Location, Sensors)" },
    { id: "11", name: "Push Notifications (Firebase Cloud Messaging)" },
    { id: "12", name: "Offline Storage (AsyncStorage, SQLite)" },
    { id: "13", name: "Animations & Gesture Handling" },
    { id: "14", name: "Building & Testing with Expo and Bare Workflow" },
    {
      id: "15",
      name: "Publishing Apps to Google Play Store & Apple App Store",
    },
  ];



  
   const renderNote = ({ item }) => {
     let newUrl = `https://godigiinfotech.com/${item.url}`;
     return (
       <TouchableOpacity style={styles.noteCard}  onPress={() =>
             navigation.navigate("PDFViewerScreen", {
               subjectId: item.id,
             })
           }>
          <View
           style={styles.noteInfo}
          
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
         </View>
   
         {/* Actions with icons only (no functionality) */}
         {/* <View style={styles.actions}>
           <Feather name="download" size={24} color="#4CAF50" />
           <Feather name="share-2" size={24} color="#2196F3" />
         </View> */}
       </TouchableOpacity>
     );
   
    };


     const goToInterviewQuestionsDetails = (id) => {
    router.push({
      pathname: "/interviewQuestionsDetails",
      params: { id: id }, // pass the param here
    });
  };

   const renderItemInterviewQuestions = ({ item }) => {
     let newUrl = `https://godigiinfotech.com/${item.url}`;
     return (
       <TouchableOpacity style={styles.noteCard} onPress={() =>
           goToInterviewQuestionsDetails(item.id)
           }>
         <View
           style={styles.noteInfo}
           
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
         </View>
   
         {/* Actions with icons only (no functionality) */}
         {/* <View style={styles.actions}>
           <Feather name="download" size={24} color="#4CAF50" />
           <Feather name="share-2" size={24} color="#2196F3" />
         </View> */}
       </TouchableOpacity>
     );
   };

   const addCourseView = async () => {
          try {
            let formData = new FormData();
            const token = await AsyncStorage.getItem("logged_in_user_token");
            formData.append("token", token);
     
            console.log(formData);
            const response = await apiInstance.post(
              `update-counts/3/${courseId}`,
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
  


   const [scrolledHeight, setScrolledHeight] = useState(0);
   const handleScroll=(e)=>{
      const scrollY = e.nativeEvent.contentOffset.y;
    setScrolledHeight(scrollY)
   }


   const htmlContentDesc = `
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
      <body>${courseDetails?.app_description || "Description not provided"}</body>
    </html>
  `;

  return (
    <>
      {scrolledHeight < 25 ? (
        <StatusBar barStyle={"light-content"} />
      ) : (
        <StatusBar hidden={true} translucent backgroundColor="transparent" />
      )}
      {
        loading
        ?
        <ActivityIndicator style={{marginTop:50}}/>
        :
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          onScroll={(e) => handleScroll(e)}
          scrollEventThrottle={16}
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.bgMain}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: `https://godigiinfotech.com/${courseDetails?.url}`,
            }}
            style={styles.upperPart}
          >
            <BlurView intensity={120} tint="dark" style={{ height: "100%" }}>
              <View style={styles.topPart}>
                <View style={styles.leftside}>
                  <AntDesign
                    name="left"
                    size={22}
                    color="#fff"
                    onPress={goBack}
                  />
                </View>
                <View style={styles.rightside}>
                  <FontAwesome name="bookmark" size={24} color="#fff" />
                  {/* <Entypo name="share" size={24} color="#fff" /> */}
                </View>
              </View>
              <View style={styles.topBased}>
                <View style={styles.imageBg}>
                  <Image
                    source={ImagesPath.reactLogo}
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                </View>
                <View>
                  <Text style={styles.roleText}>{courseDetails?.title}</Text>
                  <View style={styles.compBased}>
                    <Text style={styles.compText}>Mobile Development</Text>
                  </View>
                </View>
              </View>
              <View style={styles.dottedLine}></View>
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
              <View style={styles.detailsCol}>
                {/* <View style={styles.dataRow}>
                <FontAwesome name="users" size={20} color="white" />
                <Text style={styles.dataText}>2,456 enrolled</Text>
              </View> */}
                <View style={styles.dataRow}>
                  <MaterialIcons name="language" size={24} color="white" />
                  <Text style={styles.dataText}>{courseDetails?.language || "English"}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.btmrpText}>MRP</Text>
                  <Text style={[styles.btmrpTextPrice]}>{courseDetails?.mrp || "na"}</Text>
                  <View style={styles.lineThrough}></View>
                </View>
                <View style={styles.dataRow}>
                  <FontAwesome
                    name="rupee"
                    size={24}
                    color="white"
                    style={{ paddingLeft: 5 }}
                  />
                  {/* <Text style={[styles.btmrpTextPrice]}>{8999}</Text>
                <View style={styles.lineThrough}></View> */}
                  <Text style={styles.dataText}>{courseDetails?.price}</Text>
                </View>
              </View>
              {/* <View style={{ paddingHorizontal: 20 }}>
              <Pressable
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 700 }}>Purchase</Text>
              </Pressable>
            </View> */}
            </BlurView>
          </ImageBackground>
          <View style={{ height: 50 }}>
            <FlatList
              contentContainerStyle={{
                justifyContent: "space-evenly",
                // width: "100%",
              }}
              horizontal
              data={jobArray}
              renderItem={renderJobItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.jobCategoryBar}
            />
          </View>
          {selectedInfo == "Overview" && (
            <View style={styles.info}>
              <View style={styles.jd}>
                <Text style={styles.subHead}>About Course</Text>
                <AutoHeightWebView
                                   customStyle={`
                                            * {font-family: -apple-system, Roboto, Arial; font-size:14px; color:#333;}
                                            body {marginTop:20; padding:0;}
                                          `}
                                   source={{ html: htmlContentDesc }}
                                   startInLoadingState
                                   viewportContent={"width=device-width, user-scalable=no"}
                                   scrollEnabled={false}
                                   style={{ width: "100%", marginTop: 20 }}
                                 />
              </View>
              {/* <View style={styles.topRev}>
                <View style={styles.leftPart}>
                  <View style={styles.ratingNum}>
                    <Text style={styles.ratNum}>4.5</Text>
                    <Text style={styles.outNum}>/5</Text>
                  </View>
                  <Text style={styles.revCount}>2.7k review</Text>
                  <View style={styles.starRow}>
                    <FontAwesome name="star" size={22} color="#f4af50" />
                    <FontAwesome name="star" size={22} color="#f4af50" />
                    <FontAwesome name="star" size={22} color="#f4af50" />
                    <FontAwesome name="star" size={22} color="#f4af50" />
                    <FontAwesome name="star-half-o" size={22} color="#f4af50" />
                  </View>
                </View>
                <View style={styles.rightPart}>
                  <View style={styles.five}>
                    <Text style={styles.ratText}> 5 Star</Text>
                    <View style={styles.fiveStarRange}></View>
                  </View>
                  <View style={styles.five}>
                    <Text style={styles.ratText}> 4 Star</Text>
                    <View style={styles.starRange}>
                      <View style={styles.fourStar}></View>
                    </View>
                  </View>
                  <View style={styles.five}>
                    <Text style={styles.ratText}> 3 Star</Text>
                    <View style={styles.starRange}>
                      <View style={styles.threeStar}></View>
                    </View>
                  </View>
                  <View style={styles.five}>
                    <Text style={styles.ratText}> 2 Star</Text>
                    <View style={styles.starRange}>
                      <View style={styles.twoStar}></View>
                    </View>
                  </View>
                  <View style={styles.five}>
                    <Text style={styles.ratText}> 1 Star</Text>
                    <View style={styles.starRange}>
                      <View style={styles.oneStar}></View>
                    </View>
                  </View>
                </View>
              </View> */}
            </View>
          )}

          {selectedInfo == "Course Content" && (
            <View>
              <View style={styles.jd}>
                <Text style={styles.subHead}>What will this Course have?</Text>
                <FlatList
                  data={courseContent}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text style={styles.bulletContent}>{"\u2022"}</Text>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  )}
                  style={{ marginTop: 10 }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <View style={styles.jd}>
                <Text style={styles.subHead}>What you will learn?</Text>
                <FlatList
                  data={requiredSkills}
                  renderItem={renderSkills}
                  numColumns={3}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                />
              </View>
            </View>
          )}
          {selectedInfo == "Notes" && (
            <View style={styles.jd}>
              <Text style={styles.subHead}>Notes</Text>
              <FlatList
                data={courseNotes}
                style={{maxHeight:320}}
                keyExtractor={(item) => item.id}
                renderItem={renderNote}
                nestedScrollEnabled={true}
                contentContainerStyle={{ padding: 16 }}
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
                                                No Notes found!
                                              </Text>
                                            </View>
                                          );
                                        }}
              />
            </View>
          )}
          {selectedInfo == "Interview Questions" && (
            <View style={styles.jd}>
              <Text style={styles.subHead}>Interview Questions</Text>
              <FlatList
                data={courseNotes}
                keyExtractor={(item) => item.id}
                style={{maxHeight:320}}
                nestedScrollEnabled={true}
                renderItem={renderItemInterviewQuestions}
                contentContainerStyle={{ paddingTop: 20 }}
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
                                                No Interview Questions found!
                                              </Text>
                                            </View>
                                          );
                                        }}
              />
            </View>
          )}
          {selectedInfo == "Certificate" && (
            <View style={styles.jd}>
              <Text style={styles.subHead}>Certificate</Text>
              <Image
                source={ImagesPath.certificate}
                style={{
                  height: 200,
                  objectFit: "contain",
                  marginTop: 30,
                  width: "100%",
                }}
              />
            </View>
          )}

          {/* <View style={styles.jd}>
        <Text style={styles.subHead}>Company Info.</Text>
        <Text style={styles.subHeadText}>
          809, Godrej and Boyce compound , Vikhroli, Mumbai, 444 301.
        </Text>
      </View> */}

          {successModal}
          {errorModal}
        </Animated.ScrollView>
        <View style={styles.buttonContainer}>
          <ThemeBtn btnTitle={"Buy Now"} />
        </View>
      </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    backgroundColor: "#fafafd",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
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
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    width:"80%"
  },
  topRev: {
    // backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    height: 150,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  ratText: {
    color: "#676767",
    fontSize: 12,
  },
  five: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  oneStar: {
    width: 20,
    backgroundColor: "#f4af50",
    height: 10,
    borderRadius: 5,
  },
  twoStar: {
    width: 40,
    backgroundColor: "#f4af50",
    height: 10,
    borderRadius: 5,
  },
  threeStar: {
    width: 60,
    backgroundColor: "#f4af50",
    height: 10,
    borderRadius: 5,
  },
  fourStar: {
    width: 80,
    backgroundColor: "#f4af50",
    height: 10,
    borderRadius: 5,
  },
  starRange: {
    width: 100,
    backgroundColor: "lightgrey",
    height: 10,
    borderRadius: 5,
  },
  fiveStarRange: {
    width: 100,
    backgroundColor: "#f4af50",
    height: 10,
    borderRadius: 5,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  ratNum: {
    fontSize: 40,
    fontWeight: 600,
  },
  revCount: {
    color: "#676767",
    fontSize: 16,
    fontWeight: 500,
  },
  outNum: {
    fontSize: 30,
    fontWeight: 500,
  },
  ratingNum: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftPart: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightPart: {
    width: "50%",
    height: "100%",
    padding: 5,
    paddingVertical: 10,
    gap: 5,
    justifyContent: "center",
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dataText: {
    color: "white",
    fontSize: 13,
    fontWeight: 600,
  },
  btmrpTextPrice: {
    fontSize: 13,
    color: "#b5b0b0fc",
    fontWeight: 600,
  },
  btmrpText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: 600,
  },
  lineThrough: {
    width: 40,
    height: 2,
    backgroundColor: "#b5b0b0fc",
    position: "absolute",
    transform: [{ rotate: "-20deg" }],
    left: 35,
    bottom: 8,
  },
  detailsCol: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    gap: 10,
  },
  rightRow: {
    width: "50%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 30,
    width: "90%",
    height: "70%",
  },
  modalImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 200,
    // objectFit: "contain",
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0069cb",
    textAlign: "center",
  },
  modalTitleErr: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    marginVertical: 30,
    color: "#6C7278",
  },
  leftRow: {
    width: "50%",
  },
  rowHead: {
    fontSize: 17,
    fontWeight: "bold",
    color: "grey",
  },
  rowBd: {
    fontSize: 15,
    fontWeight: "semibold",
    color: "#0069CB",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
  },
  listContainer: {
    marginBottom: 0,
  },
  iconText: {
    width: 40,
    height: 30,
    textAlign: "center",
  },
  skillContainer: {
    margin: 10,
  },
  skillText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: "#0069CB",
    color: "#0069CB",
    borderWidth: 2,
  },
  itemContainer: {
    marginVertical: 2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  btnView: {
    padding: 5,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS == "android" ? 10 : 50,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -7,
  },
  bullet: {
    fontSize: 20,
    color: "grey",
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  subHeadText: {
    color: "grey",
    fontWeight: 500,
    fontSize: 16,
    margin: 10,
    marginTop: 5,
    textAlign:"justify"
  },
  subHead: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  info: {
    paddingBottom: 20,
  },
  jd: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  jobCategoryItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1.5,
    paddingHorizontal: 20,
    height: 40,
    // marginRight: 15,
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    // borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedJobCategory: {
    borderBottomColor: "#0069CB",
    borderBottomWidth: 3,
  },
  jobCategoryText: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
    padding: 5,
  },
  selectedJobText: {
    fontSize: 14,
    color: "#0069CB",
  },
  jobCategoryBar: {
    // marginHorizontal: 10,
    flexDirection: "row",
    paddingVertical: 0,
  },
  detailsCont: {
    padding: 20,
  },
  part: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "50%",
    marginVertical: 5,
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-evenly",
  },
  type: {
    backgroundColor: "#fff",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: "semibold",
    color: "grey",
    borderWidth: 0.5,
    borderColor: "grey",
  },
  part1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginVertical: 5,
  },
  detail: {
    fontSize: 16,
    fontWeight: 600,
    color: "white",
  },
  rowDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  upperPart: {
    // backgroundColor: "#0069cb",
    height: Platform.OS == "android" ? 380 : 450,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === "android" ? 0 : 40,
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: Platform.OS == "android" ? 50 : 60,
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  rightside: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  topBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  roleText: {
    fontWeight: "600",
    fontSize: 22,
    color: "#fff",
    // backgroundColor:"red"
  },
  compText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginLeft: 10,
  },
  line: {
    width: 0,
    height: 20,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  rev: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 500,
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 5,
  },
  subText: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 12,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dottedLine: {
    marginHorizontal: "auto",
    width: "90%",
    height: 0,
    borderColor: "#fff",
    borderStyle: "dashed",
    borderWidth: 1.4,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletContent: {
    fontSize: 18,
    marginRight: 8,
    color: "black",
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "black",
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

export default BuyCourses;
