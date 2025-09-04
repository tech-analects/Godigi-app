import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeInUp } from "react-native-reanimated";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
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

const screenWidth = Dimensions.get("window").width
console.log(screenWidth)

function Home() {

  const [internshipsData,setInternshipsData] = useState([]);
  const [examsData,setExamsData] = useState([]);
  const [notesData,setNotesData] = useState([]);
  const [interviewQuestionsData, setInterviewQuestionsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [bannersData, setBannersData] = useState([]);
  const [loadingDashData, setLoadingDashData] = useState(false);

  // useEffect(()=>{
  //   console.log("thises is state",jobsData)
  // },[jobsData])

  const jobArray = [
    {
      id: 1,
      name: "Jobs",
    },
    {
      id: 2,
      name: "Courses",
    },
    {
      id: 3,
      name: "Internships",
    },
    {
      id: 4,
      name: "Others",
    },
  ];

  const recJobArray = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Beats",
      packageRange: "$60,000 - $80,000",
      rating: 4.5,
      location: "San Francisco, CA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 2,
      role: "UX/UI Designer",
      company: "TCS",
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
      company: "Innovators",
      packageRange: "$80,000 - $100,000",
      rating: 4.6,
      location: "Austin, TX",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 5,
      role: "Product Manager",
      company: "TCS",
      packageRange: "$90,000 - $120,000",
      rating: 4.8,
      location: "Seattle, WA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
  ];

  const popularJobs = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "GoDigi infotech",
      packageRange: "$60,000",
      location: "Pune, India",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "GoDigi infotech",
      packageRange: "$60,000",
      location: "Pune, India",
    },
    {
      id: 3,
      role: "Reactjs Developer",
      company: "GoDigi infotech",
      packageRange: "$60,000",
      location: "Pune, India",
    },
  ];

  const internships = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "Godigi Infotech",
      type: "Paid",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      duration: "3 Months",
      stipend: 15000,
    },
    {
      id: "2",
      title: "Backend Developer Intern",
      company: "Godigi Infotech",
      type: "Unpaid",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      duration: "6 Months",
    },
    {
      id: "3",
      title: "UI/UX Designer Intern",
      company: "Godigi Infotech",
      type: "Paid",
      image:
        "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg",
      duration: "2 Months",
      stipend: 12000,
    },
    {
      id: "4",
      title: "Marketing Intern",
      type: "Unpaid",
      duration: "1 Month",
      image:
        "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg",
      company: "Godigi Infotech",
    },
    {
      id: "5",
      title: "Data Analyst Intern",
      type: "Paid",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      duration: "4 Months",
      company: "Godigi Infotech",
      stipend: 18000,
    },
  ];



const exams = [
  { id: "1", title: "HTML Basics", type: "Free", topic: "html" },
  {
    id: "2",
    title: "CSS Fundamentals",
    type: "Paid",
    price: 499,
    topic: "css",
  },
  { id: "3", title: "JavaScript Essentials", type: "Free", topic: "js" },
  { id: "4", title: "Advanced CSS", type: "Paid", price: 799, topic: "css" },
  { id: "5", title: "JavaScript ES6+", type: "Paid", price: 999, topic: "js" },
  { id: "6", title: "Responsive Design", type: "Free", topic: "css" },
  { id: "7", title: "Flexbox Mastery", type: "Paid", price: 599, topic: "css" },
];

