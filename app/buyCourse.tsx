import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Demo from "./Demo";
import apiInstance from "./interceptors";
import SwipeButton from "rn-swipe-button"
import VideoListScreen from "./Video"
import { Image } from 'expo-image';

function BuyCourses() {
  const navigation = useNavigation();
  const [selectedInfo, setSelectedInfo] = useState("Overview");
  const goBack = () => {
  // router.back(); // goes back
  // router.setParams({ my: "false" }); // set params on previous screen
  // console.log("false sending")
  router.replace({ pathname: '/courses', params: {} });

};

  const route = useRoute();
const local = useLocalSearchParams();

const courseId = route?.params?.id ?? local?.courseId;
const isPurchased = route?.params?.isPurchased ?? local?.isPurchased;

 useEffect(()=>{
  if(isPurchased){
    getCourseDetails();
    console.log('ispurchased is trur here so calling the courses api again')
  }
 },[isPurchased])





  const jobArray = [
    {
      id: 1,
      name: "Overview",
    },
    {
      id: 2,
      name: "FAQ's",
    },
    {
      id: 3,
      name: "Notes",
    },
    {
      id: 4,
      name: "Interview Questions",
    },
    {
      id: 5,
      name: "Certificate",
    },
  ];

  const [loading, setLoading] = useState(false)
  const [buying, setBuying] = useState(false)
  const [isCoursePurchased, setIsCoursePurchased] = useState(false)
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseImage, setCourseImage] = useState("");
  const [courseNotes, setCourseNotes] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    getCourseDetails();
    addCourseView();
  }, [])

  const getCourseDetails = async () => {
    try {
      setLoading(true)
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);

      // console.log(formData);
      const response = await apiInstance.post(
        `course/details/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.status) {
        // console.log("course details", response.data.data)
        setCourseDetails(response.data.data.course_details[0])
        let imgLink = response.data.data.course_details[0].url
        let newLink =`https://godigiinfotech.com/${imgLink}`
        setCourseImage(newLink)
        setCourseNotes(response.data.data.course_notes)
        setFaqs(response.data.data.course_faqs)
        setIsCoursePurchased(response.data.data.is_purchased)
        // console.log("this is course is purchased",response.data.data.is_purchased)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.jobCategoryItem,
        selectedInfo === item.name && styles.selectedJobCategory,
      ]}
      onPress={() => { setSelectedInfo(item.name); }}
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

  const renderSkills = ({ item }) => (
    <View style={styles.skillContainer}>
      <Text style={styles.skillText}>{item.subject_name}</Text>
    </View>
  );

  const width = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  useEffect(() => {
    width.value = withTiming(300, {
      duration: 5000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const extendFaq = (id) => {
    console.log(id)
    let newFaq = faqs.map((item) => item.id == id ? { ...item, extended: !item.extended } : { ...item, extended: false })
    console.log(newFaq)
    setFaqs(newFaq)
  }

  const renderFaq = ({ item }) => {
    return (
      //   <TouchableOpacity onPress={()=>extendFaq(item.id)} style={[styles.faqView, item.extended
      // ? { borderTopColor: Colors.bg, borderTopWidth: 3 }
      // : {}]}>
      <TouchableOpacity onPress={() => extendFaq(item.id)} style={[styles.faqView]}>
        {
          item.extended &&
          // <View style={[styles.borderView,animatedStyles]}></View>
          <Demo />
        }
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: item.extended ? Colors.bg : "black", width: "90%", fontWeight: item.extended ? 600 : 400, }} numberOfLines={item.extended ? 10 : 2}>{item.question}</Text>
          <Entypo name="plus" size={24} color={Colors.bg} />
        </View>
        {
          item.extended &&
          <View style={{ backgroundColor: "#F2F4FA", borderRadius: 5, padding: 3, marginTop: 10 }}>
            <AutoHeightWebView
              style={{ width: "100%" }}
              customStyle={`
    * {
      font-size: ${Platform.OS === "android" ? 13 : 40}px !important;
      line-height: ${Platform.OS === "android" ? 18 : 50}px !important;
      color: #000;
      box-sizing: border-box;
      word-wrap: break-word;
    }
    body {
      padding: 5px;
      margin: 0;
      background-color: transparent;
      -webkit-text-size-adjust: 100%;
      overflow: hidden !important; /* hide scrollbars */
    }
    ::-webkit-scrollbar {
      display: none; /* for WebKit browsers */
    }
  `}
              source={{ html: item.answer }}
              scalesPageToFit={false}
              scrollEnabled={true}
            />

          </View>

        }
      </TouchableOpacity>
    )
  }

  const router = useRouter();
   const goToChatScreen = () => {
    router.push({
      pathname: '/chatbot',
      params: { courseId: courseId,isPurchasedCourse:false }
    })
  }


  React.useEffect(() => {
    if (isPurchased) {
      console.log("User successfully purchased ✅", route);
      getCourseDetails();
    }
  }, [isPurchased]);

  const goToApplications = () => {
    router.push("/application");
  };
  const goToPaymentScreen = (url) => {
    router.push(
      {
        pathname: "/paymentScreen",
        params: { paymentUrl: url, courseId: courseId }
      }
    );
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

    const openBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url); // opens in default browser
    } else {
      console.log("Can't open this URL:", url);
    }
  };

   const swipeRef = useRef(null);

     const [showButton, setShowButton] = useState(true);

  const handleBuyCourse = async () => {
    //  goToPaymentScreen(`https://www.godigiinfotech.com/my-course-details/${courseId}`)
    //  goToPaymentScreen(`https://www.godigiinfotech.com/login`)
   
     setShowButton(false);
    setTimeout(() => setShowButton(true), 100);

    try {
      setBuying(true)
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      formdata.append("order_reference_type", "course");
      formdata.append("course_id", courseId);
      formdata.append("order_from", "android");
      console.log(formdata)
      const response = await apiInstance.post(`course/generate-payment-url/${courseId}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data)
      if (response.data.status) {
        // goToPaymentScreen(response.data)
        // goToUrl(response.data.payUrl)
         openBrowser(response.data.data.payment_url);
      }
      // goToPaymentScreen("https://www.godigiinfotech.com/transaction-success-app")
    } catch (error) {
      console.log(error)
    }
    finally {
      setBuying(false);
    }
  }

//   const handleBuyCourse = () => {
//   const url = "exp://192.168.1.17:8082/--/(main)/(tabs)/profile";
//   Linking.openURL(url).catch(err => 
//     console.error("Failed to open URL:", err)
//   );
// };

    const goToUrl = async (url) => {
      try {
        const supported = await Linking.canOpenURL(`${url}`);
  
        if (supported) {
          // await Linking.openURL(`https://${url}`);
          await Linking.openURL(`${url}`);
        } else {
          Alert.alert("Error", `Can't open this URL: ${url}`);
        }
      } catch (error) {
        console.error("Failed to open URL:", error);
      }
    };

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




  const renderNote = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    return (
      <TouchableOpacity style={styles.noteCard} onPress={() =>
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
        </View>

        <View style={{backgroundColor:"green",borderRadius:5,paddingHorizontal:5,paddingVertical:1}}>
       
               <Text style={{color:"white",fontSize:10,fontWeight:600}}>Free Access</Text>
               </View>
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
        </View>

       <View style={{backgroundColor:"green",borderRadius:5,paddingHorizontal:5,paddingVertical:1}}>
       
               <Text style={{color:"white",fontSize:10,fontWeight:600}}>Free Access</Text>
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

      // console.log("response of view api data", response.data);
    } catch (error) {
      console.log("this is err ", error);
    }
  };



  const [scrolledHeight, setScrolledHeight] = useState(0);
  const handleScroll = (e) => {
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
  const htmlContentFAQ = `
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

  const goToNotifications = () => {
    router.push("/notifications")
  }

  useEffect(()=>{
      console.log("this is course image",courseImage)
  },[courseImage])

  return (
    <>
      {/* {scrolledHeight < 25 ? (
        <StatusBar barStyle={"light-content"} />
      ) : (
        <StatusBar hidden={true} translucent backgroundColor="transparent" />
      )} */}
      {
        loading
          ?
          <ActivityIndicator style={{ marginTop: 50 }} />
          :
          <View style={{ flex: 1 }}>
           
              <View style={styles.topPart}>
              <Feather name="arrow-left" size={24}
                  color="#fff"
                  onPress={goBack}
                />
                <Text style={styles.pageName}>Course Details</Text>
                <View>
                  {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} /> */}
                </View>
              </View>
              
            <Animated.ScrollView
              onScroll={(e) => handleScroll(e)}
              scrollEventThrottle={16}
              entering={FadeInDown.duration(500).delay(200)}
              style={styles.bgMain}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
             
               <View style={styles.topBased}>
                <View style={{backgroundColor:'#fff',height:200,width:"100%"}}>
                {
                  courseDetails.url == null
                    ?
                    <Image
                      source={ImagesPath.cDummy}
                      style={{ width: "100%", height: "200", borderRadius: 10 }}
                       contentFit="fill"
             transition={1000}
                    />
                    :
                    <Image
                      source={{ uri: courseImage }}
                      style={{ width: "100%", height: "200", borderRadius: 10 }}
                       contentFit="fill"
             transition={1000}
                    />

                }
                </View>
                <View style={[styles.priceView,{position:'absolute',top:180,width:'95%',left:20}]}>
                  <View style={styles.timeCont}>
                    <FontAwesome name="clock-o" size={16} color={Colors.bg} />
                    <Text style={styles.levelText}>{"60 hrs" || "NA"}</Text>
                  </View>
                   <Text style={styles.lessText}>({courseDetails?.chapter_count || "NA"} lessons)</Text>

                </View>
                <View style={styles.priceView}>
                  <View style={{ flexDirection: "row", gap: 1 }}>
                    <Feather name="bar-chart" size={18} color={Colors.bg} />
                    <Text style={styles.levelText}>{courseDetails?.level || "Basic"} Level</Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 5, gap: 20 }}>
                    <View
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <FontAwesome name="rupee" size={18} color={"#000"} />
                      <Text style={styles.coursePrice}>{Number(courseDetails.price?.split(".")[0]).toLocaleString()}</Text>
                    </View>
                   <View
                                     style={{
                                       justifyContent: "center",
                                       flexDirection: "row",
                                       alignItems: "center",
                                       width:60,
                                     }}
                                   >
                                     <FontAwesome name="rupee" size={12} color={"#929090ff"} />
                                     <Text style={styles.mrpName}>{courseDetails?.mrp?.split(".")[0] || "NA"}</Text>
                                     <View style={styles.lineThrough}></View>
                                   </View>
                  </View>

                </View>
                <View style={styles.priceView}>
                  <Text style={styles.roleText}>{courseDetails?.title}</Text>
                </View>
                <View style={styles.dottedLine}></View>
                <View>
                  <View style={styles.typeView}>
                    {["Online", "Projects", courseDetails?.language].map((i, index) => {
                      // Return the Text component for each job type
                      return (
                        <View style={styles.type}>
                        <Text style={styles.typeText} key={index}>
                          {i}
                        </Text>
                        </View>  
                      );
                    })}
                  </View>
                </View>
                <View>
                </View>


              </View>
              <View style={{ height: 50, marginHorizontal: 20 }}>
                <FlatList
                  contentContainerStyle={{
                    justifyContent: "space-evenly",
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
                    {/* <Text style={styles.subHead}>About Course</Text> */}
                    <AutoHeightWebView
                      customStyle={`
                                            * {font-family: -apple-system, Roboto, Arial; font-size:14px; color:#333;}
                                            body {marginTop:0; padding:0;}
                                          `}
                      source={{ html: htmlContentDesc }}
                      startInLoadingState
                      viewportContent={"width=device-width, user-scalable=no"}
                      scrollEnabled={false}
                      style={{ width: "100%", }}
                    />
                  </View>
                  <View style={[styles.jd, { marginVertical: 30 }]}>
                    <Text style={{ fontSize: 14, fontWeight: 600, color: 'black' }}>Skills you will learn?</Text>
                    <FlatList
                      data={courseNotes}
                      renderItem={renderSkills}
                      numColumns={3}
                      keyExtractor={(item) => item.id}
                      columnWrapperStyle={{ flexWrap: 'wrap' }}
                      contentContainerStyle={styles.listContainer}
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              justifyContent: "center",
                              padding: 10,
                              marginTop: 50
                            }}
                          >
                            <Text
                              style={{
                                color: "gray",
                                fontWeight: 600,
                                textAlign: "center",
                              }}
                            >
                              No skills added for this course yet!
                            </Text>
                          </View>
                        );
                      }}
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

              {selectedInfo == "FAQ's" && (
                <View>
                  <View style={styles.jd}>
                    <FlatList
                      data={faqs}
                      keyExtractor={(item) => item.id}
                      renderItem={renderFaq}
                      style={{ marginTop: 10 }}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ padding: 5 }}
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              justifyContent: "center",
                              padding: 10,
                              marginTop: 50
                            }}
                          >
                            <Text
                              style={{
                                color: "gray",
                                fontWeight: 600,
                                textAlign: "center",
                              }}
                            >
                              No FAQ's yet!
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                </View>
              )}


              {selectedInfo == "Notes" && (
                <View style={styles.jd}>
                  <FlatList
                    data={courseNotes}
                    style={{ maxHeight: 450 }}
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
                            marginTop: 50
                          }}
                        >
                          <Text
                            style={{
                              color: "gray",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            No Notes added for this course yet!
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              {selectedInfo == "Interview Questions" && (
                <View style={styles.jd}>
                  <FlatList
                    data={courseNotes}
                    keyExtractor={(item) => item.id}
                    style={{ maxHeight: 450 }}
                    nestedScrollEnabled={true}
                    renderItem={renderItemInterviewQuestions}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            padding: 10,
                            marginTop: 50
                          }}
                        >
                          <Text
                            style={{
                              color: "gray",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            No Interview Questions  added for this course yet!
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              {selectedInfo == "Certificate" && (
                <View style={styles.jd}>
                  <Text style={styles.certHead}><FontAwesome5 name="graduation-cap" size={20} color="black" /> Certificate of Completion</Text>
                  <Text style={styles.subHead}>Upon successfully finishing the {courseDetails?.title || "this"} course, you’ll receive an industry-recognized Certificate of Completion - a testament to your newly acquired skills and dedication.</Text>


                  <Image
                    source={ImagesPath.certificate}
                    style={{
                      height: 200,
                      marginTop: 30,
                      width: "100%",
                    }}
                     contentFit="fill"
             transition={1000}
                  />
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.certHeading}>This certificate can be:</Text>
                    <View style={styles.item}>
                      <Text style={styles.bulletContent}>{"\u2022"}</Text>
                      <Text style={styles.text}>Shared on LinkedIn to boost your professional profile</Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.bulletContent}>{"\u2022"}</Text>
                      <Text style={styles.text}>Added to your resume or portfolio to showcase your expertise
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.bulletContent}>{"\u2022"}</Text>
                      <Text style={styles.text}>Used to demonstrate your readiness for developer roles, freelance gigs, or startup projects
                      </Text>
                    </View>
                    <Text style={styles.subHead}>Designed to reflect your achievement and the comprehensive knowledge you’ve gained, this certificate is more than just a document - it’s your <Text style={{ fontWeight: 600, fontSize: 14, color: 'black' }}>launchpad into the tech world</Text>.</Text>
                  </View>
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
            {
              !isCoursePurchased && showButton &&
            <View style={styles.buttonContainer}>
                <SwipeButton
                  ref={swipeRef}  
                  containerStyles={{
                    borderRadius: 30,
                    overflow: "hidden",
                    borderWidth: 0,          // ✅ removes container border
                  }}
                  railBackgroundColor={Colors.bg}  // 👈 show gradient instead of rail
                  railFillBackgroundColor={"#fff"}       // 👈 red fill when swiped
                  title="Swipe to Buy Course"
                  titleColor="#fff"
                  titleFontSize={16}
                  onSwipeSuccess={handleBuyCourse}
                  enableReverseSwipe={false}
                  // onSwipeStart={}
                  titleStyles={{ fontSize: 16, fontWeight: 500 }}
                  railBorderColor={"red"}

                  railFillBorderColor={Colors.bg}
                  thumbIconBackgroundColor="#fff"
                  thumbIconComponent={() => (
                    <AntDesign name="double-right" size={24} color={Colors.bg}/>
                  )}
                />

            </View> 
            }
              {/* <ThemeBtn btnTitle={"Buy Now"} onPress={handleBuyCourse} loadingBtn={buying}/> */}
          </View>
      }
     <TouchableOpacity onPress={goToChatScreen} style={{ position: 'absolute', bottom: !isCoursePurchased && showButton ? 80 :20, right: 20, backgroundColor: Colors.bg, padding: 15, borderRadius: 40 }}>
             <Entypo name="chat" size={24} color={"#fff"} />
           </TouchableOpacity>
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
    paddingTop: 5,
    paddingBottom: 15,
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
    shadowColor: "lightgray",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  noteInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width:'60%'
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    width: "80%",
    color: "black"
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
    fontSize: 14,
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
    width: 50,
    height: 2,
    backgroundColor: "#AEAEAE",
    position: "absolute",
    // transform: [{ rotate: "-20deg" }],
    left: -5,
    bottom: 12,
  },
  mrpName: {
    fontSize: 12,
    color: "#AEAEAE",
    textAlign:'center'
  },
  detailsCol: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 40,
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
    // backgroundColor:'red',
    paddingHorizontal:5,
    paddingVertical:3,
    borderRadius:20,
    borderWidth:2,
    borderColor:Colors.bg
  },
  borderView: {
    backgroundColor: "red",
    height: 1,
  },
  faqView: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  skillText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    // borderColor: "#0069CB",
    color: "#0069CB",
    // borderWidth: 2,
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
    textAlign: "justify"
  },
  subHead: {
    color: "#000",
    fontSize: 14,
    paddingVertical: 10
  },
  certHead: {
    fontWeight: 600,
    fontSize: 16
  },
  info: {
    paddingBottom: 20,
  },
  jd: {
    paddingHorizontal: 20,
    marginVertical: -5,
  },
  jobCategoryItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1.5,
    paddingHorizontal: 15,
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
    justifyContent: "space-evenly",
  },
  type: {
    backgroundColor: "#F2F4FA",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "25%",
    textAlign: 'center',
    justifyContent:'center',
    alignItems:'center'
  },
  typeText:{
     fontSize: 14,
    fontWeight: "semibold",
    color: "gray",
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
    height: Platform.OS == "android" ? 320 : 320,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === "android" ? 0 : 40,
  },
  // topPart: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingVertical: 20,
  //   paddingHorizontal: 20,
  //   paddingTop: Platform.OS == "android" ? 50 : 70,
  //   backgroundColor: Colors.bg
  // },
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
    color: "#fff"
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  topBased: {
    backgroundColor: "#fff",
    marginBottom: 10,
    margin: 15,
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  priceView: {
    // backgroundColor:"yellow",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    alignItems: 'center'
  },
  timeCont: {
    backgroundColor: "#fff",
    // position: "absolute",
    // top: 120,
    // left: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  coursePrice: {
    fontSize: 15,
    fontWeight: 800,
    marginVertical: 3,
    color: "#2C2C2C",
  },
  levelText: {
    fontSize: 12,
    fontWeight: 600,
    marginVertical: 3,
    // color: Colors.bg,
    color: "gray",
  },
  lessText: {
    fontSize: 12,
    fontWeight: 600,
    marginVertical: 3,
    // color: Colors.bg,
    color: "#fff",
  },
  roleText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
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
    width: "100%",
    height: 0,
    borderColor: "#828282",
    borderStyle: "dashed",
    borderWidth: 0.8,
    marginVertical: 10
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bulletContent: {
    fontSize: 18,
    marginRight: 8,
    color: "black",
  },
  certHeading: {
    fontWeight: 600,
    marginVertical: 5,
    fontSize: 14,
    color: "black"
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
