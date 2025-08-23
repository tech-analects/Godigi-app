import { ImagesPath } from "@/constants/ImagesPath";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function JobDetails() {
  const navigation = useNavigation();
  const router = useRouter();

  const goBack = () => {
    navigation.goBack();
    // if (router.canGoBack?.()) {
    //   router.goBack();
    // } else {
    //   router.replace("/home"); // or a fallback screen
    // }
  };


  const type = ["Full Time", "Remote", "Director"];

  const qualifications = [
    "Bachelor's degree in Computer Science or related field.",
    "2+ years of experience in Frontend Development.",
    "Proficiency in JavaScript, React, and modern front-end frameworks.",
    "Experience with HTML, CSS, and responsive design principles.",
    "Familiarity with version control systems (Git).",
    "Strong problem-solving and debugging skills.",
    "Excellent communication and teamwork abilities.",
  ];

  const perksAndBenefits = [
    {
      id: "1",
      perk: "Health Insurance",
      icon: (
        <MaterialIcons name="health-and-safety" size={24} color="#0069cb" />
      ),
    },
    {
      id: "2",
      perk: "Paid Time Off (PTO)",
      icon: <FontAwesome name="rupee" size={24} color="#0069cb" />,
    },
    {
      id: "3",
      perk: "Performance Bonuses",
      icon: (
        <MaterialCommunityIcons
          name="elevation-rise"
          size={24}
          color="#0069cb"
        />
      ),
    },
    {
      id: "4",
      perk: "Flexible Working Hours",
      icon: <Entypo name="back-in-time" size={24} color="#0069cb" />,
    },
    {
      id: "5",
      perk: "Travel Allowance",
      icon: <MaterialIcons name="time-to-leave" size={24} color="#0069cb" />,
    },
    {
      id: "6",
      perk: "Free Snacks & Beverages",
      icon: (
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={24}
          color="#0069cb"
        />
      ),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.iconText}>{item.icon}</Text>
      <Text style={styles.subHeadText}>{item.perk}</Text>
    </View>
  );

  const requiredSkills = [
    { id: "1", skill: "React.js" },
    { id: "2", skill: "JavaScript" },
    { id: "3", skill: "HTML & CSS" },
    { id: "4", skill: "Node.js" },
    { id: "5", skill: "Version control" },
    { id: "6", skill: "Redux" },
  ];

  const renderSkills = ({ item }) => (
    <View style={styles.skillContainer}>
      <Text style={styles.skillText}>{item.skill}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.bgMain}>
      <View style={styles.topPart}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text style={styles.pageName}>Job details</Text>
        </View>
        <View style={styles.rightside}>
          <FontAwesome name="bookmark-o" size={24} color="#95969D" />
          <Entypo name="share" size={24} color="#95969D" />
        </View>
      </View>
      <View style={styles.topPartRec}>
        <View style={styles.topBased}>
          <View style={styles.imageBg}>
            <Image
              source={ImagesPath.tcs}
              style={{ width: 50, height: 50, objectFit: "contain" }}
            />
          </View>
          <View>
            <Text style={styles.roleText}>Frontend Developer</Text>
            <View style={styles.compBased}>
              <Text style={styles.compText}>TCS</Text>
              <View style={styles.review}>
                <Text style={styles.subText}>
                  <AntDesign
                    name="star"
                    size={14}
                    color="#FFCC00"
                    style={{ marginHorizontal: 50 }}
                  />
                  4.5
                </Text>
                <View style={styles.line}></View>
                <Text style={styles.rev}>Review</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.typeView}>
          {type.map((i, index) => {
            // Return the Text component for each job type
            return (
              <Text style={styles.type} key={index}>
                {i}
              </Text>
            );
          })}
        </View>
        <View style={styles.midPart}>
          <View style={styles.leftmid}>
            <FontAwesome name="money" size={24} color="#0069cb" />
            <Text style={styles.packText}>8-9 LPA</Text>
          </View>
          <View>
            <Text style={styles.spanText}>5 days ago</Text>
          </View>
        </View>
        <View style={styles.staView}>
          <Text style={styles.appStatus}>Application Pending</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.jd}>
          <Text style={styles.subHead}>Your application status</Text>
          <View style={styles.staBd}>
            <View style={styles.staRow}>
              <AntDesign
                name="check"
                style={styles.iconTick}
                size={20}
                color="#00AD42"
              />
              <Text style={styles.staText}>Applied on 11/01</Text>
            </View>
            <View style={styles.verline}></View>
            <View style={styles.staRow}>
              <AntDesign
                name="check"
                style={styles.iconTick}
                size={20}
                color="#00AD42"
              />
              <Text style={styles.staText}>Awaiting recruiter action</Text>
            </View>
            <View style={styles.verline}></View>
            <View style={styles.staRow}>
              <AntDesign
                name="check"
                style={styles.iconTick}
                size={20}
                color="#00AD42"
              />
              <Text style={styles.staText}>Shorlisted on 14/01</Text>
            </View>
            <View style={styles.dotline}></View>
            <View style={styles.staRow}>
              <Entypo name="circle" size={26} color="#95969D" />
              <Text style={styles.staTextGrey}>Interview</Text>
            </View>
            <View style={styles.dotline}></View>
            <View style={styles.staRow}>
              <Entypo name="circle" size={26} color="#95969D" />
              <Text style={styles.staTextGrey}>Accepted</Text>
            </View>
          </View>
        </View>
        <View style={styles.jd}>
          <Text style={styles.subHead}>Job Description</Text>
          <Text style={styles.subHeadText}>
            We are looking for a skilled and passionate Frontend Developer to
            join our dynamic team at Tech Solutions Inc. As a Frontend
            Developer, you will be responsible for developing and maintaining
            the user interface of our web applications. You will work closely
            with designers and backend developers to create seamless and
            visually appealing websites that provide an excellent user
            experience.
          </Text>
        </View>
        <View style={styles.jd}>
          <Text style={[styles.subHead, { marginBottom: 5 }]}>
            Qualification
          </Text>
          <FlatList
            data={qualifications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.subHeadText}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.jd}>
          <Text style={[styles.subHead, { marginBottom: 5 }]}>
            Perks and Benefits
          </Text>
          <FlatList
            data={perksAndBenefits}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.jd}>
          <Text style={styles.subHead}>Required skills</Text>
          <FlatList
            data={requiredSkills}
            renderItem={renderSkills}
            numColumns={3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.jd}>
          <Text style={styles.subHead}>Additional Information</Text>
          <View style={styles.infoRow}>
            <View style={styles.rightRow}>
              <Text style={styles.rowHead}>Job Level</Text>
              <Text style={styles.rowBd}>Associate</Text>
            </View>
            <View style={styles.leftRow}>
              <Text style={styles.rowHead}>Job Category</Text>
              <Text style={styles.rowBd}>IT and software</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.rightRow}>
              <Text style={styles.rowHead}>Education</Text>
              <Text style={styles.rowBd}>Graduate</Text>
            </View>
            <View style={styles.leftRow}>
              <Text style={styles.rowHead}>Experience</Text>
              <Text style={styles.rowBd}>2-3 years</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.rightRow}>
              <Text style={styles.rowHead}>Vacancy</Text>
              <Text style={styles.rowBd}>20</Text>
            </View>
            <View style={styles.leftRow}>
              <Text style={styles.rowHead}>Website</Text>
              <Text style={styles.rowBd}>www.tcs.career.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.jd}>
          <Text style={styles.subHead}>About Company</Text>
          <Text style={styles.subHeadText}>
            TCS is a globally recognized leader in providing innovative
            solutions and cutting-edge technology across various industries.
            Founded with the vision of transforming industries and improving the
            quality of life, we have consistently delivered high-quality
            services and products to meet the evolving needs of our clients. Our
            approach is to prioritize customer satisfaction by offering
            innovative products, exceptional services, and a commitment to
            making a positive impact on both businesses and communities.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    backgroundColor: "#fafafd",
    flex: 1,
  },
  iconTick: {
    padding: 3,
    backgroundColor: "rgba(0, 173, 66, 0.2)",
    borderRadius: 50,
  },
  staText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#00AD42",
  },
  staTextGrey: {
    fontSize: 16,
    fontWeight: 600,
    color: "grey",
  },
  verline: {
    width: 0,
    height: 20,
    borderColor: "#00AD42",
    borderWidth: 1,
    marginLeft: 12,
  },
  dotline: {
    width: 0,
    height: 20,
    borderStyle: "dotted",
    borderColor: "#D9D9D9",
    borderWidth: 2,
    marginLeft: 10,
  },
  staRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  staBd: {
    padding: 5,
    marginTop: 10,
  },
  bullet: {
    fontSize: 20,
    color: "grey",
    marginRight: 10,
    paddingTop: 2,
  },
  skillContainer: {
    margin: 10,
  },
  leftRow: {
    width: "50%",
  },
  rowHead: {
    fontSize: 17,
    fontWeight: "bold",
    color: "grey",
  },
  rightRow: {
    width: "50%",
  },
  rowBd: {
    fontSize: 15,
    fontWeight: "semibold",
    color: "#0069CB",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: -7,
  },
  skillText: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: "#0069CB",
    color: "#0069CB",
    borderWidth: 2,
  },
  listContainer: {
    marginBottom: 0,
  },
  itemContainer: {
    // marginVertical: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },
  subHeadText: {
    color: "#95969D",
    fontWeight: 500,
    fontSize: 16,
    margin: 10,
    marginTop: 5,
  },
  subHead: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  jd: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  iconText: {
    width: 40,
    height: 30,
    textAlign: "center",
  },
  info: {},
  packText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#676767",
  },
  spanText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0069cb",
  },
  staView: {
    marginTop: 10,
    width: "50%",
  },
  appStatus: {
    textAlign: "center",
    width: "auto",
    backgroundColor: "rgba(255, 204, 102, 0.2)",
    borderRadius: 8,
    padding: 5,
    fontSize: 16,
    color: "orange",
    fontWeight: 600,
  },
  leftmid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  midPart: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topPart: {
    backgroundColor: "#fafafd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 2,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    paddingTop: Platform.OS == "android" ? 50 : 50,
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  rightside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topPartRec: {
    // flexDirection: "row",
    padding: 20,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.85,
    shadowRadius: 5,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  topBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    width: "80%",
  },
  roleText: {
    fontWeight: "600",
    fontSize: 22,
  },
  compText: {
    fontWeight: "600",
    fontSize: 14,
    color: "grey",
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginLeft: 10,
  },
  line: {
    width: 0,
    height: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  rev: {
    color: "grey",
    fontSize: 14,
    fontWeight: 500,
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  subText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 14,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  type: {
    backgroundColor: "#fff",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "semibold",
    color: "grey",
    borderWidth: 0.5,
    borderColor: "grey",
  },
});

export default JobDetails;
