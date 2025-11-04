// // // // AnalyticsTracker.js
// // // import { useEffect } from "react";
// // // import { usePathname } from "expo-router";
// // // import { analytics, logEvent } from "./firebaseConfig";

// // // export const AnalyticsTracker = () => {
// // //   const pathname = usePathname();

// // //   const getScreenName = (path) => {
// // //     if (!path || path === "/") return "Home";
// // //     const name = path.replace("/", "");
// // //     return name.charAt(0).toUpperCase() + name.slice(1);
// // //   };

// // //   useEffect(() => {
// // //     if (!pathname || !analytics) return;

// // //     const screenName = getScreenName(pathname);
// // //     logEvent(analytics, "screen_view", {
// // //       screen_name: screenName,
// // //       screen_class: screenName,
// // //     });

// // //     console.log("✅ Screen tracked:", screenName);
// // //   }, [pathname]);

// // //   return null;
// // // };


// // // AnalyticsTracker.js
// // import { useEffect } from "react";
// // import { usePathname } from "expo-router";
// // import { analyticsPromise } from "./firebaseConfig";
// // import { logEvent } from "firebase/analytics";

// // export const AnalyticsTracker = () => {
// //   const pathname = usePathname();
// //   console.log(pathname)

// //   const getScreenName = (path) => {
// //     if (!path || path === "/") return "Home";
// //     const name = path.replace("/", "");
// //     return name.charAt(0).toUpperCase() + name.slice(1);
// //   };

// //   useEffect(() => {
// //     const trackScreen = async () => {
// //       const analytics = await analyticsPromise;
// //       if (!pathname || !analytics) return;

// //       const screenName = getScreenName(pathname);
// //       logEvent(analytics, "screen_view", {
// //         screen_name: screenName,
// //       });

// //       console.log("✅ Screen tracked:", screenName);
// //     };

// //     trackScreen();
// //   }, [pathname]);

// //   return null;
// // };


import analytics from '@react-native-firebase/analytics';

// Helper: format screen name
const getScreenName = (path) => {
  if (!path || path === "/") return "Home";
  const name = path.replace("/", "");
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// ✅ Log screen view
export const screenViewFunc = async (pathname) => {
  try {
    const screenName = getScreenName(pathname);
    await analytics().logEvent('screen_view', {
      firebase_screen: screenName,
      firebase_screen_class: screenName,
    });
    console.log("✅ Logged screen view:", screenName);
  } catch (error) {
    console.error("⚠️ Failed to log screen view:", error);
  }
};

// ✅ Log app open
export const logAppOpening = async () => {
  try {
    await analytics().logEvent('app_open');
    console.log("✅ Logged app open");
  } catch (error) {
    console.error("⚠️ Failed to log app open:", error);
  }
};






