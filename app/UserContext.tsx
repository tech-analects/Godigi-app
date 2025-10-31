import { BASE_URL } from "@/urlPath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useState, useContext, useEffect } from "react";
import apiInstance from "./interceptors";

// Create Context
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserGender, setLoggedInUserGender] = useState("");
  const [loggedInUserdob, setLoggedInUserDob] = useState("");
  const [loggedInUserImg, setLoggedInUserImg] = useState("");
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const [checkTokenTrigger, setCheckTokenTrigger] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isUserOfflineStudent, setIsUserOfflineStudent] = useState(0);

  const router = useRouter();
  // const logout=()=>{
  //   console.log("logout")
  //   setIsLoggedIn(false);
  //   router.push('/(auth)/login')
  // }

  useEffect(() => {
    const fetchUserId = async () => {
      try {



        setIsChecking(true);
        const userTok = await AsyncStorage.getItem("logged_in_user_token");
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        const userName = await AsyncStorage.getItem("logged_in_user_name");
        const userGender = await AsyncStorage.getItem("logged_in_user_gender");
        const userDob = await AsyncStorage.getItem("logged_in_user_dob");
        const userImg = await AsyncStorage.getItem("logged_in_user_img");
        console.log("hasLaunched", hasLaunched)
        if (hasLaunched == "true") {
          setIsFirstLaunch(false);
        }
        // else {
        //   setIsFirstLaunch(true);
        // }
        if (userTok) {
          console.log(userTok,userImg)
          setIsLoggedIn(true);
          setLoggedInUserName(userName)
          setLoggedInUserGender(userGender)
          setLoggedInUserDob(userDob)
          setLoggedInUserImg(userImg)
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };
    fetchUserId();
    console.log("fetching userr token")
  }, []);

  const logout = async () => {
    try {
      let formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      const idUser = await AsyncStorage.getItem("logged_in_user_id");
      formData.append("token", token);
      console.log(formData,idUser)
       const response = await apiInstance.post(`logout/${idUser}`, formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });
      //  console.log(response.data)
      if (response.data.status) {
      // router.replace("/(auth)/login");
      await AsyncStorage.multiRemove([
        "logged_in_user_token",
        "logged_in_user_name",
        "logged_in_user_gender",
        "logged_in_user_email",
        "logged_in_user_type",
        "logged_in_user_id",
        'logged_in_user_dob',
        "logged_in_user_img"
        // "hasLaunched",
      ]);
      setIsLoggedIn(false);
      const keys = await AsyncStorage.getAllKeys();
      console.log("Remaining Keys After Logout:", keys);
      }
    } catch (error) {
      console.error("Failed to clear AsyncStorage on logout:", error);
    } finally {
      setCheckTokenTrigger((prev) => !prev);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isChecking,
        loaded,
        setLoaded,
        isFirstLaunch,
        setIsFirstLaunch,
        logout,
        setLoggedInUserName,
        loggedInUserName,
        setLoggedInUserGender,
        loggedInUserGender,
        setLoggedInUserDob,
        loggedInUserdob,
        setLoggedInUserImg,
        loggedInUserImg,
        isUserOfflineStudent,
        setIsUserOfflineStudent
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
