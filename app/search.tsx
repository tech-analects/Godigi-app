import ThemeBtn from "@/components/ThemeBtn";
import { Colors } from "@/constants/Colors";
import { ImagesPath } from "@/constants/ImagesPath";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";

function Search() {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [searchJobInput, setSearchJobInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(true);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isJobLevelOpen, setIsJobLevelOpen] = useState(false);
  const [isJobCatOpen, setIsJobCatOpen] = useState(false);
  const [isJobRoleOpen, setIsJobRoleOpen] = useState(false);
  const [isEmpOpen, setIsEmpOpen] = useState(false);
  const [isEduOpen, setIsEduOpen] = useState(false);
  const [jobFilter, setJobFilter] = useState("On Site");

  const [selectedJobFilter, setSelectedJobFilter] = useState("Job Type");

  const toggleFilter = () => {
    console.log("hello");
    setIsFilterOpen(!isFilterOpen);
  };

  const dataOfRecentSearches = [
    {
      id: 1,
      role: "Frontend Developer",
    },
    {
      id: 2,
      role: "Backend Developer",
    },
    {
      id: 3,
      role: "Reactjs Developer",
    },
  ];

  const roles = [
    { id: 1, role: "Manager" },
    { id: 2, role: "Developer" },
    { id: 3, role: "Designer" },
    { id: 4, role: "Artist" },
    { id: 5, role: "Engineer" },
    { id: 6, role: "Writer" },
    { id: 7, role: "Editor" },
    { id: 8, role: "Coordinator" },
    { id: 9, role: "Analyst" },
    { id: 10, role: "Leader" },
  ];

  const popularJobs = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "GoDigi infotech",
      packageRange: "$60,000",
      location: "Pune, India",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "GoDigi infotech",
      packageRange: "$60,000",
      location: "Pune, India",
    },
  ];

  const filterArray = [
    {
      id: 1,
      name: "Job Type",
    },
    {
      id: 2,
      name: "Experience",
    },
    {
      id: 3,
      name: "Location",
    },
    {
      id: 4,
      name: "Salary",
    },
    {
      id: 5,
      name: "Job Level",
    },
    {
      id: 6,
      name: "Job Category",
    },
    {
      id: 7,
      name: "Role",
    },
    {
      id: 8,
      name: "Employment Type",
    },
    {
      id: 9,
      name: "Education",
    },
  ];

  const recJobArray = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TCS",
      packageRange: "$60,000 - $80,000",
      rating: 4.5,
      location: "San Francisco, CA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 2,
      role: "UX/UI Designer",
      company: "DesignCo",
      packageRange: "$50,000 - $70,000",
      rating: 4.2,
      location: "New York, NY",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 3,
      role: "Marketing Manager",
      company: "TCS",
      packageRange: "$70,000 - $90,000",
      rating: 4.7,
      location: "Los Angeles, CA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 4,
      role: "Backend Developer",
      company: "Amdocs",
      packageRange: "$80,000 - $100,000",
      rating: 4.6,
      location: "Austin, TX",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
    {
      id: 5,
      role: "Product Manager",
      company: "NextGen Solutions",
      packageRange: "$90,000 - $120,000",
      rating: 4.8,
      location: "Seattle, WA",
      posted: "5 days ago",
      type: ["Full Time", "Remote", "Director"],
    },
  ];
  const router = useRouter();

  const goToJobDetails = () => {
    router.push("/jobDetails");
  };
  const goToApplyJobs = () => {
    router.push("/applyJobs");
  };

  // const prfBasedJobItem = ({ item }) => (
  //   <TouchableOpacity style={styles.basedJob} onPress={goToApplyJobs}>
  //     <View style={styles.topPartRec}>
  //       <View style={styles.topBased}>
  //         <View style={styles.imageBg}>
  //           <Image
  //             source={ImagesPath.tcs}
  //             style={{ width: 50, height: 50, objectFit: "contain" }}
  //           />
  //         </View>
  //         <View>
  //           <Text style={styles.roleText}>{item.role}</Text>
  //           <View style={styles.compBased}>
  //             <Text style={styles.compText}>{item.company}</Text>
  //             <View style={styles.review}>
  //               <Text style={styles.subText}>
  //                 <AntDesign
  //                   name="star"
  //                   size={14}
  //                   color="#FFCC00"
  //                   style={{ marginHorizontal: 50 }}
  //                 />
  //                 {item.rating}
  //               </Text>
  //               <View style={styles.linev}></View>
  //               <Text style={styles.rev}>Review</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //       <FontAwesome name="bookmark" size={24} color="#0069CB" />
  //     </View>
  //     <View style={styles.package}></View>
  //     <View style={styles.typeView}>
  //       {item.type.map((i, index) => {
  //         // Return the Text component for each job type
  //         return (
  //           <Text style={styles.type} key={index}>
  //             {i}
  //           </Text>
  //         );
  //       })}
  //     </View>
  //     <View style={styles.dottedLine}></View>
  //     <View style={styles.bottompart}>
  //       <View style={styles.btRightPart}>
  //         <Entypo name="location-pin" size={24} color="grey" />
  //         <Text style={styles.btsubText}>{item.location}</Text>
  //       </View>
  //       <View style={styles.btLeftPart}>
  //         <Text style={styles.btsubText}>{item.posted}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

   const prfBasedJobItem = ({ item }) => (
      <TouchableOpacity onPress={goToJobDetails} style={styles.basedJob}>
        <View style={styles.topPartRec}>
          <View style={styles.topBased}>
            <Image
              source={ImagesPath.fb}
              style={{ width: 50, height: 50, objectFit: "contain" }}
            />
            <View>
              <Text style={styles.roleText}>{item.role}</Text>
              <View style={styles.compBased}>
                <Text style={styles.compText}>{item.company}</Text>
                <View style={styles.review}>
                  <Text style={styles.subText}>
                    <AntDesign
                      name="star"
                      size={14}
                      color="#FFCC00"
                      style={{ marginHorizontal: 50 }}
                    />
                    {item.rating}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={styles.btRightPart}>
                  <Entypo name="location-pin" size={22} color="grey" />
                  <Text style={styles.btsubText}>{item.location}</Text>
                </View>
                <View style={styles.btRightPart}>
                  <FontAwesome name="briefcase" size={18} color="gray" />
                  <Text style={styles.btsubText}>{item.packageRange}</Text>
                </View>
                <Text style={styles.bttimeText}>posted 20h ago</Text>
              </View>
            </View>
          </View>
          <FontAwesome name="bookmark" size={24} color={Colors.bg} />
        </View>
        {/* <View style={styles.bottompart}>
          <View style={styles.btRightPart}>
            <Entypo name="location-pin" size={24} color="grey" />
            <Text style={styles.btsubText}>{item.location}</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );

  const recentItems = ({ item }) => (
    <View style={styles.recentJobItem}>
      <View style={styles.part}>
        <Entypo name="back-in-time" size={24} color="#95969D" />
        <Text style={{ color: "#95969D", fontSize: 16 }}>{item.role}</Text>
      </View>
      <Entypo name="cross" size={24} color="#95969D" />
    </View>
  );

  const popRoles = ({ item }) => (
    <View style={styles.popRoles}>
      <Text style={{ fontSize: 16 }}>{item.role}</Text>
    </View>
  );

  const renderPopularJobItem = ({ item }) => (
    <View style={styles.popularJobItem}>
      <View style={styles.popRight}>
          <Image
            source={ImagesPath.dribbble}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
        <View>
          <Text style={styles.roleText}>{item.role}</Text>
          <Text style={styles.compText2}>{item.company}</Text>
        </View>
      </View>
      <View style={styles.popLeft}>
        <Text style={styles.package}>{item.packageRange}</Text>
        <Text style={styles.loc}>{item.location}</Text>
      </View>
    </View>
  );

  const [filterCat, setFilterCat] = useState("Job Type");

  const renderfilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterCategoryItem,
        selectedJobFilter === item.name && styles.selectedFilterCategory,
      ]}
      // onPress={() => setFilterCat(item.name)}
      onPress={() => setSelectedJobFilter(item.name)}
    >
      <Text
        style={[
          styles.filterCategoryText,
          selectedJobFilter === item.name && styles.selectedFilterText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const [isFilterViewOpen, setIsFilterViewOpen] = useState(false);

  const FilterModal = (
    <Modal
      visible={isFilterOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => toggleFilter}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.topPartModal}>
          <Entypo name="cross" size={28} color="black" onPress={toggleFilter} />
          <Text style={styles.pageNameModal}>Filter Options</Text>
        </View>
        <View style={styles.typeView}>
          <FlatList
            contentContainerStyle={{
              justifyContent: "space-evenly",
              // width: "100%",
            }}
            horizontal
            data={filterArray}
            renderItem={renderfilterItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.filterCategoryBar}
          />
        </View>

        <View style={{ paddingBottom: 100 }}>
          {/* Job type part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Job type</Text>
              <TouchableOpacity onPress={() => setIsJobOpen(!isJobOpen)}>
                {selectedJobFilter == "Job Type" ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {selectedJobFilter == "Job Type" && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value="first"
                    status={jobFilter === "On Site" ? "checked" : "unchecked"}
                    onPress={() => setJobFilter("On Site")}
                    color="#0069cb"
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>On Site</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value="first"
                    status={jobFilter === "Hybrid" ? "checked" : "unchecked"}
                    onPress={() => setJobFilter("Hybrid")}
                    color="#0069cb"
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Hybrid</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value="first"
                    status={jobFilter === "Remote" ? "checked" : "unchecked"}
                    onPress={() => setJobFilter("Remote")}
                    color="#0069cb"
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Remote</Text>
                </View>
              </View>
            )}
          </View>

          {/* Experience part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Experience</Text>
              <TouchableOpacity
                onPress={() =>
                  selectedJobFilter == "Experience"
                    ? setSelectedJobFilter("Job Type")
                    : setSelectedJobFilter("Experience")
                }
              >
                {selectedJobFilter == "Experience" ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {selectedJobFilter == "Experience" && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>No Experience</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Upto 1 year</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>2 - 3 years</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>3 - 5 years</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>7+ years</Text>
                </View>
              </View>
            )}
          </View>
          {/* <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Experience</Text>
              <TouchableOpacity onPress={() => setIsExpOpen(!isExpOpen)}>
                {isExpOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isExpOpen && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>No Experience</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Upto 1 year</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>2 - 3 years</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>3 - 5 years</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>7+ years</Text>
                </View>
              </View>
            )}
          </View> */}

          {/* Location part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Location</Text>
              <TouchableOpacity
                onPress={() => setIsLocationOpen(!isLocationOpen)}
              >
                {isLocationOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isLocationOpen && (
              <View>
                <View style={styles.line}></View>

                <View style={styles.searchBg}>
                  <AntDesign
                    name="search1"
                    size={22}
                    color="grey"
                    style={styles.searchIcon2}
                  />
                  <TextInput
                    placeholder="Search a location"
                    placeholderTextColor={"grey"}
                    autoComplete="off"
                    editable={false}
                    style={[
                      Colors.inputbox,
                      {
                        backgroundColor: "#fff",
                        borderWidth: 0,
                        width: "100%",
                        borderColor: "lightgrey",
                        borderWidth: 0.5,
                        paddingLeft: 50,
                        height: 50,
                      },
                    ]}
                  />
                  <FontAwesome
                    name="microphone"
                    size={24}
                    color="grey"
                    style={styles.filImg}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Entypo name="location-pin" size={24} color="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Pune, Maharashtra</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Entypo name="location-pin" size={24} color="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Mumbai, Maharashtra</Text>
                </View>
              </View>
            )}
          </View>

          {/* Job level part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Job Level</Text>
              <TouchableOpacity
                onPress={() => setIsJobLevelOpen(!isJobLevelOpen)}
              >
                {isJobLevelOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isJobLevelOpen && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Associate / Supervisor</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Director / Executive</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Entry level / apprentice</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Internship / OJT</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    // status={checked ? "checked" : "unchecked"}
                    // onPress={() => setChecked(!checked)}
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Mid senior / Manager</Text>
                </View>
              </View>
            )}
          </View>

          {/* Job Category part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>
                Job Category
              </Text>
              <TouchableOpacity onPress={() => setIsJobCatOpen(!isJobCatOpen)}>
                {isJobCatOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isJobCatOpen && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Agriculture</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Construction</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Data Analyst</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Data Scientist</Text>
                </View>

                {/* Additional Job Categories */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Healthcare</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Finance</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Marketing</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Engineering</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>IT</Text>
                </View>
              </View>
            )}
          </View>

          {/* Job Role part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Job Role</Text>
              <TouchableOpacity
                onPress={() => setIsJobRoleOpen(!isJobRoleOpen)}
              >
                {isJobRoleOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isJobRoleOpen && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Developer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Designer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Project Manager</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Software Engineer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Data Scientist</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>UI/UX Designer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Data Analyst</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Full-stack Developer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Network Engineer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>System Administrator</Text>
                </View>
              </View>
            )}
          </View>
          {/* Employment type part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>
                Employment Type
              </Text>
              <TouchableOpacity onPress={() => setIsEmpOpen(!isEmpOpen)}>
                {isEmpOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isEmpOpen && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>Contractual</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Freelancer</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Full-time</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Part-time</Text>
                </View>
              </View>
            )}
          </View>
          {/* Education type part here */}
          <View style={styles.filter}>
            <View style={styles.topPartFilter}>
              <Text style={{ color: "#676767", fontSize: 16 }}>Education</Text>
              <TouchableOpacity onPress={() => setIsEduOpen(!isEduOpen)}>
                {isEduOpen ? (
                  <AntDesign name="up" size={24} color="#676767" />
                ) : (
                  <AntDesign name="down" size={24} color="#676767" />
                )}
              </TouchableOpacity>
            </View>
            {isEduOpen && (
              <View>
                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="#0069cb" // Change the color of the checkbox when checked
                    uncheckedColor="#0069cb"
                  />
                  <Text style={{ fontSize: 14 }}>B.E. / B. Tech</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>M.E. / M. Tech</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>MCA</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>PG diploma</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox color="#0069cb" uncheckedColor="#0069cb" />
                  <Text style={{ fontSize: 14 }}>Under Graduate</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.nextButton}>
        <ThemeBtn btnTitle={"Reset"} />
        <ThemeBtn btnTitle={"Apply"} />
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.bgMain}>
      <View style={styles.topPart}>
        <Entypo name="cross" size={28} color="black" onPress={goBack} />
        <Text style={styles.pageName}>Search</Text>
      </View>
      <View style={styles.searchBg}>
        <AntDesign
          name="search1"
          size={22}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search a Job or Position"
          value={searchJobInput}
          onChangeText={(e) => {
            setSearchJobInput(e);
            console.log(e);
          }}
          placeholderTextColor={"grey"}
          autoComplete="off"
          style={[
            Colors.inputbox,
            {
              backgroundColor: "#fff",
              borderWidth: 0,
              width: "90%",
              borderColor: "lightgrey",
              borderWidth: 0.5,
              paddingLeft: 50,
              height: 50,
            },
          ]}
        />
        <TouchableOpacity onPress={toggleFilter} style={styles.filImg}>
          <Image source={ImagesPath.filter} />
        </TouchableOpacity>
      </View>
      {searchJobInput.length == 0 && (
        <View>
          <View style={styles.jd}>
            <Text style={styles.subHead}>Recent Searches</Text>
            <FlatList
              data={dataOfRecentSearches}
              renderItem={recentItems}
              keyExtractor={(item) => item.id.toString()}
              style={styles.popJobs}
            />
          </View>
          <View style={styles.jd}>
            <Text style={styles.subHead}>Popular Roles</Text>
            <FlatList
              data={roles}
              renderItem={popRoles}
              keyExtractor={(item) => item.id.toString()}
              style={styles.popRolesCont}
              contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
            />
          </View>
          <View style={styles.jd}>
            <Text style={styles.subHead}>Recently Viewed</Text>
            <FlatList
              data={popularJobs}
              renderItem={renderPopularJobItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.popJobs}
            />
          </View>
        </View>
      )}

      {isFilterViewOpen && (
        <View style={styles.filterView}>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Alphabetical (A -Z)</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Most recent</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Highest Salary</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Newly posted</Text>
          </View>
          <View style={styles.filCont}>
            <Text style={styles.filText}>Ending Soon</Text>
          </View>
        </View>
      )}

      {searchJobInput && !searchJobInput.includes("dev") && (
        <View style={styles.noJobs}>
          <Image source={ImagesPath.searchImg} />
          <Text style={styles.noMatch}>No Match Found</Text>
          <Text style={styles.noMsg}>
            Sorry, The keyword you are looking for cannot be found, do try any
            other keyword
          </Text>
        </View>
      )}
      {searchJobInput.includes("dev") && (
        <View>
          <View style={styles.topPart2}>
            <View style={styles.savedText}>
              <Text style={styles.jobNumber}>422</Text>
              <Text style={styles.jobText}>Total jobs</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsFilterViewOpen(!isFilterViewOpen)}
            >
              <Image source={ImagesPath.data} style={styles.img} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={recJobArray}
            showsVerticalScrollIndicator={false}
            renderItem={prfBasedJobItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.jobCont}
          />
        </View>
      )}
      {FilterModal}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgMain: {
    flex: 1,
    backgroundColor: "#fafafd",
  },
  filText: {
    fontSize: 14,
    fontWeight: 500,
  },
  filCont: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
    marginVertical: 5,
    padding: 5,
  },
  filterView: {
    position: "absolute",
    top: 150,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 50,
    zIndex: 100,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0,
    elevation: 5,
  },
  img: {
    height: 20,
    width: 20,
  },
  topPart2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  jobNumber: {
    color: "#0069cb",
    fontSize: 16,
    fontWeight: "bold",
  },
  jobText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  savedText: {
    flexDirection: "row",
    gap: 5,
  },
  noMatch: {
    color: "black",
    fontSize: 20,
    fontWeight: 600,
    marginVertical: 20,
  },
  noMsg: {
    color: "grey",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
    marginVertical: 20,
  },
  noJobs: {
    paddingVertical: 100,
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    marginVertical: 10,
    width: "100%",
    height: 0,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  filter: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  topPartFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  part: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  topPart: {
    backgroundColor: "#fafafd",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
    paddingTop: Platform.OS === "android" ? 40 : 50,
  },
  nextButton: {
    position: "absolute",
    bottom: 0, // Position at the bottom of the screen
    // left: 20,
    // right: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: Platform.OS == "ios" ? 0 : "30%",
  },
  searchBg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 30,
    zIndex: 100,
  },
  searchIcon2: {
    position: "absolute",
    left: 20,
    zIndex: 100,
  },
  filImg: {
    position: "absolute",
    right: 30,
  },
  subHead: {
    color: "#000",
    fontWeight: 600,
    fontSize: 17,
  },
  jd: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  popJobs: {
    backgroundColor: "#fafafd",
  },
  recentJobItem: {
    backgroundColor: "#fafafd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  popRolesCont: {
    gap: 10,
    marginTop: 10,
  },
  popRoles: {
    backgroundColor: "#fff",
    // width: "30%",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5,
  },
  popularJobItem: {
    backgroundColor: "#fff",
    height: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "lightgrey",

    shadowColor: "lightgrey",
    shadowOffset: { width: 0, height: 5 },
  },
  loc: {
    fontSize: 12,
    color: "grey",
  },
  popRight: {
    width: "65%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  popLeft: {
    width: "30%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imageBg: {
    borderRadius: 3,
    borderColor: "lightgrey",
    borderWidth: 1,
  },
  roleText: {
    fontWeight: "600",
    fontSize: 16,
  },
  compText2: {
    fontWeight: "400",
    fontSize: 14,
    color: "grey",
  },
  package: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topPartModal: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 10,
    paddingTop: Platform.OS === "android" ? 20 : 50,
  },
  pageNameModal: {
    fontSize: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  filterCategoryItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1.5,
    height: 40,
    paddingHorizontal: 5,
    // marginRight: 15,
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    // borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedFilterCategory: {
    borderBottomColor: "#0069CB",
    borderBottomWidth: 2,
  },
  filterCategoryText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "600",
    padding: 5,
  },
  selectedFilterText: {
    fontSize: 16,
    color: "#0069CB",
  },
  filterCategoryBar: {
    marginHorizontal: 5,
    flexDirection: "row",
    paddingVertical: 0,
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    justifyContent: "space-evenly",
  },
  jobCont: {
    gap: 10,
    paddingHorizontal: 20,
  },

  recJob: {
    backgroundColor: "#fff",
    width: 300,
    height: 200,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  basedJob: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.8,
    elevation: 5,
  },
  topPartRec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dottedLine: {
    marginVertical: 10,
    width: "100%",
    height: 0,
    borderColor: "grey",
    borderStyle: "dashed",
    borderWidth: 0.8,
  },
  roleText: {
    fontWeight: "600",
    fontSize: 16,
  },
  compText: {
    fontWeight: "400",
    fontSize: 14,
    color: "#0069CB",
  },
  subText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 14,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  package: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  linev: {
    width: 0,
    height: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  type: {
    backgroundColor: "lightgrey",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "semibold",
  },
  btRightPart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 1,
  },
  bttimeText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 14,
    marginTop: 5,
  },
  bottompart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btsubText: {
    color: "grey",
    fontWeight: "semibold",
    fontSize: 14,
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  rev: {
    color: "grey",
    fontSize: 14,
    fontWeight: 500,
  },
  topBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "flex-start",
  },
  compBased: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    gap: 10,
    marginTop: 2,
  },
});

export default Search;
