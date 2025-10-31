import ThemeBtn from "@/components/ThemeBtn";
import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import apiInstance from "./interceptors";
import AutoHeightWebView from "react-native-autoheight-webview";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';

function ApplyJobs() {
  const navigation = useNavigation();
  const jobArray = [
    {
      id: 1,
      name: "Description",
    },
    {
      id: 2,
      name: "Qualification",
    },
    {
      id: 3,
      name: "Skills",
    },
    {
      id: 4,
      name: "About Company",
    },
  ];
  const [selectedInfo, setSelectedInfo] = useState(jobArray[0]?.name);
  const goBack = () => {
    navigation.goBack();
  };

  const route = useRoute();
  const local = useLocalSearchParams();
  let jobId = route.params?.id || local.jobId
  let profile = route.params?.prf || local.prf;
  // console.log(jobId,profile,route,local)


  const type = ["Full Time", "Remote", "Director"];


  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.jobCategoryItem,
        selectedInfo === item.name && styles.selectedJobCategory,
      ]}
      onPress={() => setSelectedInfo(item.name)}
    >
      <Text
        style={[
          styles.jobCategoryText,
          selectedInfo === item.name && styles.selectedJobText,
        ]}
      >
        {item.id == 1 ? `${profile} ${item.name}` : item.name}
      </Text>
    </TouchableOpacity>
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.iconText}>{item.icon}</Text>
      <Text style={styles.subHeadText}>{item.perk}</Text>
    </View>
  );


  const renderSkills = ({ item }) => (
    <View style={styles.skillContainer}>
      <Text style={styles.skillText}>{item}</Text>
    </View>
  );

  const router = useRouter();

  const goToApplications = () => {
    setIsSuccessModalOpen(false);
    router.push("/(main)/(tabs)/jobs");
  };
  const goToUrl = async (url) => {
    try {
      const supported = await Linking.canOpenURL(`https://${url}`);

      if (supported) {
        await Linking.openURL(`https://${url}`);
      } else {
        Alert.alert("Error", `Can't open this URL: ${url}`);
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  const [loading,setLoading] = useState(false);
  const [loadingApply,setLoadingApply] = useState(false);
  const [jobDetails, setJobDetails] = useState([]);
  const [isBookmarkAdded, setIsBookmarkAdded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [addingBookmark, setAddingBookmark] = useState(false);
  const [jobIdBookmarking, setJobIdBookmarking] = useState(null);
  


  const getJobDetails=async()=>{
    try {
      setLoading(true)
       let formData = new FormData();
       const token = await AsyncStorage.getItem("logged_in_user_token");
       formData.append("token", token);

      //  console.log(formData);
       const response = await apiInstance.post(
         `job-internship/details/${jobId}`,
         formData,
         {
           headers: { "Content-Type": "multipart/form-data" },
         }
       );
       if(response.data.status){
        //  console.log(response.data)
        setJobDetails(response.data.data)
       }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(jobId){
      // console.log("jobid id",jobId)
      getJobDetails();
      addJobInternshipView();
    }
  },[])

 const copyUrl = async (url) => {
  try {
    await Clipboard.setStringAsync(url);
    setIsCopied(true)
    showToast("The link has been copied to your clipboard.");
  } catch (error) {
    console.error("Error copying URL: ", error);
  }
};

const handleCall = (mob) => {
  if (!mob) {
    Alert.alert("Invalid Number", "Phone number is missing");
    return;
  }

  let phoneNumber = `tel:${mob}`;

  Linking.openURL(phoneNumber).catch((err) => {
    console.error("Error while trying to make a call: ", err);
    Alert.alert("Error", "Unable to make a call right now.");
  });
};

   const addJobInternshipView = async () => {
       try {
         let formData = new FormData();
         const token = await AsyncStorage.getItem("logged_in_user_token");
         formData.append("token", token);
  
        //  console.log(formData);
         const response = await apiInstance.post(
           `update-counts/0/${jobId}`,
           formData,
           {
             headers: { "Content-Type": "multipart/form-data" },
           }
         );
  
         console.log("response of view api data", response.data);
       } catch (error) {
         console.log("this is err ", error);
       }
     };

     const openMail=(toEmail)=>{
       const mailUrl = `mailto:${toEmail}?subject=${encodeURIComponent("Job enquiry")}&body=${encodeURIComponent("Hello," )}`;
       Linking.canOpenURL(mailUrl)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Error", "No email app found to open.");
      } else {
        return Linking.openURL(mailUrl);
      }
    })
    .catch((err) => console.error("An error occurred", err));
     }

   const applyJobUpdate = async () => {
       try {
        setLoadingApply(true)
         let formData = new FormData();
         const token = await AsyncStorage.getItem("logged_in_user_token");
         formData.append("token", token);
  
         console.log(formData);
         const response = await apiInstance.post(
           `job/update-job-apply-count/${jobId}`,
           formData,
           {
             headers: { "Content-Type": "multipart/form-data" },
           }
         );
  
        //  console.log("response of count apply data", response.data);
        if(response.data.status){
           setIsSuccessModalOpen(true)
         }
       } catch (error) {
         console.log("this is err ", error);
       }
       finally{
        setLoadingApply(false)
       }
     };

    const successModal = (
      <Modal
        visible={isSuccessModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSuccessModalOpen(!isSuccessModalOpen)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
           
            <Text style={styles.contactHead}>Contact Details</Text>
            <Text style={styles.contactHead2}>Below are the contact details of the respective hiring managers. You can reach out to them to schedule your interview.</Text>
            <View style={{marginVertical:30}}>
              {
                jobDetails?.hr_name
                &&
              <View style={styles.duraView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={[styles.compText, { color: Colors.bg }]}>
                  HR Name :{" "}
                </Text>
                <Text style={styles.compText2}>
                  {" "}
                  {jobDetails?.hr_name || "NA"}
                </Text>
                </View>  
              </View>
              }
              {
                jobDetails?.company_phone
                &&
              <View style={styles.duraView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={[styles.compText, { color: Colors.bg }]}>
                  Contact :{" "}
                </Text>
                <Text style={styles.compText2}>
                  {" "}
                  {jobDetails?.company_phone || "NA"}
                </Text>
                </View>
                <TouchableOpacity onPress={()=>handleCall(jobDetails?.company_phone)}>
                  <Ionicons name="call" size={20} color={Colors.bg} />
                </TouchableOpacity>
              </View>
              }
              {
                jobDetails?.company_url
                &&
              <View style={styles.duraView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={[styles.compText, { color: Colors.bg }]}>
                  Site :{" "}
                </Text>
                <Text style={styles.compText2}>
                  {" "}
                  {jobDetails?.company_url || "NA"}
                </Text>
                </View>  
                <TouchableOpacity onPress={()=>copyUrl(jobDetails?.company_url)}>
                  <Ionicons name={isCopied ? "copy" : "copy-outline"} size={20} color={Colors.bg} />
                </TouchableOpacity>
              </View>
              }
              </View>
            <View style={{height:100}}>
              {
                jobDetails?.company_email &&
                <ThemeBtn
                  btnTitle={"Send Mail"}
                  // onPress={()=>openMail("787878")}
                  onPress={()=>openMail(jobDetails.company_email)}
                />
              }
            <ThemeBtn
              btnTitle={"OK"}
              onPress={() => setIsSuccessModalOpen(false)}
            />
            </View>
          </View>
        </View>
      </Modal>
    );


  const [scrollPosition,setScrollPosition] = useState(0)
  const handleScrollEvent=(e)=>{
    const scrollY = e.nativeEvent.contentOffset.y;
    setScrollPosition(scrollY)
  }

   const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style>
          body {
            font-family: -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            color: #333;
            padding: 0;
          }
        </style>
      </head>
      <body>${jobDetails?.job_description || "Not disclosed"}</body>
    </html>
  `;
   const htmlContentCompanyProfile = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style>
          body {
            font-family: -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            color: #333;
            padding: 0;
          }
        </style>
      </head>
      <body>${jobDetails?.company_profile || "Not disclosed"}</body>
    </html>
  `;

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
  
  
  
  const addBookmark=async()=>{
    try{
      setAddingBookmark(true);
       const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      formdata.append("job_id", jobId);
      const response = await apiInstance.post(
        `bookmark/store`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response.data)
      if(response.data.status){
        // setIsBookmarkAdded(true);
        let newDataWithBookmarkAdded = {...jobDetails,bookmark_id:response.data.bookmark_id}
        // console.log(newDataWithBookmarkAdded,newDataWithBookmarkAdded.bookmark_id)
        setJobDetails(newDataWithBookmarkAdded);
         showToast("Bookmark added successfully!")
      }
    }
    catch(err){
      console.log(err)
       showErrToast("Bookmark was not added successfully!")
    }
    finally{
      setAddingBookmark(false)
    }
  }
  const removeBookmark=async()=>{
    try{
      setAddingBookmark(true);
      // console.log("bookamk to del",jobDetails?.bookmark_id)
       const userTok = await AsyncStorage.getItem("logged_in_user_token");
      const formdata = new FormData();
      formdata.append("token", userTok);
      const response = await apiInstance.post(
        `bookmark/delete/${jobDetails?.bookmark_id}`,
        // `bookmark/delete/5`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response.data)
      if (response.data.status) {
       const updatedJobs = {...jobDetails,bookmark_id:null}
      //  const updatedJobs = jobDetails.map((item) =>
      //    jobDetails?.bookmark_id === id ? { ...item, bookmark_id: null } : item
      //  );
       setJobDetails(updatedJobs);
         showToast("Bookmark removed successfully!")
      }
    }
    catch(err){
      console.log(err)
       showErrToast("Bookmark was not removed successfully!")
    }
    finally{
      setAddingBookmark(false)
    }
  }

  return (
    <>
      {scrollPosition < 20 ? (
        <StatusBar barStyle={"light-content"} />
      ) : (
        <StatusBar hidden translucent backgroundColor={"transparent"} />
      )}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.bgMain}
            contentContainerStyle={{ paddingBottom: 80 }}
            onScroll={(e) => handleScrollEvent(e)}
            scrollEventThrottle={16}
          >
            <View style={styles.upperPart}>
              <View style={styles.topPart}>
                <View style={styles.leftside}>
                  <AntDesign
                    name="left"
                    size={22}
                    color="#fff"
                    onPress={goBack}
                  />
                  
                </View>
                {
                  profile == "Job"
                  &&
                <View style={styles.rightside}>
                  {addingBookmark ?
                  <ActivityIndicator color={"#fff"}/>
                  :
                  jobDetails.bookmark_id == null ? (
                             <FontAwesome
                               name="bookmark-o"
                               size={24}
                               color={"#fff"}
                               onPress={() => addBookmark()}
                             />
                           ) : (
                             <FontAwesome
                               name="bookmark"
                               size={24}
                               color={"#fff"}
                               onPress={() => removeBookmark()}
                             />
                           )}

                 
                </View>
                }
              </View>
              <View style={styles.topBased}>
                    {
            jobDetails.url == null
            ?
            jobDetails.company_name == null
            ?
            <View style={styles.nameBg}>
             <FontAwesome name="building" size={24} color="#fff" />
            </View> 
            : 
            <View style={styles.nameBg}>
              <Text style={{color:"white",fontWeight:600,fontSize:25}}>{jobDetails?.company_name?.charAt(0)}</Text>
            </View>  
            :
         <View style={styles.imageBg}>
           <Image
          //  source={ImagesPath.compLogo}
            source={{uri:`https://godigiinfotech.com/${jobDetails.url}`}}
           style={{ width: 50, height: 50}}
            contentFit="fill"
             transition={1000}
           />
           </View>
                    }
                <View>
                  <Text style={styles.roleText} onPress={()=>console.log(jobDetails?.bookmark_id)}>
                    {jobDetails?.title || "Not disclosed"}
                  </Text>
                  <View style={styles.compBased}>
                    <Text style={styles.compText}>
                      {jobDetails?.company_name || "Not disclosed"}
                    </Text>
                    {/* <View style={styles.review}>
                      <Text style={styles.subText}>
                        <AntDesign
                          name="star"
                          size={14}
                          color="#FFCC00"
                          style={{ marginHorizontal: 50 }}
                        />
                        4.5
                      </Text>
                      <View style={styles.line}></View>
                      <Text style={styles.rev}>Review</Text>
                    </View> */}
                  </View>
                </View>
              </View>
              <View style={styles.dottedLine}></View>
              <View style={styles.detailsCont}>
                <View style={styles.rowDetails}>
                  <View style={styles.part}>
                    <FontAwesome name="briefcase" size={24} color="#fff" />
                    <Text style={styles.detail}>
                      {jobDetails?.min_year_of_exp} -{" "}
                      {jobDetails.max_year_of_exp} years
                    </Text>
                  </View>
                  <View style={styles.part}>
                    <Ionicons name="people-sharp" size={24} color="#fff" />
                    <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
                      {`${jobDetails.no_of_openings || 0} vacancies` ||
                        "Not disclosed"}
                    </Text>
                  </View>
                </View>
                <View style={styles.rowDetails}>
                  <View style={styles.part}>
                    <View style={{width:25,justifyContent:'center',alignItems:'center'}}>
                     <FontAwesome name="rupee" size={24} color={"#fff"} />
                    </View>
                    <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
                      {jobDetails?.salary || "Not disclosed"}
                    </Text>
                  </View>
                  <View style={styles.part}>
                    <Entypo name="location-pin" size={24} color="#fff" />
                    <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
                      {jobDetails?.city_name || "Not disclosed"}
                    </Text>
                  </View>
                </View>
                <View style={styles.rowDetails}>
                  <View style={styles.part}>
                    <View style={{width:25,justifyContent:'center',alignItems:'center'}}>
                    <Ionicons name="laptop" size={24} color={"#fff"} />
                    </View>
                    <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
                      {jobDetails?.
job_work_type_title
 || "Not disclosed"}
                    </Text>
                  </View>
                  <View style={styles.part}>
                    <MaterialCommunityIcons name="clock" size={24} color="#fff" />
                    <Text style={styles.detail} numberOfLines={1} ellipsizeMode="tail">
                      {jobDetails?.
job_working_type_title || "Not disclosed"}
                    </Text>
                  </View>
                </View>
                {/* <View style={styles.rowDetails}>
                  <View style={styles.part1}>
                    <Entypo name="location-pin" size={24} color="#fff" />
                    <Text style={styles.detail}>
                      {jobDetails?.city_name || "Not disclosed"}
                    </Text>
                  </View>
                </View> */}
              </View>
              {/* <View style={styles.typeView}>
                {type.map((i, index) => {
                  // Return the Text component for each job type
                  return (
                    <Text style={styles.type} key={index}>
                      {i}
                    </Text>
                  );
                })}
              </View> */}
            </View>
            <View style={{ height: 50 }}>
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
            <View style={styles.info}>
              {selectedInfo == "Description" && (
                <View style={styles.jd}>
                  {/* <Text style={styles.subHeadText}>
                    We are looking for a skilled and passionate Frontend
                    Developer to join our dynamic team at Tech Solutions Inc. As
                    a Frontend Developer, you will be responsible for developing
                    and maintaining the user interface of our web applications.
                    You will work closely with designers and backend developers
                    to create seamless and visually appealing websites that
                    provide an excellent user experience.
                  </Text> */}
                  <AutoHeightWebView
                    customStyle={`
                             * {font-family: -apple-system, Roboto, Arial; font-size:14px; color:#333;}
                             body {marginTop:0; padding:0;}
                           `}
                    source={{ html: htmlContent }}
                    startInLoadingState
                    viewportContent={"width=device-width, user-scalable=no"}
                    scrollEnabled={false}
                    style={{ width: "100%", marginTop: 0 }}
                  />
                </View>
              )}

              {selectedInfo == "Qualification" && (
                <View style={styles.jd}>
                  {/* <FlatList
                    data={qualifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.subHeadText}>{item}</Text>
                      </View>
                    )}
                  /> */}
                  <Text style={styles.qualfText}>
                    {jobDetails?.qualification || "Not disclosed"}
                  </Text>
                </View>
              )}
              {/* {selectedInfo == "Perks and benefit" && (
                <View style={styles.jd}>
                  <Text style={styles.subHead}>Perks and Benefits</Text>
                  <FlatList
                    data={perksAndBenefits}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                  />
                </View>
              )} */}
              {selectedInfo == "Skills" && (
                <View style={styles.jd}>
                  <FlatList
                    data={jobDetails?.keyskills_names || []}
                    renderItem={renderSkills}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.listContainer}
                  />
                </View>
              )}

              {selectedInfo == "About Company" && (
                <>
                  <View style={styles.jd}>
                  </View>
                  <View style={styles.jd}>
                    {/* <Text style={styles.subHead}>About Company</Text> */}
                    <AutoHeightWebView
                      customStyle={`
                             * {font-family: -apple-system, Roboto, Arial; font-size:14px; color:#333;}
                             body {marginTop:20; padding:0;}
                           `}
                      source={{ html: htmlContentCompanyProfile }}
                      startInLoadingState
                      viewportContent={"width=device-width, user-scalable=no"}
                      scrollEnabled={false}
                      style={{ width: "100%", marginTop: 20 }}
                    />
                  </View>
                  {/* <View style={styles.jd}>
                    <Text style={styles.subHead}>Company Info.</Text>
                    <Text style={styles.subHeadText}>
                      809, Godrej and Boyce compound , Vikhroli, Mumbai, 444
                      301.
                    </Text>
                  </View> */}
                </>
              )}
            </View>
            {successModal}
          </ScrollView>
          <View style={styles.btnView}>
            <ThemeBtn
              btnTitle={"Apply"}
              onPress={applyJobUpdate}
              loadingBtn={loadingApply}
            />
          </View>
        </View>
        // <Text>hello</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  rightRow: {
    width: "50%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 30,
    width: "90%",
    height: "auto",
  },
  modalImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 200,
    // objectFit: "contain",
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.bg,
    textAlign: "center",
  },
  modalTitleErr: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    marginVertical: 30,
    color: "#6C7278",
  },
  leftRow: {
    width: "50%",
  },
  rowHead: {
    fontSize: 17,
    fontWeight: "bold",
    color: "grey",
  },
  rowBd: {
    fontSize: 15,
    fontWeight: "semibold",
    color: Colors.bg,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
  },
  listContainer: {
    marginBottom: 0,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconText: {
    width: 40,
    height: 30,
    textAlign: "center",
  },
  skillContainer: {
    margin: 10,
    // backgroundColor:"red"
  },
  skillText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: Colors.bg,
    color: Colors.bg,
    borderWidth: 2,
  },
  itemContainer: {
    marginVertical: 2,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  btnView: {
    position: "absolute",
    bottom: 0,
    padding: 5,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "#fafafd",

    paddingBottom: Platform.OS == "android" ? 10 : 50,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -7,
  },
  bullet: {
    fontSize: 20,
    color: "grey",
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  subHeadText: {
    color: "grey",
    fontWeight: 500,
    fontSize: 16,
    margin: 10,
    marginTop: 5,
  },
  subHead: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  qualfText: {
    color: "gray",
    fontWeight: "semibold",
    marginTop: 10,
    fontSize: 14,
  },
  jd: {
    paddingHorizontal: 20,
    // marginVertical: 10,
  },
  info: {},
  jobCategoryItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1.5,
    height: 40,
    // marginRight: 15,
    // paddingVertical: 5,
    paddingHorizontal: 20,
    // borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedJobCategory: {
    borderBottomColor: Colors.bg,
    borderBottomWidth: 2,
  },
  jobCategoryText: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
    padding: 5,
  },
  selectedJobText: {
    fontSize: 14,
    color: Colors.bg,
  },
  jobCategoryBar: {
    marginHorizontal: 0,
    flexDirection: "row",
    paddingVertical: 0,
  },
  detailsCont: {
    padding: 20,
  },
  part: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "50%",
    marginVertical: 5,
    // backgroundColor:"red"
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-evenly",
  },
  type: {
    backgroundColor: "#fff",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: "semibold",
    color: "grey",
    borderWidth: 0.5,
    borderColor: "grey",
  },
  part1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginVertical: 5,
  },
  detail: {
    fontSize: 16,
    fontWeight: 600,
    color: "white",
    width:"80%"
  },
  rowDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  upperPart: {
    backgroundColor: Colors.bg,
    height: Platform.OS == "android" ? 350 : 350,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === "android" ? 10 : 10,
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal:10,
    paddingTop: Platform.OS == "android" ? 40 : 60,
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  rightside: {
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
   nameBg: {
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    width: "20%",
    height:50,
    paddingVertical:5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:Colors.bg
  },
  topBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  roleText: {
    fontWeight: "600",
    fontSize: 22,
    color: "#fff",
  },
  compText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fff",
  },
  compText2: {
    fontWeight: "600",
    fontSize: 13,
    color: "#black",
  },
  contactHead: {
    fontWeight: "800",
    fontSize: 20,
    color: Colors.bg,
    // marginBottom:20
  },
  contactHead2: {
    fontWeight: "600",
    fontSize: 14,
    color: "#5f5c5cff",
    marginTop:10
  },
  duraView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
    marginTop: 10,
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginLeft: 10,
  },
  line: {
    width: 0,
    height: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  rev: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  subText: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 14,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dottedLine: {
    marginHorizontal: "auto",
    width: "90%",
    height: 0,
    borderColor: "#fff",
    borderStyle: "dashed",
    borderWidth: 1.4,
  },
});

export default ApplyJobs;
