import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AntDesign, Feather, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import ThemeBtn from "@/components/ThemeBtn";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "./interceptors";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { Image } from 'expo-image';

export default function Internships() {

  const [internshipsData, setInternshipsData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const router = useRouter();
  
    const goToNotifications=()=>{
      router.push("/notifications")
    }

  const goToInternshipDetails=(id)=>{
    console.log(id)
    // navigation.navigate('internshipDetails',{id:id})
    router.push({
      pathname:"/applyJobs",
       params: { id: id,prf:"Internship" },
    })
  }

  
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState();
  const [intershipData, setIntershipData] = useState([]);

  useEffect(() => {
    getIntershipListing(0);
  }, []);

  const getIntershipListing = async (customStart) => {
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
      const response = await apiInstance.post(`internship/list`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("response of data", response.data);
      if (response.data.status) {
        setHasMore(response.data.has_more);
        let finalDataToPass = response.data.data;
        console.log("This is final data to passs", finalDataToPass);
        if (customStart == 0) {
          console.log("thisis for 0", customStart, finalDataToPass);
          setIntershipData(finalDataToPass);
          setLimit(finalDataToPass.length);
          console.log(finalDataToPass.length);
        } else {
          console.log("customStart not 0", customStart);
          console.log("has more in 0 not custom is", response.data.has_more);
          setIntershipData((prev) => {
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
      setIntershipData([]);
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
    getIntershipListing(newStart);
  };

  const myInternshipItem = ({ item }) => {
      let newUrl = `https://godigiinfotech.com/${item.url}`;
    return(
    <TouchableOpacity
      style={styles.basedJob}
      onPress={() => goToInternshipDetails(item.id)}
    >
       <View style={{width:"35%",justifyContent:'center'}}>
      {
                item.url == null
                ?
                <Image
                  source={ImagesPath.iDummy}
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 10,
                  }}
                   contentFit="fill"
             transition={1000}
                  />
                  :
                  <Image
                  source={{ uri: newUrl }}
                  style={{
                    width: "100%",
                    height: 100,
                  borderRadius: 15,
                }}
                 contentFit="fill"
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
        }}
      >
        <Text style={styles.typeCourses}>{item.company_name}</Text>
        <Text style={styles.courseName} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        <View style={styles.priceView}>
          <FontAwesome name="rupee" size={16} color={Colors.bg} />
          <Text style={styles.coursePrice}>{item.salary}</Text>
        </View>
        {/* <Text
          style={[
            styles.courseStat,
            {
              color: item.status == "Pending" ? "orange" : "green",
              backgroundColor:
                item.status == "Pending"
                  ? "rgba(255, 165, 0, 0.2)"
                  : "rgba(0, 128, 0, 0.2)",
            },
          ]}
        >
          {item.status}
        </Text> */}
      </View>
    </TouchableOpacity>
  )};

  const [refreshing, setRefreshing] = useState(false);

   const onRefresh = async () => {
     setRefreshing(true);
     await getIntershipListing(0);
     setRefreshing(false);
   };

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
         <Feather name="arrow-left" size={24} 
            color="#fff"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Internships</Text>
          <View>
            {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications}/> */}
          </View>
      </View>
      {loadingData ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={intershipData}
          showsVerticalScrollIndicator={false}
          renderItem={myInternshipItem}
          keyExtractor={(item) => item.id}
          style={styles.jobCont}
          scrollEnabled={true}
          onEndReached={fetchData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
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
                                  No Internships found!
                                </Text>
                              </View>
                            );
                          }}
        />
      )}

      {/* Submit Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fafafd",
  },
  jobCont: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal:20,
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
  basedJob: {
    backgroundColor: "#fff",
    width: "100%",
    gap: 5,
    flexDirection: "row",
    // height: 180,
    borderRadius: 10,
    marginVertical: 2,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    padding: 10,
    // elevation: 3,
    // shadowColor: "gray",
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 2 },

      shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
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
  coursePrice: {
    fontWeight: 700,
    fontSize: 13,
    textAlign: "right",
    color: Colors.bg,
  },
  priceView: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  courseName: {
    fontWeight: 600,
    fontSize: 15,
    width:Platform.OS == "ios" ? 200 : 220,
  },
  trainerName: {
    fontWeight: 600,
    fontSize: 11,
    color: "gray",
  },
});