const topicIcons = {
  html: { component: FontAwesome5, name: "html5", color: "#e34f26" },
  css: { component: FontAwesome5, name: "css3-alt", color: "#2965f1" },
  js: { component: FontAwesome5, name: "js-square", color: "#f0db4f" },
};



  const goToJobDetails = (id) => {
    console.log("hello");
    router.push({
      pathname: "/applyJobs",
      params: { id: id },
    });
  };
  const goToCourseDetailsPage = (id) => {
    console.log("hello");
    router.push({
      pathname: "/buyCourse",
      params: { id: id },
    });
  };
 const goToIntenshipDetails = (id) => {
   router.push({
     pathname: "/internshipDetails",
     params: { id: id }, // pass the param here
   });
 };
 const goToInterviewQuestionDetails = (id) => {
   router.push({
     pathname: "/interviewQuestionsDetails",
     params: { id: id }, // pass the param here
   });
 };

  const navigation = useNavigation();
 const goToNotesDetails=(id)=>{
   navigation.navigate("PDFViewerScreen", {
     subjectId: id,
   });
 }

  const [selectedJob, setSelectedJob] = useState("Jobs");
  const [currentPage, setCurrentPage] = useState(0); // Track the current page of the carousel

  // Render function for FlatList
  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.jobCategoryItem,
        selectedJob === item.name && styles.selectedJobCategory,
      ]}
      onPress={() => setSelectedJob(item.name)}
    >
      <Text
        style={[
          styles.jobCategoryText,
          selectedJob === item.name && styles.selectedJobText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRecJobItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToJobDetails(item.id)}
      style={styles.recJob}
    >
      <View style={styles.topPartRec}>
        <View style={styles.recTop}>
          <Text style={styles.recDate}>20 May 2025</Text>
          {/* <Text style={styles.recDateSave}>
            <FontAwesome5 name="bookmark" size={14} color="#000" />
          </Text> */}
        </View>
        <View style={styles.compName}>
          <View>
            <Text style={styles.compText}>{item.company_name}</Text>
            <Text style={styles.roleText}>{item.title}</Text>
          </View>
          <View>
            {/* <Image
              source={ImagesPath.beats}
              style={{ width: 40, height: 40, objectFit: "contain" }}
            /> */}
          </View>
        </View>
        {/* <View style={styles.typeView}>
          {item.type.map((i, index) => {
            // Return the Text component for each job type
            return (
              <Text style={styles.type} key={index}>
                {i}
              </Text>
            );
          })}
        </View> */}
      </View>

      <View style={styles.bottompart}>
        <View style={styles.btRightPart}>
          <Text style={styles.subText}>{item.salary}</Text>
          <Text style={styles.subTextLoc}>Pune</Text>
        </View>
        <View style={styles.btLeftPart}>
          <View style={styles.btnDetails}>
            <Text style={{ color: "white", fontSize: 12 }}>Details</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    // <Text>hello</Text>
  );

  const coursesListItem = ({ item }) => {
   let newUrl = `https://godigiinfotech.com/${item.url}`;
    return(
      <TouchableOpacity style={styles.basedJob} onPress={()=>goToCourseDetailsPage(item.id)}>
      <Image
        source={{uri:newUrl}}
        style={{ width: "100%", height: 150, borderRadius: 10 }}
      />
      <View style={styles.typeViewCourses}>
        <Text style={styles.typeCourses}>{item.type || "Coding"}</Text>
        {/* <View style={{ flexDirection: "row", gap: 5 }}>
          <AntDesign name="star" size={18} color="#F9A64B" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View> */}
      </View>
      <Text style={styles.coursesName}>{item.title}</Text>
      <View style={styles.hr}></View>
      <View style={styles.bottompartCourses}>
        <View style={styles.btRightPartCourses}>
          <Text style={styles.btmrpText}>MRP</Text>
          <Text style={[styles.btmrpTextPrice]}>{item.mrp || "NA"}</Text>
          <View style={styles.lineThrough}></View>
        </View>
        <View style={styles.btLeftPart}>
          <FontAwesome name="rupee" size={20} color={Colors.bg} />
          <Text style={styles.btsubTextPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

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

  const renderInternshipCard = ({ item }) => {
     let newUrl = `https://godigiinfotech.com/${item.url}`;
    //  console.log("inetndfhdm ",newUrl)
    return (
      <TouchableOpacity
        style={styles.basedJob}
        onPress={() => goToIntenshipDetails(item.id)}
      >
        {item.url && (
          <Image
            src={{ uri: newUrl }}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
          />
        )}
        <View>
          <Text style={styles.compText}>{item.company_name}</Text>
          <Text style={styles.roleText}>{item.title}</Text>
        </View>
        <View style={styles.hr}></View>
        <View style={styles.bottompart}>
          <View style={styles.btRightPart}>
            <Text style={styles.subText}>{item.salary}</Text>
            <Text style={styles.subTextLoc}>{item.city_name}</Text>
          </View>
          <View style={styles.btLeftPart}>
            <View style={styles.btnDetails}>
              <Text style={{ color: "white", fontSize: 12 }}>Details</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderPopularJobItem = ({ item }) => (
    <View style={styles.popularJobItem}>
      <View style={styles.popRight}>
        <Image
          source={ImagesPath.beats}
          style={{ width: 40, height: 40, objectFit: "contain" }}
        />
        <View>
          <Text style={styles.roleText}>{item.role}</Text>
          <Text style={styles.compText2}>{item.company}</Text>
        </View>
      </View>
      <View style={styles.popLeft}>
        <Text style={styles.package}>{item.packageRange}</Text>
        <Text style={styles.loc}>{item.location}</Text>
      </View>
    </View>
  );

  const renderNotes = ({ item }) => {
      let newUrl = `https://godigiinfotech.com/${item.url}`;
    return (
      <TouchableOpacity onPress={()=>goToNotesDetails(item.id)} style={styles.topCmp}>
        {/* <Image source={item.src} /> */}
        {/* {Icon && <Icon name={iconName} size={30} color={iconColor} />} */}
        <Image source={{ uri:newUrl }} style={{ height: 40, width: 50,objectFit:"contain" }} />
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
          style={{ height: 40, width: 50, objectFit: "contain" }}
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


  const getDashboardData = async()=>{
    try {
      setLoadingDashData(true)
       const userTok = await AsyncStorage.getItem("logged_in_user_token");
       console.log("usetoken is",userTok)
       const formdata = new FormData();
       formdata.append("token",userTok);
        const response = await apiInstance.post("dashboard", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if(response.data.status){
          // console.log(response.data);
          setInternshipsData(response.data.data.internships);
          setNotesData(response.data.data?.notes);
          setInterviewQuestionsData(response.data.data?.question_answers);
          setBannersData(response.data.data?.banners);
          setCoursesData(response.data.data?.courses);
          // console.log("thisesa are jobs",response.data.data.jobs.length);
          setJobsData(response.data.data.jobs);
        }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoadingDashData(false)
    }
  }

  useEffect(()=>{
    getDashboardData();
  },[]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getDashboardData();
    setRefreshing(false);
  };

  return (
    <View style={styles.bg}>
      <ScrollView
        style={styles.mainBg}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <View style={styles.topPart}>
          <View style={styles.topPartTwo}>
            <TouchableOpacity style={styles.searchBg} onPress={goToSearch}>
              <TextInput
                placeholder="Search a Course, Job or Internships"
                placeholderTextColor={"grey"}
                autoComplete="off"
                editable={false}
                style={[
                  Colors.inputbox,
                  {
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#EDF1F3",
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View> */}

        {loadingDashData ? (
          <ActivityIndicator style={{ marginTop: 50 }} />
        ) : (
          <>
            <Animated.View
              entering={FadeInUp.duration(1000).delay(100)}
              style={styles.pagerView}
            >
              {bannersData && bannersData.length > 0 && (
                <PagerView
                  initialPage={0}
                  onPageSelected={handlePageSelected}
                  style={styles.carousel}
                >
                  {bannersData.map((banner, index) => (
                    <View style={styles.page} key={index}>
                      <FirstPager urlbanner={banner?.url} />
                    </View>
                  ))}
                </PagerView>
              )}

              {/* Bottom Dots */}
              <View style={styles.dotsContainer}>
                {Array.from({ length: bannersData.length }).map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      index === currentPage && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
            </Animated.View>

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
              <FlatList
                horizontal
                data={jobsData}
                renderItem={renderRecJobItem}
                keyExtractor={(item) => item.id.toString()}
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
              <FlatList
                horizontal
                data={coursesData}
                renderItem={coursesListItem}
                keyExtractor={(item) => item.id.toString()}
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

            {/* <View>
          <LinearGradient
            colors={["#C1D9FF", "#ffffff"]}
            style={styles.gradcontainer}
            start={{ x: 0, y: 1 }} // Start from bottom
            end={{ x: 0, y: 0 }}
          >
            <Text style={styles.textPrep}>
              Boot Skills Upgrade plan with Godigi
            </Text>
            <TouchableOpacity style={styles.prepBtn}>
              <Text style={styles.btnText}>Start Preparing</Text>
            </TouchableOpacity>
            <Image source={ImagesPath.people} />
          </LinearGradient>
        </View> */}

            <View style={styles.pagerView}>
              <View style={styles.pagerTop}>
                <Text style={styles.tipsText}>Internships for You</Text>
                <Text style={styles.seeAll} onPress={goToInternshipListing}>
                  See all
                </Text>
              </View>
              <FlatList
                data={internshipsData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderInternshipCard}
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
              <FlatList
                data={notesData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderNotes}
                keyExtractor={(item) => item.id.toString()}
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
              <FlatList
                data={interviewQuestionsData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderInterviewQuestions}
                keyExtractor={(item) => item.id.toString()}
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

const FirstPager = ({urlbanner}) => {
   let newUrl = `https://godigiinfotech.com/${urlbanner}`;
   console.log(newUrl)
  return (
    <View
      style={styles.gradientContainer}
    >
      {/* <View style={styles.pageComp}>
        <View style={styles.rightSide}>
          <Text style={styles.pagertext}>
            How to find a perfect job for you?
          </Text>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={{ color: "white", fontWeight: "600" }}>Read more</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <Image
        source={{uri:newUrl}}
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
      />
    </View>
  );
};

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
    width: 150,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
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
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  internType: {
    fontSize: 10,
    borderRadius:5,
    marginTop:5,
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
    width: 250,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 10,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  basedJob: {
    backgroundColor: "#fff",
    width: 250,
    height: "auto",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
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
    fontSize: 13,
    fontWeight: 800,
    marginHorizontal: 5,
    marginVertical: 3,
    color: "black",
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
    borderColor: "lightgrey",

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
  btRightPart: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  btLeftPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
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
  lineThrough: {
    width: 40,
    height: 2,
    backgroundColor: "#8d8888ff",
    position: "absolute",
    transform: [{ rotate: "-20deg" }],
    left: 30,
    bottom: 8,
  },
  bottompart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 10,
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
    borderRadius: 15,
    fontSize: 10,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "black",
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
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
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
    color: "black",
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
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  topPartRec: {
    backgroundColor: "#0344943b",
    borderRadius: 10,
    padding: 10,
    height:120
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
    fontSize: 14,
  },
  roleTextTop: {
    fontWeight: "600",
    fontSize: 14,
    color:"black",
    textAlign:"center"
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
    fontWeight: "500",
    fontSize: 12,
    color: "#000",
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
  topPart: {
    backgroundColor: "#fff",
    height: Platform.OS == "android" ? 80 : 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: Platform.OS == "android" ? 20 : 50,
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
  },
  pagerView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fafafd",
  },
  pagerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seeAll: {
    color: "#0069CB",
    fontWeight: "semibold",
    fontSize: 16,
  },
  tipsText: {
    fontWeight: 600,
    fontSize: 16,
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
