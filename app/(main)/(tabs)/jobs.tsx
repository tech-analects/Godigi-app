import apiInstance from "@/app/interceptors";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Platform, RefreshControl, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Image } from 'expo-image';

function Jobs() {

  const router = useRouter();

  const goToJobDetails = (id) => {
    // router.push({
    //   pathname: '/applyJobs',
    //   params: { id: id, prf: "Job" },
    // });
    router.push(`/applyJobs?id=${id}&prf=Job`);
  };

  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState("New Jobs");

  const jobArray = [
    {
      id: 1,
      name: "New Jobs",
    },
    {
      id: 2,
      name: "Applied Jobs",
    },
    {
      id: 3,
      name: "Accepted",
    },
  ];

  const getStatus = (stat) => {
    switch (stat) {
      case "Rejected":
        return (
          <View style={styles.rejectedView}>
            <Text style={[styles.statusText, styles.rejected]}>Rejected</Text>
          </View>
        );
      case "Pending":
        return (
          <View style={styles.pendView}>
            <Text style={[styles.statusText, styles.pending]}>Pending</Text>
          </View>
        );
      case "Accepted":
        return (
          <View style={styles.acceptView}>
            <Text style={[styles.statusText, styles.accepted]}>Accepted</Text>
          </View>
        );
    }
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.jobCategoryItem,
        selectedApplicationStatus === item.name && styles.selectedJobCategory,
      ]}
      onPress={() => setSelectedApplicationStatus(item.name)}
    >
      <Text
        style={[
          styles.jobCategoryText,
          selectedApplicationStatus === item.name && styles.selectedJobText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  useFocusEffect(
    useCallback(() => {

      // You can fetch data or start listeners here
      getJobsListing(0);
      return () => {
        // Cleanup code (remove listeners, stop timers, etc.)
      };
    }, [])
  );

  const showToast = (msg) => {
    Toast.show({
      type: "success",
      text2: "Success",
      text1: msg,
      position: "top",
    });
  };

  const showErrToast = (msg) => {
    // ToastAndroid.show(
    //   "Status of the user has been changed.",
    //   ToastAndroid.LONG,
    // );
    Toast.show({
      type: "error",
      text2: "Error",
      text1: msg,
      position: "top",
    });
  };

  const addBookmark = async (id) => {
    try {
      setAddingBookmark(true);
      setJobIdBookmarking(id)
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      formdata.append("job_id", id);
      const response = await apiInstance.post(`bookmark/store`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        //  console.log(response.data)
        const bookmarkId = response.data.bookmark_id;
        const updatedJobs = jobsData.map((item) =>
          item.id === id ? { ...item, bookmark_id: bookmarkId } : item
        );
        setJobsData(updatedJobs);
        showToast("Bookmark added successfully!")
      }
    } catch (err) {
      console.log(err);
      showErrToast("Bookmark was not added successfully!")
    } finally {
      setAddingBookmark(false);
    }
  };
  const removeBookmark = async (id) => {
    try {
      setAddingBookmark(true);
      setJobIdBookmarking(id)
      const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      const response = await apiInstance.post(
        `bookmark/delete/${id}`,
        // `bookmark/delete/5`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response.data);
      if (response.data.status) {
        const updatedJobs = jobsData.map((item) =>
          item.
            bookmark_id === id ? {
              ...item,
            bookmark_id: null
          } : item
        );
        setJobsData(updatedJobs);
        showToast("Bookmark removed successfully!")
      }
    } catch (err) {
      console.log(err);
      showErrToast("Bookmark was not removed successfully!")
    } finally {
      setAddingBookmark(false);
    }
  };

  const prfBasedJobItem = ({ item, index }) => (
    <View style={styles.basedJob}>
      {/* <View style={styles.topBased}>
      </View> */}
      <View style={styles.topPartRec}>
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
                // source={{uri:``}}
                style={{ height: 50, width: "100%" }}
                transition={1000}
                contentFit="scale-down"
              />
            </View>
        }
        <TouchableOpacity
          onPress={() => goToJobDetails(item.id)}
          // onPress={()=>showToast("hello")}
          style={{ width: "74%" }}
        >
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text
              style={[styles.roleText, { width: "100%" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            {addingBookmark && (item.id == jobIdBookmarking || item.bookmark_id == jobIdBookmarking) ? (
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
            )}
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

              <Text style={styles.compText} >{item.company_name}</Text>
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
          <Text style={styles.btsubText}>{item.last_updated_at}</Text>
        </View>
      </View>
    </View>
  );

  // const renderAppliedJobs = ({ item }) => (
  //   <TouchableOpacity onPress={goToJobDetails} style={styles.basedJob}>
  //     <View style={styles.topPartRec}>
  //       <View style={styles.topBased}>
  //         <Image
  //           source={ImagesPath.fb}
  //           style={{ width: 50, height: 50, objectFit: "contain" }}
  //         />
  //         <View>
  //           <Text style={styles.roleText}>{item.role}</Text>
  //           <View style={styles.compBased}>
  //             <Text style={styles.compText}>{item.company}</Text>
  //             <View style={styles.review}>
  //               <Text style={styles.subText}>
  //                 <AntDesign
  //                   name="star"
  //                   size={14}
  //                   color="#FFCC00"
  //                   style={{ marginHorizontal: 50 }}
  //                 />
  //                 {item.rating}
  //               </Text>
  //             </View>
  //           </View>
  //           <View style={{ marginTop: 10 }}>
  //             <View style={styles.btRightPart}>
  //               <Entypo name="location-pin" size={22} color="grey" />
  //               <Text style={styles.btsubText}>{item.location}</Text>
  //             </View>
  //             <View style={styles.btRightPart}>
  //               <FontAwesome name="briefcase" size={18} color="gray" />
  //               <Text style={styles.btsubText}>{item.packageRange}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: "column",
  //           height: 100,
  //           justifyContent: "space-between",
  //           alignItems: "flex-end",
  //         }}
  //       >
  //         <FontAwesome name="bookmark" size={24} color={Colors.bg} />
  //         <Text>{getStatus(item.status)}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  const [loadingData, setLoadingData] = useState(false);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState();
  const [jobsData, setJobsData] = useState([]);
  const [addingBookmark, setAddingBookmark] = useState(false);
  const [jobIdBookmarking, setJobIdBookmarking] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    getJobsListing(0);
  }, []);

  const getJobsListing = async (customStart,stat) => {
    try {
      if (customStart == 0) {
        console.log("custom start is 0",stat);
        setLoadingData(true);
      } else {
        console.log("custom start is not 0");
        setLoadingMoreData(true);
      }
      //  console.log("thisis custoemr start", customStart);
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);
      //  formData.append("show", selectedShow);
      formData.append("start", customStart);
      if(stat == "reset"){
        formData.append("search_query","");
      }
      else{
        formData.append("search_query",searchQuery);
      }

      const response = await apiInstance.post(`job/list`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      //  console.log("response of data", response.data);
      if (response.data.status) {
        setHasMore(response.data.has_more);
        let finalDataToPass = response.data.data;
        //  console.log("This is final data to passs",finalDataToPass)
        if (customStart == 0) {
          //  console.log("thisis for 0", customStart, finalDataToPass);
          setJobsData(finalDataToPass);
          setLimit(finalDataToPass.length);
          //  console.log(finalDataToPass.length);
        } else {
          //  console.log("customStart not 0", customStart);
          //  console.log("has more in 0 not custom is", response.data.has_more);
          setJobsData((prev) => {
            const newList = [...prev, ...finalDataToPass];
            // console.log("prev data here", prev);
            // console.log("Previous length:", prev.length);
            // console.log("Appended data length:", finalDataToPass.length);
            // console.log(
            //   `new list is for custom start ${customStart}`,
            //   newList,
            //   newList.length
            // );
            // setLimit(newList.length);
            setLimit((prev) => prev + finalDataToPass.length);
            if (newList.length < 25) {
              setHasMore(false);
            }
            return newList;
          });
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("this is err form adlist", error);
      setJobsData([]);
      setHasMore(false);
      //  setHasMore(false);
    } finally {
      setLoadingData(false);
      setLoadingMoreData(false);
    }
  };





  const renderFooter = () => {
    if (loadingMoreData) {
      return <ActivityIndicator size="large" style={{ margin: 16 }} />;
    }
    // if (!hasMore) {
    //   return (
    //     <Text style={{ textAlign: "center", padding: 16, color: "gray" }}>
    //       No more questions
    //     </Text>
    //   );
    // }
    return null;
  };

  const goToSearch = () => {
    router.push("/search");
  };

  const fetchData = () => {
    console.log("readched end here!", loadingMoreData, limit);
    if (loadingMoreData || !hasMore) return;
    const newStart = limit + 1;
    console.log("Fetching more jobs from start:", newStart, limit);
    getJobsListing(newStart);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getJobsListing(0);
    setRefreshing(false);
  };

  const runSearch = () => {
    getJobsListing(0)
  }

  const isFocused = useIsFocused(); // ✅ to track current focus

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      if (isFocused) {
        getJobsListing(0);
      }
    });

    return unsubscribe;
  }, [navigation, isFocused]);

  return (
    <View style={styles.bgMain}>

      {/* <View style={styles.topPart}>
        <FlatList
          horizontal
          data={jobArray}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.jobCategoryBar}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View> */}

      {/* <View style={styles.topPart1}>
                    <TextInput
                      placeholder="Search Job"
                      placeholderTextColor={"grey"}
                      autoComplete="off"
                      style={[
                        Colors.inputbox,
                        {
                          backgroundColor: "#fff",
                          borderWidth: 1,
                          borderColor: "#EDF1F3",
                        },
                      ]}
                    />
              </View> */}


      {
        loadingData
          ?
          <ActivityIndicator style={{ marginTop: 50 }} />
          :
          <Animated.View entering={FadeInDown.duration(500)}>
            {/* <View style={{paddingTop:10,}}> */}

            <View style={styles.topPart}>
              <View style={styles.inputBg}>

                <TextInput
                  placeholder="Search jobs"
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
                    console.log("Search submitted:", searchQuery);
                    runSearch(); // <-- your method
                  }}
                />

                <Feather name="search" size={22} color="#929090ff" style={{ position: "absolute", left: 10 }} />
                {
                  searchQuery.length > 0
                  &&
                  <Entypo name="cross" size={24} color="#929090ff" style={{ position: "absolute", right: 10 }} onPress={() => {
                    setSearchQuery("");
                    getJobsListing(0,"reset")
                    // setCoursesArray(allCourses); // Reset instantly
                  }}
                  />
                }

              </View>
              {/* <View style={styles.filterBg}>
                  <Ionicons name="options-outline" size={24} color="#fff" />
                </View> */}
            </View>
            <FlatList
              data={jobsData}
              showsVerticalScrollIndicator={false}
              renderItem={prfBasedJobItem}
              onEndReached={fetchData}
              onEndReachedThreshold={0.1}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListFooterComponent={renderFooter}
              keyExtractor={(item, index) => item.id}
              style={styles.jobCont}
              contentContainerStyle={{ paddingBottom: 130 }}
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
                      No Jobs found!
                    </Text>
                  </View>
                );
              }}
            />
          </Animated.View>
      }
      {/* {selectedApplicationStatus == "Applied Jobs" && (
        <Animated.View entering={FadeInDown.duration(500)}>
          <Text
            style={[styles.btsubText, { textAlign: "center", marginTop: 50 }]}
          >
            No Jobs accepted yet!
          </Text>
        </Animated.View>
      )}
      {selectedApplicationStatus == "Accepted" && (
        <Animated.View entering={FadeInDown.duration(500)}>
          <Text
            style={[styles.btsubText, { textAlign: "center", marginTop: 50 }]}
          >
            No Jobs accepted yet!
          </Text>
        </Animated.View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  rejected: {
    color: "red", // Red for rejected
  },
  rejectedView: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  pending: {
    color: "orange", // Orange for pending
  },
  pendView: {
    backgroundColor: "rgba(255, 165, 0, 0.2)",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  accepted: {
    color: "green", // Green for accepted
  },
  acceptView: {
    paddingVertical: 2,
    backgroundColor: "rgba(0, 128, 0, 0.2)",
    paddingHorizontal: 10,
    borderRadius: 3,
  },
  jobCategoryItem: {
    backgroundColor: "#fff",
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedJobCategory: {
    borderColor: "#0069CB",
    borderWidth: 1,
  },
  jobCategoryText: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedJobText: {
    color: "#0069cb",
  },
  jobCategoryBar: {
    marginTop: 5,
    flexDirection: "row",
  },
  jobCont: {
    marginTop: 10,
    gap: 10,
    // marginBottom: 50,
  },

  topPart1: {
    paddingHorizontal: 20,
  },
  filterBg: {
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputBg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    flexDirection: "row"
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    gap: 20,
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
  compBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    gap: 10,
    marginTop: 2,
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
    marginVertical: 3,
    marginHorizontal: 20,
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 20,
    width: "100%"
  },
  momentText: {
    color: "gray",
    fontSize: 11,
    fontWeight: 600
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
    color: "black",
  },
  compText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#929090ff",
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    marginVertical: 1,
  },
  btLeftPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bottompart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
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
  bttimeText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 11,
    marginTop: 5,
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

export default Jobs;
