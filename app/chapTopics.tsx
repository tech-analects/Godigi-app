import { Colors } from "@/constants/Colors";
import { AntDesign, Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Platform,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Button,
} from "react-native";
import apiInstance from "./interceptors";
import { ActivityIndicator } from "react-native-paper";
import { Video, AVPlaybackStatus } from "expo-av";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as ScreenCapture from "expo-screen-capture";


function ChaptersTopics() {
  const route = useRoute();
  const subId = route?.params?.id;

  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [allTopicsToWatch, setAllTopicsToWatch] = useState([]);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState(0);
  const [selectedVid, setSelectedVid] = useState("");
  const [selectedVidItem, setSelectedVidItem] = useState("");
  const [progressMap, setProgressMap] = useState({});


   useEffect(() => {
    // Prevent screenshot
    ScreenCapture.preventScreenCaptureAsync();
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      const newMap = {};
      for (const chap of chapters) {
        for (const topic of chap.topics) {
          const saved = await AsyncStorage.getItem(`video_progress_${topic.video_url}`);
          if (saved) newMap[topic.video_url] = parseFloat(saved);
        }
      }
      setProgressMap(newMap);
    };

    loadProgress();
  }, [chapters]);

  // useEffect(()=>{
  //   console.log(progressMap);
  // },[progressMap])


  const navigation = useNavigation();
  const router = useRouter();

  const goBack = () => navigation.goBack();
  const goToNotifications = () => router.push("/notifications");

  useEffect(() => {
    getCourseDetails(1);
    // console.log("calling api");
  }, []);

  // useEffect(()=>{
  //   console.log(selectedVidItem)
  // },[selectedVidItem])

  const getCourseDetails = async (customStart) => {
    try {
      if (customStart === 0) {
        setLoading(true);
      } else {
        setLoadingMoreData(true);
      }

      const formData = new FormData();
      const token = await AsyncStorage.getItem("logged_in_user_token");
      formData.append("token", token);
      formData.append("start", customStart);

      const response = await apiInstance.post(
        `course/topics-and-chapter-by-subject/${subId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // console.log("response of data", response.data);

      if (response.data.status) {
        setHasMore(response.data.has_more);
        const finalDataToPass = response.data.data;

        if (customStart === 1) {
          setChapters(finalDataToPass);
          setLimit(finalDataToPass.length);

          // set default video
          if (
            finalDataToPass.length > 0 &&
            finalDataToPass[0].topics.length > 0
          ) {
            const allTopics = finalDataToPass.flatMap(chapter => chapter.topics).filter((item)=>item.video_completion_rate!== "100");
            // console.log("alltopics",allTopics,allTopics[0])
            setAllTopicsToWatch(allTopics)
            // let obj = finalDataToPass.filter((item)=>item.num!==100)
            // console.log("this is obj",obj)


            // setSelectedVid(allTopics[0].video_url);

            // setSelectedVid(allTopics[17].video_url);
            // setSelectedVidItem(allTopics[17]);
            
            setSelectedVid(allTopics[0].video_url);
            setSelectedVidItem(allTopics[0]);

            // console.log(allTopics[0].id)

//             setTimeout(() => {
//   sectionListRef.current?.scrollToLocation({
//     itemIndex: allTopics[0].id,
//     animated: true,
//     viewPosition: 0.3,
//   });
// }, 500);

            // setSelectedVid("https://www.w3schools.com/html/mov_bbb.mp4");
          }
        } else {
          setChapters((prev) => {
            const newList = [...prev, ...finalDataToPass];
            setLimit((prevLimit) => prevLimit + finalDataToPass.length);
            if (newList.length < 25) setHasMore(false);
            return newList;
          });

          //nned to handle the later vids selection
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("this is err from chapTopics", error);
      setChapters([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMoreData(false);
    }
  };


  const clearAllVideoProgress = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const videoKeys = keys.filter(key => key.startsWith("video_progress_"));
      await AsyncStorage.multiRemove(videoKeys);
      console.log("✅ All video progress keys removed!");
    } catch (error) {
      console.error("❌ Error removing video progress keys:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    // console.log("hello")
    // let progressPercent = getprogressPercent(selectedVid)
    // console.log(progressPercent)
    //  const progressPercent = progressMap[item.video_url] || 0;

    return (
      <TouchableOpacity
        style={[styles.noteCard, { backgroundColor: selectedVidItem.id == item.id ? Colors.bg : "#fff" }]}
        onPress={() => { setSelectedVid(item.video_url); setSelectedVidItem(item); console.log(item) }}
      >
        <View style={[styles.idNum, { backgroundColor: selectedVidItem.id == item.id ? "#fff" : "#0662b84b" }]}>
          <Text style={styles.id}>{index + 1}</Text>
        </View>
        <Text numberOfLines={2} style={[styles.noteTitle, { color: selectedVidItem.id == item.id ? "#fff" : '#000' }]}>{item.topic_name}</Text>
        {/* <AntDesign name="checkcircle" size={24} color="green" /> */}
        {
          item.video_completion_rate == "100"
            ?
            <FontAwesome name="check-circle" size={24} color={selectedVidItem.id == item.id ? "white":"green"} style={{marginLeft:10}}/>
            :
            // <Text>{progressPercent}</Text>
            <AnimatedCircularProgress
              size={40}
              width={6}
              fill={item.video_completion_rate ? item.video_completion_rate : 0}
              tintColor={selectedVidItem.id == item.id ? "green" : Colors.bg}
              backgroundColor="#eee"
            >
              {(fill) => <Text style={{ color: selectedVidItem.id !== item.id ? "black" : "#fff", fontSize: 10 }}>{`${Math.round(fill)}%`}</Text>}
            </AnimatedCircularProgress>
        }
      </TouchableOpacity>
    )
  };

  const renderSectionHeader = ({ section: { chapter_name } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText} onPress={clearAllVideoProgress}>Chapter:</Text>
      <Text style={styles.headerText}>{chapter_name}</Text>
    </View>
  );

  // useEffect(() => {
  //   console.log("vid is", selectedVidItem)
  // }, [selectedVidItem])

  const sectionData = chapters.map((chap) => ({
    chapter_name: chap.chapter_name,
    chapter_id: chap.id,
    data: chap.topics,
  }));

  const renderFooter = () =>
    loadingMoreData ? (
      <ActivityIndicator size="large" style={{ margin: 16 }} />
    ) : null;

  const [refreshing, setRefreshing] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getCourseDetails(1);
    setRefreshing(false);
  };

  const fetchData = () => {
    if (loadingMoreData || !hasMore) return;
    const newStart = limit + 1;
    getCourseDetails(newStart);
  };

  const handleProgress = async (progress: number) => {
    if (!selectedVidItem) return;

    try {
      await AsyncStorage.setItem(`video_progress_${selectedVidItem}`, progress.toString());
      console.log(`Saved progress ${progress}% for video ${selectedVidItem}`);
    } catch (err) {
      console.log("Error saving video progress", err);
    }
  };


  const handleVideoEnd = (t) => {
    console.log("Current video finished:", selectedVid, selectedVidItem,t);

    // Flatten all topics from chapters
    // const allTopics = chapters.flatMap(chap => chap.topics);

    const currentIndex = allTopicsToWatch.findIndex(t => t.id === selectedVidItem.id);
    const nextTopic = allTopicsToWatch[currentIndex + 1];
    console.log(nextTopic)

    if (nextTopic) {
      // console.log("Playing next video:", nextTopic.topic_name);
      setSelectedVid(nextTopic.video_url);
      setSelectedVidItem(nextTopic);
    } else {
      console.log("No more videos left in the list!");
    }
  };


  const logProgressInBackend = async (topicId, progressValue) => {
    try {

      // console.log(progressValue,selectedVidItem)
      // if(progressValue == selectedVidItem.video_completion_rate){
      //   return ;
      // }

      const token = await AsyncStorage.getItem("logged_in_user_token");

      const formData = new FormData();
      formData.append("token", token);
      formData.append("video_completion_rate", progressValue);

      console.log("📡 Logging progress for topic:", topicId, progressValue);
      console.log(formData)

      const response = await apiInstance.post(
        `course/submit-video-view-progress/${topicId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status) {
        setChapters((prevChapters) => {
          if (!Array.isArray(prevChapters)) {
            console.warn("⚠️ chapters is not an array yet");
            return prevChapters;
          }

          return prevChapters.map((chapter) => {
            // If this chapter has topics, try to find the matching topic
            const updatedTopics = Array.isArray(chapter.topics)
              ? chapter.topics.map((topic) =>
                topic.id == topicId
                  ? { ...topic, video_completion_rate: progressValue }
                  : topic
              )
              : chapter.topics;

            return { ...chapter, topics: updatedTopics };
          });
        });
      }

      console.log("✅ Logged:", response.data);
    } catch (error) {
      console.log("❌ Error logging progress:", error);
    }
  };


   const sectionListRef = useRef(null);

   const scrollToItemById = (targetId) => {
  let sectionIndex = -1;
  let itemIndex = -1;

  console.log("Scrolling to:", targetId,allTopicsToWatch);

  // sectionData.forEach((section, sIndex) => {
  //   console.log(section)
  //   const foundIndex = section.data.findIndex((item) => item.id == targetId);
  //   if (foundIndex !== -1) {
  //     sectionIndex = sIndex;
  //     itemIndex = foundIndex;
  //   }
  // });

  let topicToScroll = allTopicsToWatch.findIndex((item)=>item.id == targetId)
  if(topicToScroll !== -1){
    // sectionIndex = sIndex;
      itemIndex = topicToScroll;
  }
  console.log("thi sis topic id",topicToScroll )

  console.log("Section:", sectionIndex, "Item:", itemIndex);

  if (itemIndex !== -1 && sectionListRef.current) {
    sectionListRef.current.scrollToLocation({
      itemIndex,
      animated: true,
      viewPosition: 0.3,
    });
  } else {
    console.warn("Item not found in any section");
  }
};


  return (
    <View>
      <View style={styles.topPart}>
        <Feather name="arrow-left" size={24} color="#fff" onPress={goBack} />
        <Text style={styles.pageName}>Chapters </Text>
        <View>
          {/* <Fontisto name="bell" size={22} color="#fff" onPress={goToNotifications} /> */}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 30 }} color={Colors.bg} />
      ) : (
        <>
          {/* ✅ Video Player */}
          {/* <VideoView
            player={player}
            style={{
              width: Dimensions.get("window").width,
              height: 250,
              backgroundColor: "black",
            }}
            nativeControls
          /> */}
          {/* <VideoPlayerComponent uri={selectedVid} /> */}
          <VideoPlayerComponent uri={selectedVid} topic={selectedVidItem} onVideoEnd={(t) => handleVideoEnd(t)} logProgressInBackend={logProgressInBackend} setIsPlayed={setIsPlayed}/>


          {/* ✅ Chapters List */}
          <SectionList
          ref={sectionListRef}
            sections={sectionData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={{ paddingBottom: 400 }}
            ListFooterComponent={renderFooter}
            onEndReached={fetchData}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: "center",
                  padding: 10,
                  marginTop: 50,
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  No Chapters added for this course yet!
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

export default ChaptersTopics;

export function VideoPlayerComponent({ uri, topic, onVideoEnd, logProgressInBackend,setIsPlayed }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [lastProgress, setLastProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("topicId is:", topic)

  useEffect(() => {
    // When topic changes, show loader until ready
    setIsLoading(true);
    // setUri(topic?.video_url);
  }, [topic?.id]);

  // Load saved progress for this video
  useEffect(() => {
    const loadProgress = async () => {
      const saved = topic?.video_completion_rate || 0;
      // const saved = "20" || 0;
      setLastProgress(saved ? parseFloat(saved) : 0);
      console.log("Loaded saved progress:", saved);
    };
    loadProgress();
  }, [uri]);



  // When video is ready, restore progress and auto-play
  const onReadyForDisplay = async () => {
    if (!videoRef.current) return;

    try {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded) {
        const position = (lastProgress / 100) * status.durationMillis!;
        await videoRef.current.setPositionAsync(position);
        // await videoRef.current.playAsync();
        setIsLoading(false);
        setIsReady(true);
        // console.log("Restored lastProgress:", lastProgress, "Position(ms):", position);
      }
    } catch (err) {
      console.log("Error restoring progress:", err);
    }
  };

  const previousUri = useRef<string | null>(null);
  const previousTopicId = useRef<string | null>(null);
  const [progress, setProgress] = useState(0);

  const previousTopic = useRef(null);

  // useEffect(() => {
  //   console.log("🎬 useEffect triggered for new video change");
  //   console.log("Previous topic:", previousTopic.current?.id);
  //   console.log("Current topic:", topic?.id,topic);

  //   // Only run when the user *switches* to a different video
  //   if (previousTopic.current && previousTopic.current.id !== topic.id) {
  //     console.log("✅ Video changed, logging last progress...");
  //     logProgressInBackend(previousTopic.current.id, progress);
  //   }

  //   // Update ref to current topic for the next change
  //   previousTopic.current = topic;


  //   // Reset progress tracking for the new video
  //   setProgress(topic?.video_completion_rate || 0);

  // }, [topic?.id]); // Dependency = video changes, not play/pause

  useEffect(() => {
    if (previousTopic.current && previousTopic.current.id !== topic.id) {
      logProgressInBackend(previousTopic.current.id, progress || topic?.video_completion_rate);
      // if(previousTopic.current?.video_completion_rate > 0){
      // }
      // else{
      //   console.log("progress not improved")
      // }
    }
    previousTopic.current = topic;
    setProgress(topic?.video_completion_rate || 0);
  }, [topic?.id]);



  // const logProgressInBackend = async (topicId, progressValue) => {
  //   try {
  //     const token = await AsyncStorage.getItem("logged_in_user_token");

  //     const formData = new FormData();
  //     formData.append("token", token);
  //     formData.append("video_completion_rate", progressValue);

  //       console.log("📡 Logging progress for topic:", topicId, progressValue);
  //     console.log(formData)

  //     // Uncomment when backend is ready
  //     // const response = await apiInstance.post(
  //     //   `course/submit-video-view-progress/${topicId}`,
  //     //   formData,
  //     //   { headers: { "Content-Type": "multipart/form-data" } }
  //     // );

  //     // console.log("✅ Logged:", response.data);
  //   } catch (error) {
  //     console.log("❌ Error logging progress:", error);
  //   }
  // };



  // Track playback progress
  // const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
  //   if (!status.isLoaded) return;
  //   const percent = (status.positionMillis / status.durationMillis!) * 100;
  //   // await AsyncStorage.setItem(`video_progress_${uri}`, percent.toString());
  //   // console.log("pogress updated", percent)
  //   if(percent > 0){
  //     setProgress(percent);
  //     console.log("Progress %", percent);
  //   }

    // if (status.isPlaying) startPolling();
    // else stopPolling();

  //   if (status.didJustFinish) {
  //     console.log("Video finished!");
  //     onVideoEnd?.();
  //   }
  // };

  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    const percent = (status.positionMillis / status.durationMillis!) * 100;

    // if (percent > progress) { // only update if progress increased
      setProgress(percent);
      // console.log("Progress %", percent.toFixed(2));
    // }

     if(status.isPlaying) startPolling();
    else stopPolling();

    if (status.didJustFinish) {
      console.log("Video finished!");
      stopPolling();
      onVideoEnd?.(topic?.id);
    }
  };

  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);



  //   useFocusEffect(
  //   useCallback(() => {
  //     // Screen is focused
  //     return () => {
  //       // Screen is unfocused (user navigates back)
  //       if (previousTopic.current && progress !==0) {
  //         console.log("👋 User leaving screen — logging last progress...");
  //         logProgressInBackend(previousTopic.current.id, progress);
  //       }
  //     };
  //   }, [])
  // );


  useFocusEffect(
    useCallback(() => {
      return () => {
        if (previousTopic.current && progressRef.current !== 0) {
          console.log("👋 User leaving screen — logging last progress...");
          logProgressInBackend(previousTopic.current.id, progressRef.current);
        }
      };
    }, []) // empty dependency, cleanup always uses latest progress
  );


  const [firedNearEnd, setFiredNearEnd] = useState(false);


  const [duration, setDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [fired, setFired] = useState(false);

  // const startPolling = () => {
  //   if (intervalId) return;
  //   const id = setInterval(async () => {
  //     const status = await videoRef.current?.getStatusAsync();
  //     if (!status?.isLoaded) return;
  //     if (status.isPlaying) {
  //       if (status.positionMillis >= status.durationMillis - 5000 && !fired) {
  //         setFired(true);
  //         console.log("🔥 5 seconds left, triggering function!");
  //         // onAlmostEnd?.(); // <-- Call API or custom action
  //       }
  //       if (status.didJustFinish) {
  //         clearInterval(id);
  //         setIntervalId(null);
  //         setFired(false);
  //       }
  //     }
  //     else {
  //       console.log("paused")
  //     }
  //   }, 500); // check every 0.5s
  //   setIntervalId(id);
  // };

  const firedRef = useRef(false); // ✅ use ref so interval sees latest value

const startPolling = () => {
  if (intervalId) return;


  const id = setInterval(async () => {
    const status = await videoRef.current?.getStatusAsync();
    if (!status?.isLoaded) return;

    if (status.isPlaying) {
      const remaining = status.durationMillis - status.positionMillis;

      // 🔥 fire once when remaining <= 5s and not fired yet
      if (!firedRef.current && remaining <= 5000) {
        firedRef.current = true;
        console.log("🔥 5 seconds left, triggering function!");
        // onAlmostEnd?.(); // <-- your function
        logProgressInBackend(topic?.id,100)
      }

      // ✅ when video finishes
      if (status.didJustFinish) {
        clearInterval(id);
        setIntervalId(null);
        firedRef.current = false;
        console.log("✅ Video ended — reset fired");
      }
    }
  }, 2000);

  setIntervalId(id);
};

  const stopPolling = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  const [isFullScreen, setIsFullScreen] = useState(false);


  return (
    <View style={{ width: "100%", height: 280, backgroundColor: "#F2F2F2"}}>
      {/* {!isReady && (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -15, marginTop: -15 }}
        />
      )} */}

      {!isReady && (
        <View
          style={{
            position: "absolute",
            alignSelf:'center',
            marginTop:10,
            borderRadius:10,
            zIndex: 10,
            width: "90%",
            height: 250,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Video
        ref={videoRef}
        source={{ uri: `https://www.godigiinfotech.com/${topic?.video_url}` || "https://www.w3schools.com/html/mov_bbb.mp4" }}
        // source={{ uri: topic?.video_url || "https://www.w3schools.com/html/mov_bbb.mp4" }}
        style={{ height: 250,borderRadius:10,marginHorizontal:20,marginVertical:10 }}
        resizeMode={isFullScreen ? "contain" : "cover"}
        useNativeControls
        shouldPlay={false}
        isLooping={false}
        onReadyForDisplay={onReadyForDisplay}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
           onFullscreenUpdate={async ({ fullscreenUpdate }) => {
    if (fullscreenUpdate === 0) { // will present fullscreen
      console.log(fullscreenUpdate)
      setIsFullScreen(true)
    } else if (fullscreenUpdate === 2) { // will dismiss fullscreen
      console.log(fullscreenUpdate)
      // await ScreenOrientation.unlockAsync();
      setIsFullScreen(false)
    }
  }}
        // onFullscreenUpdate={async ({ fullscreenUpdate }) => {
        //   if (fullscreenUpdate === 0) { // will present fullscreen
        //     await ScreenOrientation.lockAsync(
        //       ScreenOrientation.OrientationLock.LANDSCAPE
        //     );
        //   } else if (fullscreenUpdate === 2) { // will dismiss fullscreen
        //     await ScreenOrientation.unlockAsync();
        //   }
        // }}
      />
    </View>
  );
}



// export  function VideoPlayerComponent({ uri,onProgress }: Props) {
//   // const player = useVideoPlayer({ uri: "" }); // start empty

//    const player = useVideoPlayer(uri, player => {
//     player.loop = true; // Optional: loop the video
//     player.currentTime = 2; // Set the starting time to 2 seconds
//     player.play(); // Start playback automatically
//   });

//   // useEffect(() => {
//   //   const loadVideo = async () => {
//   //     if (uri && player) {
//   //       try {
//   //         await player.replaceAsync({ uri }); // ✅ async call
//   //         // await player.setPositionAsync(2000); 
//   //         await player.play();
//   //         // await player.playheadPosition.set(2000); 
//   //       } catch (err) {
//   //         console.error("Error loading video:", err);
//   //       }
//   //     }
//   //   };

//   //   loadVideo();
//   // }, [uri]);

//   return (
//     <VideoView
//       player={player}
//       style={{
//         width: Dimensions.get("window").width,
//         height: 250,
//         backgroundColor: "black",
//       }}
//       nativeControls
//        fullscreenOptions={{
//         orientation: "landscape", // Forces landscape fullscreen
//       }}
//       allowsPictureInPicture
//     />
//   );
// }


// export function VideoPlayerComponent({ uri }: { uri: string }) {
//   // const player = useVideoPlayer(uri, player => {
//   //   player.loop = false;

//   //   // Restore progress from AsyncStorage
//   //   const restoreProgress = async () => {
//   //     try {
//   //       const progress = await AsyncStorage.getItem(`video_progress_${uri}`);
//   //       if (progress) {
//   //         const seekTo = (parseFloat(progress) / 100) * player.duration;
//   //         player.currentTime = seekTo / 1000; // currentTime is in seconds
//   //       }
//   //       player.play();
//   //     } catch (err) {
//   //       console.log("Restore progress error:", err);
//   //       player.play();
//   //     }
//   //   };

//   //   restoreProgress();
//   // });


//   let lastProgress = 0; // store last saved % before player init

//   // Read saved progress first
//   useEffect(() => {
//     const loadProgress = async () => {
//       const saved = await AsyncStorage.getItem(`video_progress_${uri}`);
//       console.log(uri,saved)
//       if (saved) lastProgress = parseFloat(saved);
//     };
//     loadProgress();
//   }, [uri]);

//   const player = useVideoPlayer(uri, player => {
//     player.loop = true; // Optional: loop the video
//     player.currentTime = 2; // Set the starting time to 2 seconds
//     player.play(); // Start playback automatically
//     console.log("this is dur",player.duration)
//   });

//   //   const player = useVideoPlayer(uri, player => {
//   //   player.loop = false;

//   //   // Poll until duration is known
//   //   const interval = setInterval(() => {
//   //     if (player.duration && player.duration > 0) {
//   //       const startTime = (lastProgress / 100) * player.duration; // in seconds
//   //       player.currentTime = startTime;
//   //       player.play();
//   //       clearInterval(interval);
//   //     }
//   //   }, 100);
//   // });

//   // Track progress every 1 second
//   useEffect(() => {
//   if (!player) return;

//   const interval = setInterval(() => {
//     if (!player || !player.duration) return;
//     const progressPercent = (player.currentTime / player.duration) * 100;
//     AsyncStorage.setItem(`video_progress_${uri}`, progressPercent.toString());
//     console.log("Progress %:", progressPercent,player.duration);
//   }, 1000);

//   return () => clearInterval(interval);
// }, [player]);


//   return (
//     <VideoView
//       player={player}
//       style={{
//         width: Dimensions.get("window").width,
//         height: 250,
//         backgroundColor: "black",
//       }}
//       nativeControls
//       fullscreenOptions={{ orientation: "landscape" }}
//       allowsPictureInPicture
//     />
//   );
// }

// export function VideoPlayerComponent({ uri }: { uri: string }) {
//   const [lastProgress, setLastProgress] = useState<number>(0);

//   useEffect(() => {
//     const loadProgress = async () => {
//       const saved = await AsyncStorage.getItem(`video_progress_${uri}`);
//       setLastProgress(saved ? parseFloat(saved) : 0);
//       console.log("Loaded saved progress:", saved);
//     };
//     loadProgress();
//   }, [uri]);

//   const player = useVideoPlayer(uri, (player) => {
//     player.loop = false;

//     const onReady = () => {
//       console.log("Player ready, restoring lastProgress:", lastProgress);
//       try {
//         if (player.duration && lastProgress) {
//           player.currentTime = (lastProgress / 100) * player.duration;
//           player.play();
//         }
//       } catch (e) {
//         console.warn("Player already released:", e);
//       }
//     };

//     // Use the safe 'ready' event to restore progress
//     // player.addListener("ready", onReady);

//     player.addListener("ready", () => {
//   console.log("Player ready, restoring lastProgress:", lastProgress);
//   try {
//     if (player.duration && lastProgress) {
//       player.currentTime = (lastProgress / 100) * player.duration;
//       player.play();
//     }
//   } catch (e) {
//     console.warn("Player already released:", e);
//   }
// });


//     // Track playback progress
//     const unsubscribe = player.addListener("statusUpdate", (status) => {
//       if (!status?.position || !status?.duration) return;
//       const percent = (status.position / status.duration) * 100;
//       AsyncStorage.setItem(`video_progress_${uri}`, percent.toString());
//       console.log("Progress %:", percent);
//     });

//     // Clean up everything if player changes/unmounts
//     return () => {
//       unsubscribe.remove();
//       player.removeListener("ready", onReady);
//     };
//   }, [lastProgress, uri]);

//   if (!player) return null;

//   return (
//     <VideoView
//       player={player}
//       style={{ width: "100%", height: 250, backgroundColor: "black" }}
//       nativeControls
//       fullscreenOptions={{ orientation: "landscape" }}
//       allowsPictureInPicture
//     />
//   );
// }








const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 5,
  },
  headerText: {
    fontSize: 16,
    color: "gray",
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
    paddingHorizontal: 20
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    elevation: 3,
    shadowColor: "lightgray",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    width: "65%",
  },
  id: {
    fontSize: 14,
    fontWeight: "600",
  },
  idNum: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#0662b84b",
    borderRadius: 30,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
