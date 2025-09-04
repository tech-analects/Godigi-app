import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { UserContext, UserProvider } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "./components/CustomDrawerContent"
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Splash from "./splash";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaProvider>
    <UserProvider>
      <AppContent/>
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

   useEffect(() => {
     console.log("isloogedin is", isLoggedIn, isChecking, isAppReady);
     if (!isChecking && isAppReady) {
      if(isFirstLaunch){
        router.push('/WalkthroughScreen')
      }
      else{

        if (isLoggedIn) {
          router.replace("/(main)/(tabs)/home");
         //  router.replace("/(main)/(tabs)/home");
         } else {
         //  router.replace("/(main)/(tabs)/home");
          console.log("Goinf to login ");
          router.replace("/(auth)/login");
        }
      }
     }
   }, [isLoggedIn]);

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} 
      
      
      
      barStyle={"dark-content"}/>
      {/* <StatusBar backgroundColor="red" barStyle={"dark-content"}/> */}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
