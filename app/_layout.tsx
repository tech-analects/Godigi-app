import { Redirect, Slot, Stack, usePathname, useRouter } from "expo-router";
import { UserContext, UserProvider } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "./components/CustomDrawerContent"
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Splash from "./splash";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
// import * as Analytics from "expo-firebase-analytics";
// import {AnalyticsTracker} from "./AnalyticsTracker";
// import {checkAppVersion} from "./checkAppVersion"
import Constants from "expo-constants";
import {latestVersions} from "./latestVersion";
import UpdateRequiredScreen from "./updateScreen"
import {logAppOpening, screenViewFunc} from "./AnalyticsTracker";
// import { getAnalytics, logEvent } from "firebase/analytics";
// import { analytics, analyticsPromise } from "./firebaseConfig";
// import { analytics, logEvent } from "../app/firebaseConfig";
// import analytics from '@react-native-firebase/analytics';
// import { analytics, logEvent } from "./firebaseConfig";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // 👈 shows banner (top-screen alert)
    shouldShowList: true, // 👈 adds to notification drawer
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function RootLayout() {
  const [fontLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });


     useEffect(() => {
    logAppOpening();
  }, []);


  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaProvider>
    <UserProvider>
      <AppContent/>
      <Toast />
    </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
function AppContent() {
  const [fontLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const { isLoggedIn, isChecking,isFirstLaunch } = useContext(UserContext);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (fontLoaded) {
      const timer = setTimeout(() => {
        setIsAppReady(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fontLoaded]);

  if (!fontLoaded || !isAppReady || isChecking) {
    // Show splash screen until fonts & user loading done
    console.log("isAppReady", isAppReady);
    return (
      <>
        {/* <StatusBar backgroundColor={"#0F71C3"} barStyle="light-content" /> */}
        <Splash />
      </>
    );
  }



  return (
    <RootInner
      isLoggedIn={isLoggedIn}
      isChecking={isChecking}
      isAppReady={isAppReady}
      isFirstLaunch={isFirstLaunch}
    />
  );
}

export function RootInner({isLoggedIn,isChecking,isAppReady,isFirstLaunch}) {

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoaded(true);
  //   }, 3000);
  // }, []);


    const router = useRouter();
    const pathName = usePathname();

   useEffect(() => {
     console.log("isloogedin is", isLoggedIn, isChecking, isAppReady);
     if (!isChecking && isAppReady) {
      if(isFirstLaunch){
        console.log("this is first launch")
        router.replace('/walkthroughScreen')
      }
      else{
        console.log("this is not first launch")

        if (isLoggedIn) {
          router.replace("/(main)/(tabs)/home");
          //  router.replace('/walkthroughScreen')
         //  router.replace("/(main)/(tabs)/home");
         } else {
         //  router.replace("/(main)/(tabs)/home");
          console.log("Goinf to login ");
          // router.replace("/(auth)/login");
          router.replace("/(auth)/login");
        }
      }
     }
   }, [isLoggedIn]);

 
  useEffect(() => {
  // Handler when user taps a notification (foreground or background)
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data; // ✅ access data here
      console.log("Notification tapped:", data);

      if (data?.url) {
        router.push(data.url); // push the URL directly
      }
    }
  );

  // Check if app was launched from a killed state
  const checkInitialNotification = async () => {
    const lastNotification =
      await Notifications.getLastNotificationResponseAsync();
    const data = lastNotification?.notification?.request?.content?.data;

    if (data?.url) {
      router.push(data.url);
    }
  };

  checkInitialNotification();

  return () => subscription.remove();
}, []);

useEffect(()=>{
  console.log(pathName)
  screenViewFunc(pathName)
},[pathName])

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} 
      barStyle={"light-content"}/>
      {/* <StatusBar backgroundColor="red" barStyle={"dark-content"}/> */}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
