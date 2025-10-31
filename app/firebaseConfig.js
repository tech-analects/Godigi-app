// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCngWUhyp_AJ57to7hiB4t4VniOBhbaIi8",
//   authDomain: "godigi-infotech-bba2c.firebaseapp.com",
//   projectId: "godigi-infotech-bba2c",
//   storageBucket: "godigi-infotech-bba2c.firebasestorage.app",
//   messagingSenderId: "978989280460",
//   appId: "1:978989280460:web:448712eee23528dfbf6669",
//   measurementId: "G-PNEQHQ8TGD"
// };

// export const app = initializeApp(firebaseConfig);

// export const analyticsPromise = (async () => {
//   const supported = await isSupported();
//   return supported ? getAnalytics(app) : null;
// })();