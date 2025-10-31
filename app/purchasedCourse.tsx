import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, SectionList, StyleSheet, Platform, FlatList, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import apiInstance from "./interceptors";
import { ActivityIndicator } from "react-native-paper";
import { Video, AVPlaybackStatus } from "expo-av";
import { ImagesPath } from "@/constants/ImagesPath";
import { Image } from 'expo-image';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as ScreenCapture from "expo-screen-capture";
import { BarChart,PieChart  } from 'react-native-gifted-charts';
import { AnimatedCircularProgress } from "react-native-circular-progress";


function PurchasedCourse() {

  const route = useRoute();
  const local = useLocalSearchParams();
  const courseId = route?.params?.id || local?.id
  // console.log(local)

  const [loading, setLoading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [courseNotes, setCourseNotes] = useState([]);
  const [chartCourseData, setChartCourseData] = useState([]);
  const [courseName, setCourseName] = useState("")
  const [courseCOmpletionPercentage, setCourseCOmpletionPercentage] = useState(0)

  const navigation = useNavigation();
  const router = useRouter();
 const goBack = () => {
  // router.back(); // goes back
  // router.setParams({ my: true }); // set params on previous screen
  router.replace({ pathname: '/courses', params: {my:true} });
};

  const goToNotifications = () => {
    router.push("/notifications")
  }
  const goToChapter = (id) => {
    router.push({
      pathname: '/chapTopics',
      params: { id: id }
    })
  }
  const goToChatScreen = () => {
    router.push({
      pathname: '/chatbot',
      params: { courseId: courseId }
    })
  }

  useEffect(() => {
    getCourseDetails();
  }, [])

   useEffect(() => {
    // Prevent screenshot
    ScreenCapture.preventScreenCaptureAsync();
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const getCourseDetails = async () => {
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
      if (response.data.status) {
        console.log("course details", response.data)
        setSubjects(response.data.data.course_subjects)
        setCourseNotes(response.data.data.course_notes)
        setCourseName(response.data.data.course_details[0].title)
        setCourseCOmpletionPercentage(response.data.data.total_course_completion_progress)
        const barColors = ["#4e73df", Colors.bg, "#36b9cc"];

if (response.data?.data?.course_completion_progress?.length > 0) {
  const giftedChartData = response.data.data.course_completion_progress.map((item, index) => ({
    label: item.progress_date, // date as label
    value: parseFloat(item.completion_percentage), // convert string to number
    frontColor: barColors[index % barColors.length], // cycle through colors
  }));

  setChartCourseData(giftedChartData);
}

        // console.log("this is course is purchased",response.data.data.is_purchased)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  const renderSubject = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    return (
      <TouchableOpacity style={styles.noteCard} onPress={() =>
        goToChapter(item.id)
        // console.log(item.id)
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

        <View>
         <FontAwesome name="play-circle" size={28} color={Colors.bg} />
        </View>
      </TouchableOpacity>
    );

  };

  const uri = "https://www.w3schools.com/html/mov_bbb.mp4";

  const jobArray = [
    {
      id: 1,
      name: "Overview",
    },
    {
      id: 2,
      name: "Videos",
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
    }
  ];

   const barColors = ["#4e73df", Colors.bg, "#36b9cc"];

const usageData = [
  { value: 45, label: 'Mon' },
  { value: 30, label: 'Tue' },
  { value: 80, label: 'Wed' },
  { value: 60, label: 'Thu' },
  { value: 90, label: 'Fri' },
  { value: 20, label: 'Sat' },
  { value: 50, label: 'Sun' },
];

// const giftedChartData = usageData.map((item, index) => ({
//   label: item.label,
//   value: item.value,
//   frontColor: barColors[index % barColors.length], // cycle through colors
// }));

 const completionPercent = 72; // in %
  const totalTimeSpent = 105; // in minutes

  // Pie chart data for completion
  const pieData = [
    { value: completionPercent, color: Colors.bg, text: `${completionPercent}%` },
    { value: 100 - completionPercent, color: '#E0E0E0' },
  ];

  // Convert minutes → hours + minutes
  const hours = Math.floor(totalTimeSpent / 60);
  const minutes = totalTimeSpent % 60;

  const [selectedInfo, setSelectedInfo] = useState("Overview");

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
            style={{ height: 40, width: 50,}}
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

        <View style={{ backgroundColor: "green", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 }}>

          <Text style={{ color: "white", fontSize: 10, fontWeight: 600 }}>Free Access</Text>
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

        <View style={{ backgroundColor: "green", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 }}>

          <Text style={{ color: "white", fontSize: 10, fontWeight: 600 }}>Free Access</Text>
        </View>

        {/* Actions with icons only (no functionality) */}
        {/* <View style={styles.actions}>
           <Feather name="download" size={24} color="#4CAF50" />
           <Feather name="share-2" size={24} color="#2196F3" />
         </View> */}
      </TouchableOpacity>
    );
  };

  const lockLandscape = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  );
};

const unlockOrientation = async () => {
  await ScreenOrientation.unlockAsync(); // back to default
};

  const [status, setStatus] = useState({});
    const videoRef = useRef(null);


    const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topPart}>
       <Feather name="arrow-left"
          size={24}
          color="#fff"
          onPress={goBack}
        />
        <Text style={[styles.pageName, { width: '60%' }]} numberOfLines={1} ellipsizeMode="tail">{courseName || "Subjects"} </Text>
        <View>
          {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} /> */}
        </View>
      </View>
      {
        loading
          ?
          <ActivityIndicator style={{ marginTop: 30 }} color={Colors.bg} />
          :
          <View style={{ flex: 1 }}>
            {/* <VideoPlayer uri={"https://www.w3schools.com/html/mov_bbb.mp4"}/> */}
            {/* <VideoListScreen/> */}
            {/* <VideoView
              player={player}
              style={{
                width: Dimensions.get("window").width,
                height: 250, // stays in portrait
                backgroundColor: "black",
              }}
              nativeControls
            /> */}

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

            {
              selectedInfo == "Overview"
              &&
              <ScrollView style={{paddingHorizontal:20}} contentContainerStyle={{paddingBottom:50}}>

      {/* Completion Chart Card */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20,
          marginVertical:10,
           shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
          // alignItems: 'center',
        }}
      >
         <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
        Course Completion
      </Text>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {/* <PieChart
            donut
            radius={80}
            innerRadius={40}
            data={pieData}
            curvedEndEdges={true}
            centerLabelComponent={() => (
              <Text style={{ fontSize: 22, fontWeight: '700', color: Colors.bg }}>
                {completionPercent}%
              </Text>
            )}
          /> */}
           <AnimatedCircularProgress
                        size={100}
                        width={20}
                        fill={courseCOmpletionPercentage || 0}
                        duration={2000}
                        delay={50}
                        tintColor={Colors.bg}
                        backgroundColor="#eee"
                      >
                        {(fill) => <Text style={{ color:"black", fontSize: 14 }}>{`${Math.round(fill)}%`}</Text>}
                      </AnimatedCircularProgress>
        </View>
      </View>

      {/* Time Spent Card */}
      {/* <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20,
          shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>
          Total Time Spent
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: Colors.bg,
            marginTop: 12,
            textAlign:'center'
          }}
        >
          {hours > 0
            ? `${hours}h ${minutes}m`
            : `${minutes} min`}
        </Text>
      </View> */}
               <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    marginVertical:10,
    elevation: 2, }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
        Weekly Activity (mins)
      </Text>

      <BarChart
        data={chartCourseData}
        barWidth={25}
        frontColor="#4A90E2"
        yAxisLabelSuffix=" %"
        isAnimated
        animationDuration={500}
        yAxisTextStyle={{ color: 'gray',fontSize:12 }}
        xAxisLabelTextStyle={{ color: 'gray',marginTop:7, fontSize: 10,transform:[{rotate:"0deg"}] }}
        spacing={40}
        barBorderTopLeftRadius={8}
        barBorderTopRightRadius={8}
        yAxisThickness={1}
        xAxisThickness={1}
        showValuesAsTopLabel
        topLabelTextStyle={{color:Colors.bg,fontWeight:600,fontSize:9}}
        // showYAxisIndices
        xAxisColor={"lightgray"}
        yAxisColor={"lightgray"}
         noOfSections={5} 
  maxValue={100}
  stepValue={20}
      />
    </View>
               </ScrollView> 
            }

            {
              selectedInfo == "Videos"
              &&
                 <View style={styles.jd}>
                   <FlatList
                     data={subjects}
                     keyExtractor={(item) => item.id}
                     renderItem={renderSubject}
                     contentContainerStyle={{ paddingBottom: 200,marginTop:10,paddingHorizontal:10,  }}
                    //  style={{ maxHeight: 500 }}
                     nestedScrollEnabled={true}
                     showsVerticalScrollIndicator={true}
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
                             No Subjects added for this course yet!
                           </Text>
                         </View>
                       );
                     }}
                   />
                  </View>
            }
            {selectedInfo == "Notes" && (
              <View style={styles.jd}>
                <FlatList
                  data={courseNotes}
                  keyExtractor={(item) => item.id}
                  renderItem={renderNote}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{ paddingBottom: 100,marginTop:10,paddingHorizontal:10,  }}
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
            nestedScrollEnabled={true}
            renderItem={renderItemInterviewQuestions}
            contentContainerStyle={{ paddingBottom: 100,marginTop:10,paddingHorizontal:10,   }}
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
        <ScrollView
          style={[styles.jd]} // use maxHeight
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.certHead}>
            <FontAwesome5 name="graduation-cap" size={20} color="black" /> Certificate of Completion
          </Text>

          <Text style={styles.subHead}>
            Upon successfully finishing the {courseName || "this"} course, you’ll receive an industry-recognized Certificate of Completion - a testament to your newly acquired skills and dedication.
          </Text>

          <Image
            source={ImagesPath.certificate}
            style={{
              height: 200, // better than objectFit
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
              <Text style={styles.text}>
                Added to your resume or portfolio to showcase your expertise
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.bulletContent}>{"\u2022"}</Text>
              <Text style={styles.text}>
                Used to demonstrate your readiness for developer roles, freelance gigs, or startup projects
              </Text>
            </View>

            <Text style={styles.subHead}>
              Designed to reflect your achievement and the comprehensive knowledge you’ve gained, this certificate is more than just a document - it’s your{" "}
              <Text style={{ fontWeight: "600", fontSize: 14, color: "black" }}>
                launchpad into the tech world
              </Text>.
            </Text>
          </View>
        </ScrollView>
      )}
          </View>
      }

      <TouchableOpacity onPress={goToChatScreen} style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: Colors.bg, padding: 15, borderRadius: 40 }}>
        <Entypo name="chat" size={24} color={"#fff"} />
      </TouchableOpacity>
    </View>
  )
}

