import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {  FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

function Application() {
 const coursesArray = [
   {
     id: 1,
     name: "React Native",
     type: "Mobile Development",
     description: "Learn to build powerful mobile apps using React Native.",
     enrolled: 1200,
     price: "4,999",
     rating: 4.7,
     image:
       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
   },
   {
     id: 2,
     name: "JavaScript Mastery",
     type: "Web Development",
     description: "Master modern JavaScript from the ground up.",
     enrolled: 2500,
     price: "3,999",
     rating: 4.6,
     image:
       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
   },
   {
     id: 3,
     name: "UI/UX Design Essentials",
     type: "Design",
     description: "Build beautiful and user-friendly interfaces.",
     enrolled: 800,
     price: "2,999",
     rating: 4.5,
     image:
       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
   },
   {
     id: 4,
     name: "AWS Cloud Practitioner",
     type: "Cloud Computing",
     description: "Get certified in AWS cloud fundamentals.",
     enrolled: 1500,
     price: "5,999",
     rating: 4.8,
     image:
       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
   },
   {
     id: 5,
     name: "Data Structures in JavaScript",
     type: "Programming",
     description: "Learn core data structures and algorithms using JS.",
     enrolled: 1700,
     price: "4,499",
     rating: 4.9,
     image:
       "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
   },
 ];

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

  const goToJobDetails = () => {
    router.push("/buyCourse");
  };

  const prfBasedJobItem = ({ item }) => (
    <TouchableOpacity style={styles.basedJob} onPress={goToJobDetails}>
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
        <Text style={styles.typeCourses}>{item.type}</Text>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.trainerName}>Rakesh Saini</Text>
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
  );

  const myCourseItem = ({ item }) => (
    <TouchableOpacity style={styles.basedJob} onPress={goToJobDetails}>
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
        <Text style={styles.typeCourses}>{item.type}</Text>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.trainerName}>Rakesh Saini</Text>
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
          />
        ) : (
          // <Text style={{marginTop:100,color:"gray",textAlign:'center'}}>No Completed Courses !</Text>
          <FlatList
            data={mycoursesArray}
            showsVerticalScrollIndicator={false}
            renderItem={myCourseItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.jobCont}
            scrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
      </Animated.View>
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
