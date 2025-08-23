import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import ThemeBtn from "@/components/ThemeBtn";
import Animated, { FadeInDown } from "react-native-reanimated";

const installmentsData = [
  {
    id: "1",
    title: "Installment 1",
    amount: "₹5,000",
    date: "2025-01-15",
    status: "Paid",
    details: "This installment covers the course fee for Module 1.",
  },
  {
    id: "2",
    title: "Installment 2",
    amount: "₹5,000",
    date: "2025-02-15",
    status: "Pending",
    details: "This installment covers the course fee for Module 2.",
  },
  {
    id: "3",
    title: "Installment 3",
    amount: "₹5,000",
    date: "2025-03-15",
    status: "Pending",
    details: "This installment covers the course fee for Module 3.",
  },
];

export default function InstallmentsScreen() {
  const [expanded, setExpanded] = useState({});
  const navigation = useNavigation();

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = ({ item }) => {
    const isPaid = item.status === "Paid";
    const isExpanded = expanded[item.id];

    return (
      <View style={styles.card}>
        {/* Top Row */}
        <View style={styles.row}>
          <FontAwesome
            name={isPaid ? "check-circle" : "clock-o"}
            size={28}
            color={isPaid ? "#4CAF50" : "#FFA000"}
          />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>Due Date: {item.date}</Text>
          </View>

          <View
            style={[styles.statusBadge, isPaid ? styles.paid : styles.pending]}
          >
            <Text
              style={[
                styles.statusText,
                { color: isPaid ? "#2E7D32" : "#E65100" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Amount & Status */}
        <View style={styles.amountStatus}>
          <Text style={styles.amount}>{item.amount}</Text>
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Ionicons
              name={isExpanded ? "eye-off" : "eye"}
              size={22}
              color="#444"
            />
          </TouchableOpacity>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.expandedSection}>
            <Text style={styles.detailsText}>{item.details}</Text>
            {isPaid ? (
              <TouchableOpacity style={styles.invoiceBtn}>
                <Text style={styles.btnText}>Done</Text>
              </TouchableOpacity>
            ) : (
            //   <TouchableOpacity style={styles.payBtn}>
            //     <MaterialIcons name="payment" size={18} color="#fff" />
            //     <Text style={styles.btnText}>Pay Now</Text>
            //   </TouchableOpacity>
              <ThemeBtn btnTitle={"Continue"}/>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topPart}>
        <View style={styles.leftside}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.pageName}>Installments</Text>
        </View>
      </View>

      {/* List */}
      <Animated.FlatList
        data={installmentsData}
        renderItem={renderItem}
        entering={FadeInDown.duration(500).delay(200)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafd" },

  topPart: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: Platform.OS === "android" ? 50 : 50,
    shadowColor: "#ccc",
    shadowOpacity: 0.85,
    shadowRadius: 2,
    elevation: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
  },
  leftside: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  pageName: { fontSize: 20, fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  row: { flexDirection: "row", alignItems: "center" },
  details: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: "600" },
  date: { fontSize: 14, color: "#777", marginTop: 2 },

  amountStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  amount: { fontSize: 16, fontWeight: "bold" },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  paid: { backgroundColor: "#E8F5E9" },
  pending: { backgroundColor: "#FFF3E0" },
  statusText: { fontSize: 12, fontWeight: "600" },

  expandedSection: { marginTop: 10 },
  detailsText: { fontSize: 14, color: "#555", marginBottom: 10 },

  invoiceBtn: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    gap: 6,
    justifyContent: "center",
  },
  payBtn: {
    backgroundColor: "#FFA000",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    gap: 6,
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
