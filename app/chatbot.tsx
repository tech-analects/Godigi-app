import { Colors } from "@/constants/Colors";
import { AntDesign, Feather, FontAwesome5, FontAwesome6, Fontisto, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import apiInstance from "./interceptors";
import { ImagesPath } from "@/constants/ImagesPath";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-toast-message";

export default function ChatScreen() {
  // const [messages, setMessages] = useState([
  //   { id: '1', text: "Hello! How can I help you?", sender: "bot" },
  // ]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageCopiedId, setMessageCopiedId] = useState('');
  const flatListRef = useRef();

  const route = useRoute();
  const courseId = route?.params?.courseId;
  const isPurchasedCourse = route?.params?.isPurchasedCourse;
  console.log(route?.params,isPurchasedCourse)


  const router = useRouter();
  const goToNotifications = () => router.push("/notifications");

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  // const sendMessage = () => {
  //   if (input.trim() === "") return;

  // const newMessage = { id: Date.now().toString(), text: input, sender: "user" };
  // setMessages((prev) => [...prev, newMessage]);
  // setInput("");

  //   // Simulate bot reply
  //   setTimeout(() => {
  //     const botReply = { id: Date.now().toString(), text: "You said: " + input, sender: "bot" };
  //     setMessages((prev) => [...prev, botReply]);
  //     flatListRef.current.scrollToEnd({ animated: true });
  //   }, 500);
  // };

  const sendMessage = async () => {
    try {
      if (!input) return;

      setSendingMessage(true)
      const newMessage = { id: Date.now().toString(), text: input, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      const formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);
      formData.append("prompt", input);
      formData.append("course_id", courseId);
      const response = await apiInstance.post("send-prompt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      if (response.data.status) {
        const newMessage = { id: Date.now().toString(), text: response.data.data, sender: "bot" };
        setMessages((prev) => [...prev, newMessage]);
        flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.log(error)
      showErrToast("OOps, Something went wrong!")
    }
    finally {
      setSendingMessage(false)
    }
  }

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

  const copyText = async (id) => {
    try {
      // setIsCopied(true)
      console.log(id)
      let messageText = messages.filter((item) => item.id == id)
      let text = messageText[0].text
      await Clipboard.setStringAsync(text);
      setMessageCopiedId(id);
      showToast("The response has been copied to your clipboard.");
      setTimeout(()=>{
        setMessageCopiedId("")
      },5000)
    } catch (error) {
      console.error("Error copying URL: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[item.sender === "user" ? styles.userView : styles.botView]}>

      <View style={{ gap: 5, flexDirection: 'row', alignItems: 'flex-end' }}>
        {
          item.sender == "bot"
          &&
          <FontAwesome5 name="robot" size={14} color={Colors.bg} />
          // <Image source={ImagesPath.human} style={{width:15,height:15}}/>
        }

        <View
          style={[
            styles.messageContainer,
            item.sender === "user" ? styles.userMessage : styles.botMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.sender === "bot" && { color: "#000" }, // White text for red background
            ]}
          >
            {item.text}
          </Text>
        </View>
        {
          item.sender !== "bot"
          &&
          <Image source={ImagesPath.human} style={{ width: 15, height: 15 }} />
        }
      </View>
      {
        item.sender == "bot"
        &&
        <View style={{alignSelf:'flex-start',paddingLeft:30}}>
        {
          messageCopiedId == item.id ?
          <Ionicons name="copy-sharp" size={18} color={Colors.bg} />
          :
          <Ionicons name="copy-outline" size={18} color={Colors.bg} onPress={() => copyText(item.id)}/>
        }
        </View>
        // <Image source={ImagesPath.human} style={{width:15,height:15}}/>
      }
    </View>
  );

  return (
    // <>
    //   <View style={styles.topPart}>
    //     <AntDesign
    //       name="arrowleft"
    //       size={24}
    //       color="#fff"
    //       onPress={goBack}
    //     />
    //     <Text style={styles.pageName}>Chat Bot</Text>
    //     <View>
    //       <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} />
    //     </View>
    //   </View>
    //   <KeyboardAvoidingView
    //     style={{ flex: 1 }}
    //     behavior={Platform.OS === "ios" ? "padding" : undefined}
    //   >

        

    //     {
    //       messages.length == 0
    //         ?
    //         <View style={{ flex: 1 }}>
    //           {/* <Text>Type your query and get answer from GODIGI AI</Text> */}
    //           <Text style={{ color: "gray", textAlign: 'center', marginTop: 100 }}>Curious about something? Ask away!</Text>
    //         </View>
    //         :
    //         <FlatList
    //           ref={flatListRef}
    //           data={messages}
    //           keyExtractor={(item) => item.id}
    //           renderItem={renderItem}
    //           contentContainerStyle={{ padding: 10 }}
    //         />
    //     }

    //     <View style={styles.inputContainer}>
    //       <TextInput
    //         style={styles.input}
    //         value={input}
    //         onChangeText={setInput}
    //         placeholder="Type a message..."
    //       />
    //       <TouchableOpacity style={[styles.sendButton, { opacity: sendingMessage ? 0.5 : 1 }]} onPress={sendMessage} disabled={sendingMessage}>
    //         {
    //           sendingMessage
    //             ?
    //             <ActivityIndicator color="#fff" />
    //             :
    //             <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
    //         }
    //       </TouchableOpacity>
    //     </View>
    //   </KeyboardAvoidingView>
    // </>

    <>
  <View style={styles.topPart}>
   <Feather name="arrow-left" size={24}
      color="#fff"
      onPress={goBack}
    />
    <Text style={styles.pageName}>Chat Bot</Text>
    <View>
      <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} />
    </View>
  </View>

{
  isPurchasedCourse && isPurchasedCourse !== true
  ?
  <>
  <Text style={styles.noText1}>Oops!</Text>
  <Text style={styles.noText}>You’ll need to buy the course to explore this feature.</Text>
  </>
  :
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"} // height works better on Android
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // adjust based on header height
  >
    <View style={{ flex: 1 }}>
      {messages.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "gray", textAlign: "center" }}>
            Curious about something? Ask away!
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10, paddingBottom: 60 }} // leave space for input
        />
      )}

      <View style={[styles.inputContainer,{paddingBottom:messages.length ==0 ? 30 : 0}]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity
          style={[styles.sendButton, { opacity: sendingMessage ? 0.5 : 1 }]}
          onPress={sendMessage}
          disabled={sendingMessage}
        >
          {sendingMessage ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
}
</>

  );
}

const styles = StyleSheet.create({
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
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
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: Colors.bg, // Blue for user
    alignSelf: "flex-end",
  },
  userView: {
    // backgroundColor: "red", // Blue for user
    alignSelf: "flex-end",
    // flexDirection:'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 5
  },
  botView: {
    // backgroundColor: "yellow", // Blue for user
    alignSelf: "flex-start",
    // flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5
  },
  botMessage: {
    backgroundColor: "#004b8825", // Red for bot
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff", // Default white text (user will be fine too)
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    // backgroundColor:'red',
    // paddingBottom: 30
  },
  noText:{
    // marginTop:100,
    textAlign:'center',
    color:"gray"
  },
  noText1:{
    marginTop:100,
    textAlign:'center',
    color:"gray",
    fontSize:18
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: Colors.bg,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