export default PurchasedCourse

const styles = StyleSheet.create({

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
  jd: {
    paddingHorizontal: 10,
    marginVertical: -5,
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
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: "black",
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
   topPart: {
    backgroundColor: Colors.bg,
    // backgroundColor: "red",
    height:100,
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
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 5,
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
    width: '60%'
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    width: "80%",
    color: "black"
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
})


// const DATA = [
//   {
//     title: "Fruits",
//     data: ["Apple", "Banana", "Orange", "Mango"],
//   },
//   {
//     title: "Vegetables",
//     data: ["Carrot", "Broccoli", "Spinach", "Potato"],
//   },
//   {
//     title: "Dairy",
//     data: ["Milk", "Cheese", "Yogurt"],
//   },
// ];

// export default function SmallSectionList() {
//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemText}>{item}</Text>
//     </View>
//   );

//   const renderSectionHeader = ({ section: { title } }) => (
//     <View style={styles.headerContainer}>
//       <Text style={styles.headerText}>{title}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <SectionList
//         sections={DATA}
//         keyExtractor={(item, index) => item + index}
//         renderItem={renderItem}
//         renderSectionHeader={renderSectionHeader}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   headerContainer: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//     marginHorizontal: 10,
//   },
//   headerText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   itemContainer: {
//     backgroundColor: "#fff",
//     padding: 10,
//     marginVertical: 3,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     elevation: 1, // shadow for Android
//     shadowColor: "#000", // shadow for iOS
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   itemText: {
//     fontSize: 14,
//   },
// });