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
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import ThemeBtn from "@/components/ThemeBtn";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "./interceptors";
import Toast from "react-native-toast-message";

export default function FeedbackScreen() {


  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackListPending, setFeedbackListPending] = useState([]);
  const [feedbackListCompleted, setFeedbackListCompleted] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [overAllFeedback, setOverAllFeedback] = useState({});

  
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

  const getPendingFeedbackList = async () => {
    try {
      setLoading(true)
      const formdata = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formdata.append("token", token);
      console.log(token)
      const response = await apiInstance.post("feedback/fetch-feedback/pending", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        console.log("pending is", response.data)
        setFeedbackListPending(response.data.data)
      }
    } catch (error) {
      console.log("error", error)
    }
    finally {
      setLoading(false)
    }
  }

  const getCompletedFeedbackList = async () => {
    try {
      setLoading(true)
      const formdata = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formdata.append("token", token);
      console.log(token)
      const response = await apiInstance.post("feedback/fetch-feedback/completed", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        console.log(response.data)
       
        setFeedbackListCompleted(response.data.data)
      }
    } catch (error) {
    
      console.log("error", error)
    }
    finally {
      setLoading(false)
    }
  }

  const getOverAllFeedbackList = async () => {
    try {
      setLoading(true)
      const formdata = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formdata.append("token", token);
      console.log(token)
      const response = await apiInstance.post("feedback/overall-feedback", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        console.log(response.data)
        setOverAllFeedback(response.data.data)
      }
    } catch (error) {
      console.log("error", error)
    }
    finally {
      setLoading(false)
    }
  }

  const hanldeFeedbackSubmit = async () => {
    try {
      setSubmmitting(true)
      const formdata = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formdata.append("token", token);
      formdata.append("scf_id", selectedFeedback?.scf_id);
      formdata.append("rating", rating);
      formdata.append("comment", feedback);
      console.log(formdata)
      const response = await apiInstance.post("feedback/store-feedback", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status) {
        console.log(response.data)
         showToast("Feedback submitted successfully!")
        setFeedbackModalOpen(false);
        getPendingFeedbackList();
        getOverAllFeedbackList();
        getCompletedFeedbackList();
      }
    } catch (error) {
      console.log("error", error)
      showErrToast("Unable to submit the Feedback !")
    }
    finally {
      setFeedbackModalOpen(false)
      setSubmmitting(false)
    }
  }

  useEffect(() => {
    getPendingFeedbackList();
    getCompletedFeedbackList();
    getOverAllFeedbackList();
  }, [])



  const handleRating = (value) => {
    setRating(value);
  };

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const feedArray = [
    {
      id: 1,
      name: "Pending",
    },
    {
      id: 2,
      name: "Completed",
    },
    {
      id: 3,
      name: "Overall",
    },
  ];

  const [selectedInfo, setSelectedInfo] = useState("Pending");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const feedBackModal = (
    <Modal
      visible={feedbackModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setFeedbackModalOpen(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text></Text>
            <Entypo name="cross" size={24} color={Colors.bg} onPress={() => {setFeedbackModalOpen(false);setRating(0);setFeedback('')}} />
          </View>

          <Text style={styles.heading}>We value your feedback! 💬</Text>
          <Text style={styles.subHeading}>
            Help us improve by sharing your experience.
          </Text>
          <View style={{flexDirection:'row',gap:5,marginVertical:5}}>
          <Text style={{ fontWeight: 600 }}>Subject Name : </Text>
          <Text style={{ fontWeight: 500,color:"gray" }}>{selectedFeedback?.subject_name}</Text>
          </View>
          <View style={{flexDirection:'row',gap:5,marginVertical:5}}>
          <Text style={{ fontWeight: 600 }}>Title: </Text>
          <Text style={{ fontWeight: 600,color:"gray"  }}>{selectedFeedback?.title}</Text>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingContainerModal}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRating(index + 1)}
                >
                  <Ionicons
                    name={index < rating ? "star" : "star-outline"}
                    size={35}
                    // color="#FFD700"
                    color={Colors.bg}
                  />
                </TouchableOpacity>
              ))}
          </View>

          {/* Feedback Input */}
          <Text style={styles.labelModal}>Your Comments</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Write your feedback here..."
            value={feedback}
            onChangeText={setFeedback}
          />
          <ThemeBtn btnTitle={"Submit "} onPress={hanldeFeedbackSubmit} loadingBtn={submitting} />
        </View>
      </View>
    </Modal>
  );

  const renderFeedItem = ({ item }) => (
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


  const feedbackList = [
    {
      id: 1,
      name: "Aarav Mehta",
      title: 'Trainer Explained Everything Clearly',
      email: "aarav.mehta@example.com",
      rating: 5,
      message: "The app UI is super clean and responsive. Loved the experience!",
      date: "2025-10-10T10:23:00Z"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: 'Trainer Explained the tasks',
      email: "priya.sharma@example.com",
      rating: 4,
      message: "Works great but the notifications sometimes delay. Please fix that.",
      date: "2025-10-09T14:18:00Z"
    },
    {
      id: 3,
      name: "Rahul Nair",
      title: 'Trainer Explained Everything Clearly',
      email: "rahul.nair@example.com",
      rating: 3,
      message: "Good features, but app loads slowly on older devices.",
      date: "2025-10-08T08:42:00Z"
    },
    {
      id: 4,
      name: "Simran Kaur",
      email: "simran.kaur@example.com",
      title: 'Trainer Provided the notes',
      rating: 5,
      message: "Love the dark mode and smooth navigation!",
      date: "2025-10-07T17:12:00Z"
    },
    {
      id: 5,
      name: "Dev Patel",
      title: 'Trainer Explained each topic',
      email: "dev.patel@example.com",
      rating: 2,
      message: "Crashes when I try to upload a photo. Please check.",
      date: "2025-10-06T09:50:00Z"
    }
  ];

  const subjects = [
    {
      id: "1",
      name: "HTML",
      totalFeedback: 5,
      pendingFeedback: 0,
      overallRating: 4.8,
    },
    {
      id: "2",
      name: "CSS",
      totalFeedback: 5,
      pendingFeedback: 0,
      overallRating: 4.8,
    },
    {
      id: "3",
      name: "JavaScript",
      totalFeedback: 8,
      pendingFeedback: 2,
      overallRating: 4.6,
    },
    {
      id: "4",
      name: "React",
      totalFeedback: 10,
      pendingFeedback: 1,
      overallRating: 4.9,
    },
  ];



  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Feather name="arrow-left" size={24}
          color="#fff"
          onPress={goBack}
        />
        <Text style={styles.pageName}>Feedback</Text>
        <View>
          {/* <Fontisto name="bell" size={22} color="#fff" /> */}
        </View>
      </View>

      <View style={{ height: 50, marginHorizontal: 20 }}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: 'center'
          }}
          horizontal
          data={feedArray}
          renderItem={renderFeedItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.jobCategoryBar}
        />
      </View>

     {
      loading
      ?
      <ActivityIndicator color={Colors.bg} style={{marginTop:50}}/>
      :
      <>
       {
        selectedInfo == "Completed"
        &&
        <FlatList
          data={feedbackListCompleted}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{
              marginHorizontal: 20, marginVertical: 3, padding: 15, borderRadius: 10, borderBottomWidth: 1, borderColor: "#ddd", backgroundColor: '#fff', shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 2,
              shadowOpacity: 0.12,
              elevation: 2,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ alignItems: 'flex-start', gap: 3 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.subject_name}</Text>
                  <View style={{ backgroundColor: "#ECEAFA", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 }}>
                    <Text style={{ fontWeight: "500", color: "#665E98", fontSize: 12 }}>{item.trainer_name || "ABC"}</Text>
                  </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                  {/* <Text style={{ color: "white", fontSize: 10, fontWeight: 600 }}>Completed</Text> */}
                  <Entypo name="dot-single" size={34} color="green" />
                  <Text style={{ marginVertical: 5 }}>⭐ {item.rating} / 5</Text>
                </View>
              </View>
              
              <Text style={{ marginTop: 5, fontWeight: 600 }}>{item.question
              }</Text>
              <Text style={{ marginBottom: 10 }}>{item.comment}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={{ fontSize: 12, color: "gray" }}>
                  {new Date(item.
                    created_at).toLocaleString().split(",")[0]}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {new Date(item.
                    created_at).toLocaleString().split(",")[1]}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: "center",
                padding: 10,
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Completed Feedbacks yet!
              </Text>
            </View>
          )}
        />
      }
      {
        selectedInfo == "Pending"
        &&
        <FlatList
          data={feedbackListPending}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{
              marginHorizontal: 20, marginVertical: 3, padding: 15, borderRadius: 10, borderBottomWidth: 1, borderColor: "#ddd", backgroundColor: '#fff', shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 2,
              shadowOpacity: 0.12,
              elevation: 2,
            }} onPress={() => { setFeedbackModalOpen(true); setSelectedFeedback(item); console.log(item) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ alignItems: 'flex-start', gap: 3 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.subject_name}</Text>
                  <View style={{ backgroundColor: "#ECEAFA", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1, marginTop: 5 }}>
                    <Text style={{ fontWeight: "500", color: "#665E98", fontSize: 12 }}>{item.trainer_name}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: "#e0a910ff", borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 }}>

                  <Text style={{ color: "white", fontSize: 10, fontWeight: 600 }}>pending</Text>
                </View>
              </View>
              {/* <Text>⭐ {item.rating} / 5</Text> */}
              <Text style={{ marginVertical: 10, fontWeight: 600 }}>{item.title}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={{ fontSize: 12, color: "gray" }}>
                  {new Date(item.
                    created_at
                  ).toLocaleString().split(",")[0]}
                </Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {new Date(item.
                    created_at
                  ).toLocaleString().split(",")[1]}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: "center",
                padding: 10,
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Pending Feedbacks yet
              </Text>
            </View>
          )}
        />
      }

      {
        selectedInfo == "Overall"
        &&
        <View style={{ padding: 10, flex: 1 }}>
          <View style={styles.overallCard}>
            <Text style={styles.mainTitle}>Overall Course Rating</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={28} color="#FFD700" />
              <Text style={styles.overallRating}>{overAllFeedback.overall_feedback_rating[0].overall_rating}</Text>
              <Text style={styles.outOf}>/5</Text>
            </View>
            <Text style={styles.subText}>Based on all subjects’ feedback</Text>
          </View>

          <FlatList
            data={overAllFeedback?.subject_feedback_rating}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10, flex: 1 }}
            renderItem={({ item }) => (
              <View style={styles.subjectCard}>
                <View style={styles.subjectHeader}>
                  <Text style={styles.subjectName}>{item.subject_name
                  }</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.
                      average_rating?.split(".")[0]
                    }/5</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      }
      </>
     }

      {/* Submit Button */}
      {feedBackModal}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafd",
    flex: 1
  },
  jobCategoryBar: {
    // marginHorizontal: 10,
    flexDirection: "row",
    paddingVertical: 0,
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
    paddingHorizontal: 20
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white'
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  ratingContainerModal: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    // marginTop: 10,
    color: "#333",
  },
  overallCard: {
    // backgroundColor: "#001D34",
    backgroundColor: Colors.bg,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10
  },
  mainTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  overallRating: {
    color: "#FFD700",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 5,
  },
  outOf: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 3,
  },
  subText: {
    color: "#cecece",
    fontSize: 13,
    marginTop: 6,
  },
  subjectCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    justifyContent:"center",
    marginBottom: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.12,
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#001D34",
  },
  ratingBadge: {
    flexDirection: "row",
    backgroundColor: "#EAF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    color: "#001D34",
    fontSize: 13,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  labelModal: {
    color: "#6C7278",
    fontSize: 13,
    marginTop: 20
  },
  value: {
    fontWeight: "600",
    fontSize: 13,
    color: "#001D34",
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    height: 120,
    borderColor: "#ddd",
    borderWidth: 1,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 4,
  },
  suggestionText: {
    marginLeft: 5,
    color: "green",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 30,
    width: "90%",
    height: "65%",
    justifyContent: 'center',
  },
  jobCategoryItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1.5,
    paddingHorizontal: 30,
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
    textAlign: 'center'
  },
  selectedJobText: {
    fontSize: 14,
    color: "#0069CB",
  },
  submitBtn: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
