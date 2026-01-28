import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Search, Settings, MessageSquare } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Green Header Background */}
      <View style={[styles.greenHeader, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Search size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Settings size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
        >
          <Text style={styles.screenTitle}>Messages</Text>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {["All", "Traveling", "Support"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty State */}
          <View style={styles.emptyStateContainer}>
            <View style={styles.iconPlaceholder}>
              <MessageSquare size={32} color="#000" />
            </View>

            <Text style={styles.emptyTitle}>Build the perfect trip</Text>
            <Text style={styles.emptyDesc}>
              Explore homes, experiences, and services. When you book, your
              reservations will show up here.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  greenHeader: {
    height: 180,
    backgroundColor: "#2B8761",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    // paddingTop handled dynamically
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // marginTop removed to match Profile alignment
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)", // Semi-transparent
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  contentCard: {
    flex: 1,
    marginTop: -80, // Overlap
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#34D399",
  },
  tabText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  iconPlaceholder: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  emptyDesc: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
