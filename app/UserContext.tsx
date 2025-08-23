import { BASE_URL } from "@/urlPath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    const [isChecking, setIsChecking] = useState(true);
    const [checkTokenTrigger, setCheckTokenTrigger] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      if (userTok) {
        console.log(userTok)
        setIsLoggedIn(true);
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
    // let formData = new FormData();
    // const token = await AsyncStorage.getItem("logged_in_user_token");
    // const idUser = await AsyncStorage.getItem("logged_in_user_id");
    // formData.append("token", token);
    // let url = `${BASE_URL}logout/${idUser}`;
    // let response = await axios.post(url);
    // if (response.data.status) {
      await AsyncStorage.multiRemove([
        "logged_in_user_token",
        "hasLaunched",
      ]);
      setIsLoggedIn(false);
      const keys = await AsyncStorage.getAllKeys();
      console.log("Remaining Keys After Logout:", keys);
      // router.replace("/(auth)/login");
    // }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
