// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Modal,
//   Image,
//   Platform,
// } from "react-native";
// import {
//   Ionicons,
//   FontAwesome5,
//   MaterialCommunityIcons,
//   AntDesign,
//   FontAwesome,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import ThemeBtn from "@/components/ThemeBtn";
// import * as DocumentPicker from "expo-document-picker";
// import { Colors } from "@/constants/Colors";
// import { ImagesPath } from "@/constants/ImagesPath";
// import { useNavigation } from "@react-navigation/native";

// function ProjDetailsForm() {
//   const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
//   const [selectedExp, setSelectedExp] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [file, setFile] = useState(null);

//   const navigation = useNavigation();

//   const goBack = () => {
//     navigation.goBack();
//   };

//   const goToLogin = () => {
//     setIsModalOpen(false);
//     navigation.navigate("login");
//   };

//   const handleNext = () => {
//     setIsModalOpen(true);
//   };

//   const pickFile = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: "*/*", // You can specify types like application/pdf, image/*, etc.
//       });

//       if (result.type === "success") {
//         setFile(result);
//       } else {
//         console.log("File selection was canceled");
//       }
//     } catch (error) {
//       console.error("Error picking document: ", error);
//     }
//   };

//   const successModal = (
//     <Modal
//       visible={isModalOpen}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={() => setIsModalOpen(false)}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalImageContainer}>
//             <Image
//               source={ImagesPath.resetModalImg}
//               style={styles.modalImage}
//             />
//           </View>
//           <Text style={styles.modalTitle}>Congratulations !!</Text>
//           <Text style={styles.modalText}>
//             Your profile setup has been completed successfully
//           </Text>
//           <ThemeBtn btnTitle={"Continue"} onPress={goToLogin} />
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <View style={styles.container}>
//          <View style={styles.topPart}>
//         <View style={styles.leftside}>
//           <AntDesign
//             name="arrowleft"
//             size={24}
//             color="#fff"
//             onPress={goBack}
//           />
//           <Text style={styles.pageName}>Career Details</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.formContainer}>
//        <Text style={Colors.inputlable}>Experience</Text>
//         <View style={styles.twoPart}>
//           <View style={styles.field}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TextInput
//                 placeholder="2"
//                 autoComplete="off"
//                 style={[Colors.inputbox, { width: 150 }]}
//               />
//               <Text style={styles.sidetext}>Years</Text>
//             </View>
//           </View>
//           <View style={styles.field}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TextInput
//                 placeholder="3"
//                 autoComplete="off"
//                 style={[Colors.inputbox, { width: 150 }]}
//               />
//               <Text style={styles.sidetext}>Months</Text>
//             </View>
//           </View>
//         </View>

//         <Text style={[Colors.inputlable,{marginTop:40}]}>Job Preference City</Text>
//         <TextInput style={Colors.inputbox} placeholder="Enter city name" placeholderTextColor={"gray"}/>

//         <Text style={[Colors.inputlable,{marginTop:40}]}>Job Preference Skills</Text>
//         <TextInput style={Colors.inputbox} placeholder="Enter skills" placeholderTextColor={"gray"}/>
//       </ScrollView>

//       {/* Positioned Button at the Bottom */}
//       {/* <View style={styles.buttonContainer}>
//         <ThemeBtn btnTitle={"Update"} onPress={goBack} />
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAFAFD",
//   },
//   formContainer: {
//     padding: 20,
//     marginBottom: 80, // Make space for the button
//   },
//     topPart: {
//     backgroundColor: Colors.bg,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     shadowColor: "lightgrey",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.85,
//     shadowRadius: 2,
//     elevation: 5,
//     borderBottomColor: "lightgrey",
//     borderBottomWidth: 0.5,
//     paddingTop: Platform.OS === "android" ? 50 : 50,
//   },
//   leftside: {
//     gap: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 20,
//   },
//   pageName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color:"#fff"
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//     twoPart: {
//     flexDirection: "row",
//     gap: 10,
//     justifyContent: "space-between",
//   },
//   field: {
//     marginBottom: 10,
//   },
//   inpView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   sidetext: {
//     position: "absolute",
//     right: 10,
//     color: "grey",
//   },
//    form: {
//     marginBottom: 50,
//     padding: 20,
//   },
//   fromPart: {
//     flexDirection: "row",
//     gap: 10,
//     justifyContent: "space-between",
//   },
//   textArea: {
//     height: 150,
//     borderColor: "#EDF1F3",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 10,
//     marginBottom: 10,
//     padding: 10,
//     textAlignVertical: "top",
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 40,
//     left: 20,
//     right: 20,
//     paddingHorizontal: 20,
//     backgroundColor: "transparent", // No background, to avoid blocking other content
//   },
//   upView: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     paddingVertical: 50,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#EDF1F3",
//     marginVertical: 10,
//   },
//   upText: {
//     color: "#0069CB",
//     fontWeight: "500",
//     fontSize: 18,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 40,
//     borderRadius: 30,
//     width: "90%",
//     height: "70%",
//   },
//   modalImageContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalImage: {
//     width: 200,
//     height: 200,
//   },
//   modalTitle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   modalText: {
//     textAlign: "center",
//     marginVertical: 30,
//     color: "#6C7278",
//   },
// });

// export default ProjDetailsForm;
