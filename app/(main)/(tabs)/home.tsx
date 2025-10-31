import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInUp } from "react-native-reanimated";
import React, { useContext, useEffect, useRef, useState } from "react";
import Constants from "expo-constants";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import ThemeBtn from "@/components/ThemeBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "@/app/interceptors";
import AutoSwiperBanner from "@/app/autoSwiper";
import { BlurView } from "expo-blur";
import WebView from "react-native-webview";
import { useIsFocused } from "@react-navigation/native";
import { Image } from 'expo-image';
import { UserContext } from "@/app/UserContext";

const screenWidth = Dimensions.get("window").width
// console.log(screenWidth)

function Home() {

  const [internshipsData, setInternshipsData] = useState([]);
  const [examsData, setExamsData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [interviewQuestionsData, setInterviewQuestionsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [bannersData, setBannersData] = useState([]);
  const [bannersText, setBannersText] = useState();
  const [loadingDashData, setLoadingDashData] = useState(false);
  const [appVersionOutdated, setAppVersionOutdated] = useState();

  // useEffect(()=>{
  //   console.log("thises is state",jobsData)
  // },[jobsData])








  const goToJobDetails = (id) => {
    router.push({
      pathname: "/applyJobs",
      params: { id: id, prf: "Job" },
    });
  };
  const goToInterDash = (id) => {
    router.push("/dashIntern")
  };
  const goToCourseDetailsPage = (id) => {
    router.push({
      pathname: "/buyCourse",
      params: { id: id },
    });
  };
  const goToIntenshipDetails = (id) => {
    router.push({
      pathname: "/applyJobs",
      params: { id: id, prf: "Internship" }, // pass the param here
    });
  };
  const goToInterviewQuestionDetails = (id) => {
    router.push({
      pathname: "/interviewQuestionsDetails",
      params: { id: id }, // pass the param here
    });
  };

  const navigation = useNavigation();
  const goToNotesDetails = (id) => {
    navigation.navigate("PDFViewerScreen", {
      subjectId: id,
    });
  }

  const [selectedJob, setSelectedJob] = useState("Jobs");
  const {setIsUserOfflineStudent} = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page of the carousel



  const renderRecJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recJob}
      onPress={() => goToJobDetails(item.id)}
    >
      <View style={styles.topPartRec}>
        <View style={{ width: "70%" }}>
          <Text style={styles.roleText} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.compText}>{item.company_name}</Text>
        </View>
        {
          item.img_url == null
            ?
            <View style={styles.nameBg}>
              <Text style={{ color: Colors.bg, fontWeight: 600, fontSize: 25 }}>{item?.company_name.charAt(0)}</Text>
            </View>
            :
            <View style={styles.imageBg}>
              <Image
                source={{ uri: `https://godigiinfotech.com/${item.img_url}` }}
                style={{ width: 50, height: 50, }}
                transition={1000}
                contentFit="scale-down"
              />
            </View>
        }
      </View>
      <View style={styles.package}>
        <Text style={styles.subText}>{item.salary}</Text>
      </View>
      <View style={styles.typeView}>
        {/* {type.map((i, index) => {
           // Return the Text component for each job type
           return (
             <Text style={styles.type} key={index}>
               {i}
             </Text>
           );
         })} */}
        <Text style={styles.type}>
          {item.job_work_type_title || "NA"}
        </Text>
        <Text style={styles.type}>
          {item.job_working_type_title || "NA"}
        </Text>
      </View>
      <View style={styles.dottedLine}></View>
      <View style={styles.bottompart}>
        <View style={styles.btRightPart}>
          <Entypo name="location-pin" size={24} color="#929090ff" />
          <Text style={[styles.btsubText, { width: "60%" }]} numberOfLines={1} ellipsizeMode="tail">{item.city_names}</Text>
        </View>
        <View style={styles.btLeftPart}>
          {/* <Text style={styles.btsubText}>{item.posted}</Text> */}
          <Text style={styles.momentText}>{item.no_of_openings} vacancies</Text>
          {/* <FontAwesome name="bookmark" size={24} color="#0069CB" /> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  const coursesListItem = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    return (
      <TouchableOpacity
        style={styles.basedJob}
        onPress={() => goToCourseDetailsPage(item.id)}
      >
        {/* <BlurView
          intensity={100}
          tint="dark"
          style={{ height: 150, borderRadius: 100 }}
        >
        </BlurView> */}
        {/* <Image
            source={{ uri: newUrl }}
            style={{
              width: "100%",
              height: 150,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          /> */}
        {item.url !== null ?
          <Image
            source={{ uri: newUrl }}
            //  source={ImagesPath.banner}
            style={{
              width: "100%",
              height: 150,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            contentFit="fill"
            transition={1000}
          />
          :
          <Image
            source={ImagesPath.cDummy}
            //  source={ImagesPath.banner}
            style={{
              width: "100%",
              height: 150,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            contentFit="fill"
            transition={1000}
          />
        }
        <View style={styles.timeCont}>
          <FontAwesome name="clock-o" size={16} color={Colors.bg} />
          <Text style={styles.levelText}>{item.video_duration || "NA"}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 1 }}>
              <Feather name="bar-chart" size={16} color={Colors.bg} />
              <Text style={styles.levelText}>{item.level || "Basic"} Level</Text>
            </View>
            <Text style={styles.levelText}>({item.chapter_count} lessons)</Text>
          </View>
          <Text
            style={styles.coursesName}
          // numberOfLines={1}
          // ellipsizeMode="tail"
          >
            {item.title}
          </Text>
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
              <Text style={styles.coursePrice}>{Number(item.price?.split(".")[0]).toLocaleString()}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome name="rupee" size={16} color={"gray"} />
              <Text style={styles.mrpName}>
                {item.mrp
                  ? Number(item.mrp.toString().split(".")[0]).toLocaleString()
                  : "NA"}
              </Text>


              <View style={styles.lineThrough}></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderInternshipCard = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.img_url}`;
    return (
      <TouchableOpacity
        style={styles.basedJob}
        onPress={() => goToIntenshipDetails(item.id)}
      >
        {item.img_url !== null ?
          <Image
            source={{ uri: newUrl }}
            //  source={ImagesPath.banner}
            style={{
              width: "100%",
              height: 150,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            contentFit="fill"
            transition={1000}
          />
          :
          <Image
            source={ImagesPath.iDummy}
            //  source={ImagesPath.banner}
            style={{
              width: "100%",
              height: 150,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            contentFit="fill"
            transition={1000}
          />
        }
        {/* <Image
         //  source={{ uri: newUrl }}
          source={ImagesPath.banner}
          style={{
            width: "100%",
            height: 150,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        /> */}
        {/* <View style={styles.timeCont}>
         <FontAwesome name="clock-o" size={16} color={Colors.bg} />
         <Text style={styles.levelText}>6h 40m</Text>
       </View> */}
        <View style={{ padding: 10 }}>
          <Text
            style={styles.coursesName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 5, gap: 20 }}>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Entypo name="location-pin" size={24} color="#929090ff" />
              <Text style={[styles.btsubText, { width: "100%" }]} numberOfLines={1} ellipsizeMode="tail">{item.city_names}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const logAllAsyncStorageItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      stores.forEach(([key, value]) => {
        try {
          const parsedValue = JSON.parse(value);
          console.log(`${key}:`, parsedValue);
        } catch (err) {
          console.log(`${key}:`, value); // fallback if not JSON
        }
      });
    } catch (error) {
      console.error("Failed to load AsyncStorage:", error);
    }
  };




  const renderNotes = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    return (
      <TouchableOpacity onPress={() => goToNotesDetails(item.id)} style={styles.topCmp}>
        {/* <Image source={item.src} /> */}
        {/* {Icon && <Icon name={iconName} size={30} color={iconColor} />} */}
        <Image source={{ uri: newUrl }} style={{ height: 50, width: 50 }}
          contentFit="fill"
          transition={1000}
        />
        <Text style={styles.roleTextTop}>{item.subject_name}</Text>
        {/* {item.type == "Paid" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="rupee" size={16} color={Colors.bg} />
            <Text style={styles.ExamPrice}>{item.price}</Text>
          </View>
        ) : (
          <Text style={styles.ExamTextTop}>{item.type}</Text>
        )} */}
      </TouchableOpacity>
    );
  };

  const type = ["Full Time", "Remote", "Director"];

  const renderInterviewQuestions = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    return (
      <TouchableOpacity
        onPress={() => goToInterviewQuestionDetails(item.id)}
        style={styles.topCmp}
      >
        {/* <Image source={item.src} /> */}
        <Image
          source={{ uri: newUrl }}
          style={{ height: 50, width: 50 }}
          contentFit="fill"
          transition={1000}
        />
        <Text style={styles.roleTextTop}>{item.subject_name}</Text>
        <Text style={styles.questionCount}>
          ({item.question_count} questions )
        </Text>
        {/* {item.type == "Paid" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="rupee" size={16} color={Colors.bg} />
            <Text style={styles.ExamPrice}>{item.price}</Text>
          </View>
        ) : (
          <Text style={styles.ExamTextTop}>{item.type}</Text>
        )} */}
      </TouchableOpacity>
    );
  };








  // Handle page change in the PagerView
  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const router = useRouter();
  const goToNotifications = () => {
    router.push("/notifications");
  };
  const goToSearch = () => {
    router.push("/search");
  };
  const goToJobsListing = () => {
    router.push("/(main)/(tabs)/jobs");
    //  router.push(`/buyCourse?id=${1}`);
  };
  const goToCourseListing = () => {
    router.push("/(main)/(tabs)/courses");
  };
  const goToQuestionsListing = () => {
    router.push("/interviewQuestions");
  };
  const goToNotesListing = () => {
    router.push("/notes");
  };
  const goToInternshipListing = () => {
    router.push("/internships");
  };

  const checkVersionOutdatedOrNot = (latestVersion) => {

    const currentVersion = Constants.expoConfig?.version || "1.0.0"
    const a1 = latestVersion.split('.').map(Number);
    const a2 = currentVersion.split('.').map(Number);
    console.log(a1, a2)

    for (let i = 0; i < Math.max(a1.length, a2.length); i++) {
      const n1 = a1[i] || 0;
      const n2 = a2[i] || 0;
      if (n1 > n2) return 1;
      if (n1 < n2) return -1;
      console.log(n1, n2)
    }
    console.log(0)
    return 0; // equal
  }


  const getDashboardData = async () => {
    try {
      setLoadingDashData(true)
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      console.log("usetoken is", userTok)
      const formdata = new FormData();
      formdata.append("token", userTok);
      const response = await apiInstance.post("dashboard", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        setInternshipsData(response.data.data.internships);
        setNotesData(response.data.data?.notes);
        setInterviewQuestionsData(response.data.data?.question_answers);
        setBannersData(response.data.data?.banners);
        setCoursesData(response.data.data?.courses);
        let bannerData = {
          text: response?.data?.data.banner_text,
          btnText: response?.data?.data.banner_btn_text
        }
        setBannersText(bannerData);
        setIsUserOfflineStudent(response.data.is_offline_batch)
        //  const currentVersion = Constants.expoConfig?.version || "1.0.0"

        let latestVersion = Platform.OS == "ios" ? response.data.app_version_ios : response.data.app_version_android
        let verCheck = checkVersionOutdatedOrNot(latestVersion)
        if (verCheck == 1) {
          router.replace("/updateScreen")
        }
        // console.log("latestVersion",latestVersion,currentVersion)
        // if(latestVersion !== currentVersion ){
        // }

        // console.log("thisesa are jobs",response.data.data.jobs.length);
        setJobsData(response.data.data.jobs);
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoadingDashData(false)
    }
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getDashboardData();
    setRefreshing(false);
  };

  const isFocused = useIsFocused(); // ✅ to track current focus

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (isFocused) {
        getDashboardData();
      }
    });

    return unsubscribe;
  }, [navigation, isFocused]);

  return (
    <View style={styles.bg}>
      <ScrollView
        style={styles.mainBg}
        contentContainerStyle={{ paddingBottom: 110 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >


        {loadingDashData ? (
          <ActivityIndicator style={{ marginTop: 50 }} />
        ) : (
          <>
            {
              bannersData && bannersData.length > 0
              &&
              <AutoSwiperBanner data={bannersData} />
            }


            <Animated.View
              entering={FadeInRight.duration(500).delay(100)}
              style={styles.pagerView}
            >
              <View style={styles.pagerTop}>
                <Text style={styles.tipsText} onPress={logAllAsyncStorageItems}>
                  Jobs for You
                </Text>
                <Text style={styles.seeAll} onPress={goToJobsListing}>
                  See all
                </Text>
              </View>
              <Text style={styles.tipsTextSec}>Job openings available for you - Apply easily</Text>
              <FlatList
                horizontal
                data={jobsData}
                renderItem={renderRecJobItem}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 5 }}
                style={styles.jobCont}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        width: screenWidth,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        No Jobs found!
                      </Text>
                    </View>
                  );
                }}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInRight.duration(500).delay(100)}
              style={styles.pagerView}
            >
              <View style={styles.pagerTop}>
                <Text style={styles.tipsText} onPress={logAllAsyncStorageItems}>
                  Courses for You
                </Text>
                <Text style={styles.seeAll} onPress={goToCourseListing}>
                  See all
                </Text>
              </View>
              <Text style={styles.tipsTextSec}>Learn from courses - designed industry-leading experts</Text>
              <FlatList
                horizontal
                data={coursesData}
                renderItem={coursesListItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingVertical: 5 }}
                showsHorizontalScrollIndicator={false}
                style={styles.jobCont}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        width: screenWidth,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        No Courses found!
                      </Text>
                    </View>
                  );
                }}
              />
            </Animated.View>



            <TouchableOpacity
              // entering={FadeInUp.duration(1000).delay(100)}
              style={styles.cardView}
              onPress={goToInterDash}
            >
              <View style={{ width: "55%" }}>
                <Text style={styles.hireText}>
                </Text>
                <WebView
                  originWhitelist={["*"]}
                  source={{
                    html: `
      <html>
        <head>
          <style>
            body {
              font-size: 50px !important ;     /* Increase text size */
              // line-height: 1.5;
              color: #333;
              margin: 0;
              overflow:hidden;
              // padding: 10px;
              // text-align: center;  /* Optional: center text */
            }
          </style>
        </head>
        <body>
          ${bannersText?.text || ""}
        </body>
      </html>
    `,
                  }}
                  startInLoadingState
                  style={{ backgroundColor: "transparent" }} // Removes white background if needed
                />
              </View>
              <View style={{ width: "45%", justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={ImagesPath.dashBlock}
                  style={{ width: 40, height: 80, }}
                  contentFit="fill"
                  transition={1000}
                />
                <LinearGradient
                  colors={["#F16063", "#FFC656"]}
                  locations={[0, 1]}
                  start={{ x: 0, y: 1 }} // Start from top-left corner
                  end={{ x: 1, y: 0 }}
                  // style={styles.themeBtn}
                  style={{ position: "absolute", padding: 5, borderRadius: 5, width: 130 }}
                >

                  <TouchableOpacity onPress={goToInterDash} ><Text style={{ color: "#fff", fontWeight: 500, fontSize: 12, textAlign: 'center' }}>{bannersText?.btnText}</Text></TouchableOpacity>
                </LinearGradient>
              </View>
            </TouchableOpacity>

            <View style={styles.pagerView}>
              <View style={styles.pagerTop}>
                <Text style={styles.tipsText}>Internships for You</Text>
                <Text style={styles.seeAll} onPress={goToInternshipListing}>
                  See all
                </Text>
              </View>
              <Text style={styles.tipsTextSec}>Internship opportunities open - Apply today</Text>
              <FlatList
                data={internshipsData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderInternshipCard}
                contentContainerStyle={{ paddingVertical: 5 }}
                style={styles.jobCont}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        width: screenWidth,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        No Internships found!
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            <View style={styles.pagerView}>
              <View style={styles.pagerTop}>
                <Text style={styles.tipsText}>Notes for You</Text>
                <Text style={styles.seeAll} onPress={goToNotesListing}>
                  See all
                </Text>
              </View>
              <Text style={styles.tipsTextSec}>Learn from notes - written by industry experts</Text>
              <FlatList
                data={notesData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderNotes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingVertical: 5 }}
                style={styles.jobCont}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        width: screenWidth,
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        No notes found!
                      </Text>
                    </View>
                  );
                }}
              />
            </View>

            <View style={styles.pagerView}>
              <View style={styles.pagerTop}>
                <Text style={styles.tipsText}>Interview Questions</Text>
                <Text style={styles.seeAll} onPress={goToQuestionsListing}>
                  See all
                </Text>
              </View>
              <Text style={styles.tipsTextSec}>Top interview questions with expert guidance</Text>
              <FlatList
                data={interviewQuestionsData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderInterviewQuestions}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingVertical: 5 }}
                style={styles.jobCont}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        padding: 10,
                        width: screenWidth,
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
          </>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  btmpart: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    flexDirection: "row",
    marginTop: 10,
  },
  textPrep: {
    fontSize: 18,
    fontWeight: 500,
    position: "absolute",
    top: 20,
    width: 250,
    margin: 20,
  },
  btnText: {
    color: "white",
  },
  prepBtn: {
    backgroundColor: "#0069cb",
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  gradcontainer: {
    height: 160,
    margin: 10,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0,
    elevation: 3,
    borderTopColor: "#EDF1F3",
    borderTopWidth: 1,
  },
  compView: {
    // backgroundColor: "blue",
    width: 200,
  },
  steps: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#0069cb",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  createtext: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
  },
  stepView: {
    gap: 5,
  },
  stepNum: {
    backgroundColor: "#00CB84",
    padding: 2,
    paddingHorizontal: 7,
    fontSize: 12,
    borderRadius: 1000,
    color: "#fff",
  },
  steptext: {
    fontSize: 12,
    color: "grey",
    fontWeight: "semibold",
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
  review: {
    // backgroundColor: "red",
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
  createText: {
    fontSize: 18,
    fontWeight: 600,
  },
  imgBtm: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  topBased: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topCmp: {
    backgroundColor: "#fff",
    width: 120,
    height: 120,
    // paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  internshipCard: {
    backgroundColor: "#fff",
    width: 200,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    shadowColor: "lightgray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: "#e2e2e2",
  },
  internType: {
    fontSize: 10,
    borderRadius: 5,
    marginTop: 5,
    fontWeight: 500,
    padding: 2,
    paddingHorizontal: 8,
  },
  duration: {
    fontSize: 12,
    fontWeight: 500,
  },
  recJob: {
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  basedJob: {
    backgroundColor: "#fff",
    width: 200,
    height: "auto",
    borderRadius: 10,
    // padding: 10,
    marginHorizontal: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  typeViewCourses: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  typeCourses: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#ECEAFA",
    fontSize: 10,
    fontWeight: 600,
    color: "#665E98",
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 600,
  },
  coursesDesc: {
    fontSize: 12,
    fontWeight: 500,
    marginHorizontal: 5,
    color: "black",
  },
  coursesName: {
    fontSize: 15,
    height: 40,
    fontWeight: 800,
    marginVertical: 3,
    color: "#2C2C2C",
  },
  coursePrice: {
    fontSize: 15,
    fontWeight: 800,
    marginVertical: 3,
    color: "#2C2C2C",
  },
  levelText: {
    fontSize: 11,
    fontWeight: 600,
    marginVertical: 3,
    // color: Colors.bg,
    color: "gray",
  },
  timeCont: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 120,
    left: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  imgOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: 150,
    //  position:"absolute",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mrpName: {
    fontSize: 12,
    fontWeight: 600,
    marginVertical: 3,
    color: "gray",
  },
  lineThrough: {
    width: 50,
    height: 1,
    // backgroundColor: "#b5b0b0fc",
    backgroundColor: "#AEAEAE",
    position: "absolute",
    // transform: [{ rotate: "-20deg" }],
    left: -4,
    bottom: 13,
  },
  hr: {
    borderColor: "lightgray",
    borderWidth: 0.5,
    marginVertical: 5,
  },
  popularJobItem: {
    backgroundColor: "#fff",
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e2e2e2",

    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
  },
  loc: {
    fontSize: 12,
    color: "grey",
  },
  popRight: {
    width: "65%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  popLeft: {
    width: "30%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  // btRightPart: {
  //   flexDirection: "column",
  //   alignItems: "flex-start",
  //   justifyContent: "flex-start",
  // },
  // btLeftPart: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 3,
  // },
  btsubTextPrice: {
    fontSize: 14,
    // color: "#665E98",
    color: Colors.bg,
    fontWeight: 800,
  },
  btmrpTextPrice: {
    fontSize: 13,
    color: "#8d8888ff",
    fontWeight: 600,
  },
  btmrpText: {
    fontSize: 13,
    color: "#8d8888ff",
    fontWeight: 600,
  },
  btRightPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  btLeftPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  momentText: {
    color: "#929090ff",
    fontSize: 12,
    fontWeight: 600,
  },
  bottompart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottompartCourses: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  dottedLine: {
    marginVertical: 10,
    width: 280,
    height: 0,
    borderColor: "#D9D9D9",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  btnDetails: {
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  type: {
    // backgroundColor: "#F2F4FA",
    padding: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: "600",
    color: "gray",
    // elevation: 2,
    // shadowColor:'lightgray'
    backgroundColor: "#F2F4FA",
  },
  packageTop: {
    color: "black",
    fontSize: 12,
  },
  package: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 13,
    // paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subTextLoc: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  btsubText: {
    color: "#929090ff",
    fontWeight: 600,
    fontSize: 14,
  },
  btRightPartCourses: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  btsubTextEnroll: {
    color: "gray",
    fontSize: 12,
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    width: "20%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  nameBg: {
    borderRadius: 10,
    borderColor: Colors.bg,
    borderWidth: 1,
    width: "20%",
    height: 50,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:Colors.bg
  },
  // topPartRec: {
  //   backgroundColor: "#0344943b",
  //   borderRadius: 10,
  //   padding: 10,
  //   height: 120,
  // },
  topPartRec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  recTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recDate: {
    fontSize: 10,
    fontWeight: 600,
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  recDateSave: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  compName: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  roleText: {
    fontWeight: "800",
    fontSize: 15,
    color: 'black'
  },
  roleTextTop: {
    fontWeight: "600",
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  questionCount: {
    fontWeight: "600",
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  compTextTop: {
    fontWeight: "400",
    fontSize: 12,
    color: "grey",
  },
  ExamPrice: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.bg,
  },
  ExamTextTop: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.bg,
  },
  compText: {
    fontWeight: "600",
    fontSize: 13,
    marginTop: 5,
    color: Colors.bg,
  },
  compText2: {
    fontWeight: "400",
    fontSize: 14,
    color: "grey",
  },
  bg: {
    flex: 1,
    backgroundColor: "#fafafd",
  },
  filterBg: {
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  inputBg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    flexDirection: "row"
  },
  topPart: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    flexDirection: 'row',
    justifyContent: "center",
    gap: 10
  },
  topPartOne: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  topPartTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  humanImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  gmText: {
    color: "grey",
    fontWeight: 600,
  },
  menuBg: {
    backgroundColor: "#fff",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EDF1F3",
  },
  searchBg: {
    width: "100%",
  },
  nameText: {
    color: "black",
    fontSize: 18,
    fontWeight: 600,
  },
  icon: {
    backgroundColor: "rgba(151, 199, 255, 0.32)",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  namePart: {
    flexDirection: "row",
    gap: 20,
  },

  jobCategoryBar: {
    marginTop: 0,
    marginHorizontal: 10,
    flexDirection: "row",
    paddingVertical: 10,
  },
  jobCont: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
  },
  popJobs: {
    marginTop: 10,
    gap: 20,
  },
  jobCategoryItem: {
    backgroundColor: "#fff",
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedJobCategory: {
    backgroundColor: "#0069CB",
  },
  jobCategoryText: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedJobText: {
    color: "#fff",
  },
  mainBg: {
    marginTop: 0,
    backgroundColor: "#F2F2F2",
    // paddingBottom:100
  },
  pagerView: {
    marginTop: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  cardView: {
    // marginTop: 1,
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    gap: 10,
    height: 120
  },
  hireText: {
    color: "black",
    fontWeight: 600,
    fontSize: 13
  },
  pagerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  seeAll: {
    color: "#0069CB",
    fontWeight: "semibold",
    fontSize: 16,
  },
  tipsText: {
    fontWeight: 600,
    fontSize: 16,
    color: 'black'
  },
  tipsTextSec: {
    fontWeight: 600,
    fontSize: 12,
    color: 'gray',
    marginTop: -1,
    marginBottom: -2,
    paddingHorizontal: 10
  },
  page: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  carousel: {
    marginTop: 0,
    height: 180, // Adjust based on your requirement
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E4E5E7",
    margin: 5,
  },
  activeDot: {
    backgroundColor: Colors.bg,
    width: 30,
  },
  gradientContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    // padding: 10, // Adjust padding as needed
  },
  pagertext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pageComp: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
  },
  rightSide: {
    flexDirection: "column",
    width: "50%",
    justifyContent: "space-evenly",
  },
  pageBtn: {
    borderRadius: 5,
    padding: 10,
    width: "80%",
    backgroundColor: "#ffcc00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
