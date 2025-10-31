import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from 'expo-image';
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("screen");
console.log(width)

const images = [ImagesPath.banner, ImagesPath.banner];

export default function AutoSwiperBanner({data}) {
    // console.log("data from home",data)
    let images = data.map((item)=>item.url)
  return (
    <View style={styles.wrapper}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
      >
        {images.map((img, index) => (
          <View style={styles.slide} key={index}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri:`https://godigiinfotech.com/${img}`}}
                // source={img}
                style={styles.image}
                 contentFit="fill"
             transition={1000}
              />
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 230,
    width: width,
    paddingHorizontal: 20,
    marginTop:10,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    paddingHorizontal:2,
    borderRadius:15

  },
  imageContainer: {
    // width: width, // Full width minus horizontal padding
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden", // Ensures corners are clipped
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15, // Rounded corners
  },
  pagination: {
    bottom: 5,
  },
  dot: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.bg,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});
