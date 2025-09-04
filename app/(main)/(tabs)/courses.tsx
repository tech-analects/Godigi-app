import apiInstance from "@/app/interceptors";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {  ActivityIndicator, FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

function Application() {


  const [coursesArray,setCoursesArray] = useState([]);

 const mycoursesArray = [
   {
     id: 1,
     name: "React Native",
     type: "Mobile Development",
     description: "Learn to build powerful mobile apps using React Native.",
     enrolled: 1200,
     price: "$49.99",
     rating: 4.7,
     status: "Pending",
     image:
       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
   },
   {
     id: 2,
     name: "JavaScript Mastery",
     type: "Web Development",
     description: "Master modern JavaScript from the ground up.",
     enrolled: 2500,
     price: "$39.99",
     rating: 4.6,
     status: "Completed",
     image:
       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
   },
 ];


  const router = useRouter();

  const goToCourseDetails = (id) => {
    console.log("hello");
    router.push({
      pathname:'/buyCourse',
      params:{id:id}
    });
  };

  const [loadingData,setLoadingData] = useState(false)

  useEffect(()=>{
    getCoursesListing();
  },[])

   const getCoursesListing = async () => {
     try {
         setLoadingData(true);
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);

       console.log(formData);
       const response = await apiInstance.post(`course/list`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });

       console.log("response of data", response.data);
       if(response.data.status){
          setCoursesArray(response.data.data)
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
    return(
      <TouchableOpacity style={styles.basedJob} onPress={()=>goToCourseDetails(item.id)}>
      <Image
        source={{uri:newUrl}}
        style={{
          width: "30%",
          height: 100,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <Text style={styles.typeCourses}>{item.type || "FullStack Dev"}</Text>
        <Text style={styles.courseName}>{item.title}</Text>
        <View style={styles.priceView}>
          <FontAwesome
            name="rupee"
            size={16}
            color={Colors.bg}
          />
          <Text style={styles.coursePrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

  const myCourseItem = ({ item }) => (
    <TouchableOpacity style={styles.basedJob} >
      <Image
        src={item.image}
        style={{
          width: "30%",
          height: 100,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <Text style={styles.typeCourses}>FullStack dev</Text>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text
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
        </Text>
      </View>
    </TouchableOpacity>
  );

  const [isFilterViewOpen, setIsFilterViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Courses");

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
                  backgroundColor: "#0069cb",
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

        {
          loadingData
          ?
          <ActivityIndicator style={{marginTop:50}}/>
          :

      <Animated.View entering={FadeInDown.duration(500)} style={{paddingHorizontal:20}}>
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
            scrollEnabled={true}
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
                  No Courses found!
                </Text>
              </View>
            );
          }}
          />
        ) : (
          // <Text style={{marginTop:100,color:"gray",textAlign:'center'}}>No Completed Courses !</Text>
          <FlatList
            data={[]}
            showsVerticalScrollIndicator={false}
            renderItem={myCourseItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.jobCont}
            scrollEnabled={true}
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
    fontSize: 15,
  },
  trainerName: {
    fontWeight: 600,
    fontSize: 11,
    color:"gray"
  },
  bgMain: {
    backgroundColor: "#fafafd",
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
    gap:5,
    flexDirection: "row",
    // height: 180,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    padding: 10,
    elevation: 3,
    shadowColor: "gray",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
