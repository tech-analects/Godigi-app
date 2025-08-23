import apiInstance from "@/app/interceptors";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

function Jobs() {

  const router = useRouter();

  const goToJobDetails = (id) => {
    console.log("hello");
    router.push({
      pathname:'/applyJobs',
      params:{id:id}
    });
  };
  const goToJobApplied = () => {
    console.log("hello");
    router.push("/jobDetails");
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

  const prfBasedJobItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => goToJobDetails(item.id)} style={styles.basedJob}>
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
                <Text style={styles.btsubText}>{item.name}</Text>
              </View>
              <View style={styles.btRightPart}>
                <FontAwesome name="briefcase" size={18} color="gray" />
                <Text style={styles.btsubText}>{item.salary}</Text>
              </View>
              <Text style={styles.bttimeText}>posted 20h ago</Text>
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

  const renderAppliedJobs = ({ item }) => (
    <TouchableOpacity onPress={goToJobDetails} style={styles.basedJob}>
      <View style={styles.topPartRec}>
        <View style={styles.topBased}>
          <Image
            source={ImagesPath.fb}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
          <View>
            <Text style={styles.roleText}>{item.role}</Text>
            <View style={styles.compBased}>
              <Text style={styles.compText}>{item.company}</Text>
              <View style={styles.review}>
                <Text style={styles.subText}>
                  <AntDesign
                    name="star"
                    size={14}
                    color="#FFCC00"
                    style={{ marginHorizontal: 50 }}
                  />
                  {item.rating}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={styles.btRightPart}>
                <Entypo name="location-pin" size={22} color="grey" />
                <Text style={styles.btsubText}>{item.location}</Text>
              </View>
              <View style={styles.btRightPart}>
                <FontAwesome name="briefcase" size={18} color="gray" />
                <Text style={styles.btsubText}>{item.packageRange}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            height: 100,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <FontAwesome name="bookmark" size={24} color={Colors.bg} />
          <Text>{getStatus(item.status)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const [loadingData, setLoadingData] = useState(false);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [limit, setLimit] = useState();
    const [jobsData, setJobsData] = useState([]);


   useEffect(() => {
     getJobsListing(0);
   }, []);

   const getJobsListing = async (customStart) => {
     try {
       if (customStart == 0) {
         console.log("custom start is 0");
         setLoadingData(true);
       } else {
         console.log("custom start is not 0");
         setLoadingMoreData(true);
       }
       console.log("thisis custoemr start", customStart);
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);
       //  formData.append("show", selectedShow);
       formData.append("start", customStart);

       console.log(formData);
       const response = await apiInstance.post(`job/list`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });

       console.log("response of data", response.data);
       if (response.data.status) {
         setHasMore(response.data.has_more);
         let finalDataToPass = response.data.data;
         console.log("This is final data to passs",finalDataToPass)
         if (customStart == 0) {
           console.log("thisis for 0", customStart, finalDataToPass);
           setJobsData(finalDataToPass);
           setLimit(finalDataToPass.length);
           console.log(finalDataToPass.length);
         } else {
           console.log("customStart not 0", customStart);
           console.log("has more in 0 not custom is", response.data.has_more);
           setJobsData((prev) => {
             const newList = [...prev, ...finalDataToPass];
             console.log("prev data here", prev);
             console.log("Previous length:", prev.length);
             console.log("Appended data length:", finalDataToPass.length);
             console.log(
               `new list is for custom start ${customStart}`,
               newList,
               newList.length
             );
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

   const fetchData = () => {
     console.log("readched end here!", loadingMoreData, limit);
     if (loadingMoreData || !hasMore) return;
     const newStart = limit + 1;
     console.log("Fetching more leads from start:", newStart, limit);
     getJobsListing(newStart);
   };

   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = async () => {
     setRefreshing(true);
     await getJobsListing(0);
     setRefreshing(false);
   };

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

        {
          loadingData 
          ?
          <ActivityIndicator style={{marginTop:50}}/>
          :
      <Animated.View entering={FadeInDown.duration(500)}>
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
          keyExtractor={(item, index) => index}
          style={styles.jobCont}
          contentContainerStyle={{ paddingBottom: 100 }}
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
    backgroundColor: "#fafafd",
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
  topPart: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal:20
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
  compBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    gap:10,
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
    marginVertical: 10,
    marginHorizontal:20,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth:0.5,
    borderColor:"lightgray"
  },
  topPartRec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    color:'black',
  },
  compText: {
    fontWeight: "600",
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
    alignItems: "flex-start",
    justifyContent:"flex-start",
    gap:10,
    marginVertical:1
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
  bttimeText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 11,
    marginTop:5
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
