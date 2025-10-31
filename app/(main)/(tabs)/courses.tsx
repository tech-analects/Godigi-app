import apiInstance from "@/app/interceptors";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { Image } from 'expo-image';

function Application() {


  const [coursesArray, setCoursesArray] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [myCoursesArray, setMyCoursesArray] = useState([]);
  const [allMyCourses, setAllMyCourses] = useState([]);




  const router = useRouter();

  const route = useRoute();

  const goToCourseDetails = (id) => {
    router.push({
      pathname: '/buyCourse',
      params: { id: id }
    });
  };

  const goToChatScreen = (id) => {
    router.push({
      pathname: '/chatbot',
      params: { courseId: id }
    })
  }

  const goToMyCourseDetails = (id) => {
    router.push({
      pathname: '/purchasedCourse',
      params: { id: id }
    });
  };

  const [loadingData, setLoadingData] = useState(false)


  const getCoursesListing = async () => {
    try {
      setLoadingData(true);
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);

      // console.log(formData);
      const response = await apiInstance.post(`course/list`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("response of data", response.data);
      if (response.data.status) {
        setCoursesArray(response.data.data)
        setAllCourses(response.data.data)
      }

    } catch (error) {
      console.log("this is err form adlist", error);
    } finally {
      setLoadingData(false);
    }
  };

  const getMyCoursesListing = async () => {
    try {
      setLoadingData(true);
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);

      const response = await apiInstance.post(`my-courses/list`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        setMyCoursesArray(response.data.data)
        setAllMyCourses(response.data.data)
      }

    } catch (error) {
      console.log("this is err form adlist", error);
    } finally {
      setLoadingData(false);
    }
  };

  const prfBasedJobItem = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    // console.log(newUrl)
    return (
      <TouchableOpacity
        style={styles.basedJob}
        onPress={() => goToCourseDetails(item.id)}
      // onPress={() => goToChatScreen(item.id)}
      >
        <View style={{ width: "35%", justifyContent: 'center' }}>
          {
            item.url == null
              ?
              <Image
                source={ImagesPath.cDummy}
                contentFit="fill"
                style={{
                  width: "100%",
                  height: 110,
                  // objectFit:"fill",
                  borderRadius: 15,
                }}
                transition={1000}
              />
              :
              <Image
                source={{ uri: newUrl }}
                contentFit="fill"
                style={{
                  width: "100%",
                  height: 110,
                  borderRadius: 15,
                }}
                transition={1000}
              />
          }
        </View>

        <View
          style={{
            padding: 10,
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
            width: '65%'
          }}
        >
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Feather name="bar-chart" size={16} color={Colors.bg} />
            <Text style={styles.levelText}>{item.level || "Basic"} Level</Text>
          </View>
          {/* <Text style={styles.typeCourses}>{item.type || "FullStack Dev"}</Text> */}
          <Text
            style={styles.courseName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // width: "75%",
            }}
          >
            <View style={{ flexDirection: "row", width: "100%", gap: 10, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", gap: 10, }}>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <FontAwesome name="rupee" size={14} color={"#000"} />
                  <Text style={styles.coursesName}>
                    {Number(item?.price?.split(".")[0]).toLocaleString()}
                  </Text>

                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    width: 60
                  }}
                >
                  <FontAwesome name="rupee" size={12} color={"#929090ff"} />
                  <Text style={styles.mrpName}>
                    {item.mrp
                      ? Number(item.mrp.toString().split(".")[0]).toLocaleString()
                      : "NA"}
                  </Text>

                  <View style={styles.lineThrough}></View>
                </View>
              </View>
              <View style={styles.timeCont}>
                <FontAwesome name="clock-o" size={16} color={Colors.bg} />
                <Text style={styles.levelText}>
                  {item.video_duration || "NA"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const myCourseItem = ({ item }) => {
    let newUrl = `https://godigiinfotech.com/${item.url}`;
    // console.log(newUrl)
    return (
      <TouchableOpacity
        style={styles.basedJob}
        onPress={() => goToMyCourseDetails(item.id)}
      >
        <View style={{ width: "35%", justifyContent: 'center' }}>
          {
            item.url == null
              ?
              <Image
                source={ImagesPath.cDummy}
                contentFit="fill"
                style={{
                  width: "100%",
                  height: 110,
                  // objectFit:"fill",
                  borderRadius: 15,
                }}
                transition={1000}
              />
              :
              <Image
                source={{ uri: newUrl }}
                contentFit="fill"
                style={{
                  width: "100%",
                  height: 110,
                  borderRadius: 15,
                }}
                transition={1000}
              />
          }
        </View>

        <View
          style={{
            padding: 10,
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
            width: '65%'
          }}
        >
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Feather name="bar-chart" size={16} color={Colors.bg} />
            <Text style={styles.levelText}>{item.level || "Basic"} Level</Text>
          </View>
          {/* <Text style={styles.typeCourses}>{item.type || "FullStack Dev"}</Text> */}
          <Text
            style={styles.courseName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // width: "75%",
            }}
          >
            <View style={{ flexDirection: "row", width: "100%", gap: 10, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", gap: 10, }}>
                {/* <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <FontAwesome name="rupee" size={14} color={"#000"} />
                  <Text style={styles.coursesName}>{item?.price?.split(".")[0]}</Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="rupee" size={12} color={"#929090ff"} />
                  <Text style={styles.mrpName}>{item?.mrp?.split(".")[0] || "NA"}</Text>
                  <View style={styles.lineThrough}></View>
                </View> */}
              </View>
              <View style={styles.timeCont}>
                <FontAwesome name="clock-o" size={16} color={Colors.bg} />
                <Text style={styles.levelText}>
                  {item.video_duration || "NA"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }



  const [isFilterViewOpen, setIsFilterViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Courses");

  //  useEffect(() => {
  //   if (route?.params?.my) {
  //     setActiveTab("My Courses");
  //   } else {
  //     setActiveTab("Courses");
  //   }
  // }, [route?.params?.my]);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.my) {
        setActiveTab("My Courses");
      } else {
        setActiveTab("Courses");
      }
    }, [route?.params?.my])
  );



  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = async () => {
    setRefreshing(true);
    if (activeTab == "Courses") {
      await getCoursesListing();
    }
    else {
      await getMyCoursesListing();
    }
    setRefreshing(false);
  };

  const filterCourses = () => {
    if (activeTab == "Courses") {
      if (searchQuery.trim().length > 0) {
        const filtered = allCourses.filter(c =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCoursesArray(filtered);
      } else {
        setCoursesArray(allCourses); // Reset to original list
      }
    }
    else {
      if (searchQuery.trim().length > 0) {
        const filtered = allMyCourses.filter(c =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setMyCoursesArray(filtered);
      } else {
        setMyCoursesArray(allMyCourses); // Reset to original list
      }
    }
  };

  //  useEffect(()=>{
  //   filterCourses();
  //  },[searchQuery])


  useEffect(() => {
    if (activeTab == 'Courses') {
      getCoursesListing();
    }
    else {
      getMyCoursesListing();
    }
    // console.log('hello')
  }, [activeTab])

  const navigation = useNavigation();

  const isFocused = useIsFocused(); // ✅ to track current focus

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (isFocused) {
        if (activeTab == "Courses") {
          getCoursesListing();
        }
        else {
          getMyCoursesListing();
        }
        // setActiveTab("Courses");
      }
    });

    return unsubscribe;
  }, [navigation, isFocused,activeTab]);

  return (
    <View style={styles.bgMain}>
      <View style={styles.topPart}>
        {["Courses", "My Courses"].map((item) => {
          const isActive = activeTab === item;
          return (
            <Pressable
              key={item}
              style={[
                styles.tab,
                isActive && {
                  backgroundColor: Colors.bg,
                  borderRadius: 15,
                  // borderTopLeftRadius: item === "My Courses" ? 15 : 0,
                  // borderBottomLeftRadius: item === "My Courses" ? 15 : 0,
                  // borderTopRightRadius: item === "Completed Courses" ? 15 : 0,
                  // borderBottomRightRadius: item === "Completed Courses" ? 15 : 0,
                },
              ]}
              onPress={() => setActiveTab(item)}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && { color: "white", fontWeight: "bold" },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.topPart1}>
        <View style={styles.inputBg}>

          <TextInput
            placeholder="Search Courses"
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

          <Feather name="search" size={22} color="#929090ff" style={{ position: "absolute", left: 10 }} />
          {
            searchQuery.length > 0
            &&
            <Entypo name="cross" size={24} color="#929090ff" style={{ position: "absolute", right: 10 }} onPress={() => {
              setSearchQuery("");
              setCoursesArray(allCourses); // Reset instantly
            }}
            />
          }
        </View>
        {/* <View style={styles.filterBg}>
                        <Ionicons name="options-outline" size={24} color="#fff" />
                      </View> */}
      </View>

      {
        loadingData
          ?
          <ActivityIndicator style={{ marginTop: 50 }} />
          :

          <Animated.View entering={FadeInDown.duration(500)} style={{ paddingHorizontal: 20 }}>
            {activeTab == "Courses" ? (
              <FlatList
                data={coursesArray}
                showsVerticalScrollIndicator={false}
                // numColumns={2}
                renderItem={prfBasedJobItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.jobCont}
                // columnWrapperStyle={{
                //   justifyContent: "space-between",
                // }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                scrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 200, }}
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
                        No Courses found!
                      </Text>
                    </View>
                  );
                }}
              />
            ) : (
              // <Text style={{marginTop:100,color:"gray",textAlign:'center'}}>No Completed Courses !</Text>
              <FlatList
                data={myCoursesArray}
                showsVerticalScrollIndicator={false}
                renderItem={myCourseItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.jobCont}
                scrollEnabled={true}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ paddingBottom: 50 }}
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
                        No Courses purchased yet!
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          </Animated.View>
      }

      {isFilterViewOpen && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  typeCourses: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#ECEAFA",
    fontSize: 9,
    fontWeight: 600,
    color: "#665E98",
    borderRadius: 6,
    textAlign: "center",
  },
  levelText: {
    fontSize: 10,
    fontWeight: 600,
    marginVertical: 3,
    color: Colors.bg,
  },
  timeCont: {
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  coursePrice: {
    fontWeight: 700,
    fontSize: 13,
    textAlign: "right",
    color: Colors.bg,
  },
  coursesName: {
    fontSize: 14,
    fontWeight: 800,
    marginVertical: 3,
    color: "black",
  },
  mrpName: {
    fontSize: 12,
    fontWeight: 600,
    marginVertical: 3,
    color: "#929090ff",
    // width:60,
    textAlign: 'center'
  },
  lineThrough: {
    // maxWidth:30,
    width: 60,
    height: 2,
    backgroundColor: "#929090ff",
    position: "absolute",
    // transform: [{ rotate: "-20deg" }],
    left: 0,
    bottom: 11,
  },
  priceView: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  courseStat: {
    fontWeight: 700,
    fontSize: 10,
    textAlign: "right",
    // width:100
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 600,
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15, // optional: if you want overall rounding
    overflow: "hidden", // to clip child radius
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  inputBg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    flexDirection: "row"
  },
  topPart1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10
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

  courseName: {
    fontWeight: 600,
    fontSize: 16,
    width: "100%",
    color: "black",
  },
  trainerName: {
    fontWeight: 600,
    fontSize: 11,
    color: "gray",
  },
  bgMain: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    // paddingHorizontal: 20,
    paddingVertical: 10,
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
    borderColor: "#E4E5E7",
    borderWidth: 0.5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0,
    elevation: 5,
  },
  jobCont: {
    marginTop: 10,
    gap: 10,
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
    alignItems: "center",
    width: "80%",
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 5,
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
    width: "100%",
    padding: 5,
    height: 120,
    gap: 5,
    flexDirection: "row",
    justifyContent: 'flex-start',
    // height: 180,
    borderRadius: 15,
    marginVertical: 3,
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
    fontWeight: "semibold",
    fontSize: 14,
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

export default Application;
