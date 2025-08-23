

import { BASE_URL } from "../urlPath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { triggerForceLogout, triggerTokenRefreshed } from "./eventBus"; // 👈 make sure this file exists

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

// Log request URLs
apiInstance.interceptors.request.use(
  async function (config) {
    // const token = await AsyncStorage.getItem("logged_in_user_token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log(config.url)
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
// apiInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     console.log("❌ Interceptor error:", error?.response?.status);

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem("logged_in_user_token");
//         const userId = await AsyncStorage.getItem("logged_in_user_id");
//         const usertype = await AsyncStorage.getItem("logged_in_user_type");
//         const userCompId = await AsyncStorage.getItem("logged_in_user_comp_id");
//         const userAccessId = await AsyncStorage.getItem(
//           "logged_in_user_access_arr"
//         );

//         if (!refreshToken || !userId) {
//           console.warn(
//             "⛔ Cannot refresh token — missing refresh token or user ID."
//           );
//           return Promise.reject(error);
//         }

//         const formData = new FormData();
//         formData.append("token", refreshToken);
//         formData.append("user_id", userId);
//         formData.append("user_type", usertype);
//         formData.append("company_id", userCompId);
//         const userAccessArray = JSON.parse(userAccessId); // should be an array like [27, 24, 15]
//           formData.append("user_access", userAccessArray);

//         // userAccessArray.forEach((id) => {
//         //   formData.append("user_access[]", id.toString());
//         // });

//         console.log("🔄 Attempting token refresh...",formData);

//         const refreshResponse = await apiInstance.post(
//           "refresh-token",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         const newAccessToken = refreshResponse.data.refresh_token;

//         await AsyncStorage.setItem("logged_in_user_token", newAccessToken);

//         // ✅ Notify all listeners to re-fetch data manually
//         triggerTokenRefreshed();
//         return apiInstance(originalRequest);

//         // return Promise.reject(error); // Let component handle re-fetching
//       } catch (refreshError) {
//         console.error("🔐 Token refresh failed:", refreshError);
//         await AsyncStorage.multiRemove([
//           "logged_in_user_id",
//           "logged_in_user_name",
//           "logged_in_user_token",
//         ]);
//         // ✅ Trigger logout event
//         triggerForceLogout();

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log("❌ Interceptor error:", error?.response?.status);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("logged_in_user_token");
        const userId = await AsyncStorage.getItem("logged_in_user_id");
        const usertype = await AsyncStorage.getItem("logged_in_user_type");

        if (!refreshToken || !userId) {
          console.warn(
            "⛔ Cannot refresh token — missing refresh token or user ID."
          );
          return Promise.reject(error);
        }

        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("user_type", usertype);


        const refreshResponse = await apiInstance.post(
          "refresh-token",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newAccessToken = refreshResponse.data.refresh_token;
        await AsyncStorage.setItem("logged_in_user_token", newAccessToken);

        // Update token in original request's FormData before retry
        const updatedFormData = new FormData();

        // Copy all form data except 'token'
        for (const pair of originalRequest.data._parts) {
          if (pair[0] !== "token") {
            updatedFormData.append(pair[0], pair[1]);
          }
        }

        // Append new token
        updatedFormData.append("token", newAccessToken);

        // Replace original request data with updated FormData
        originalRequest.data = updatedFormData;
        console.log('new formdata',updatedFormData)

        // Retry original request with new token in body
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.error("🔐 Token refresh failed:", refreshError);
        await AsyncStorage.multiRemove([
          "logged_in_user_id",
          "logged_in_user_name",
          "logged_in_user_token",
        ]);
        triggerForceLogout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


// apiInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             // 👇 Set token manually again if you're not using Bearer
//             originalRequest._retry = true;
//             return apiInstance(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem("logged_in_user_token");
//         const userId = await AsyncStorage.getItem("logged_in_user_id");
//         const usertype = await AsyncStorage.getItem("logged_in_user_type");
//         const userCompId = await AsyncStorage.getItem("logged_in_user_comp_id");
//         const userAccessId = await AsyncStorage.getItem(
//           "logged_in_user_access_arr"
//         );

//         if (!refreshToken || !userId) {
//           throw new Error("Missing token or user ID");
//         }

//         const formData = new FormData();
//         formData.append("token", refreshToken);
//         formData.append("user_id", userId);
//         formData.append("user_type", usertype);
//         formData.append("company_id", userCompId);

//         const userAccessArray = JSON.parse(userAccessId || "[]");
//         userAccessArray.forEach((id) => {
//           formData.append("user_access[]", id.toString());
//         });

//         console.log("🔄 Attempting token refresh...");

//         const refreshResponse = await apiInstance.post(
//           "refresh-token",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         const newAccessToken = refreshResponse.data.refresh_token;
//         await AsyncStorage.setItem("logged_in_user_token", newAccessToken);

//         // ✅ Process all queued requests
//         processQueue(null, newAccessToken);
//         isRefreshing = false;

//         // ✅ Retry the original request
//         return apiInstance(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         isRefreshing = false;

//         await AsyncStorage.multiRemove([
//           "logged_in_user_id",
//           "logged_in_user_name",
//           "logged_in_user_token",
//         ]);

//         triggerForceLogout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default apiInstance;
