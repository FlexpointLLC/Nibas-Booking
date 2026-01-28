import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import {
  Settings,
  ChevronRight,
  User,
  LogOut,
  Bell,
  Shield,
  Map,
  Users,
  Home,
  CircleHelp,
  Gift,
  FileText,
  Search,
} from "lucide-react-native";

const ProfileIconPng = require("../../assets/icons/profile_icon.png");

const HEADER_BG_COLOR = "#2B8761"; // Updated to match other screens
const CARD_BG_COLOR = "#F3F4F6";

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const insets = useSafeAreaInsets();

  const fullName = user?.user_metadata?.full_name || "Guest User";
  // const email = user?.email || ""; // Not shown in new design primarily, but we stick to name + role

  const menuItems = useMemo(
    () => [
      { icon: Settings, label: "Account Settings" },
      { icon: CircleHelp, label: "Get help" }, // Using CircleHelp for Question/Help
      { icon: User, label: "View profile" },
      { icon: Shield, label: "Privacy" },
    ],
    [],
  );

  const menuItemsSecondary = useMemo(
    () => [
      { icon: Gift, label: "Refer a host" },
      { icon: Search, label: "Find a co-host" }, // Search/UserPlus
      { icon: FileText, label: "Legal" },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header Content (Bell) */}
      <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.notificationBtn}>
          <Bell size={24} color="#FFF" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Main Content Sheet */}
      <View style={styles.bottomSheet}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.pageTitle}>Profile</Text>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <Image source={ProfileIconPng} style={styles.avatar} />
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userRole}>Guest</Text>
          </View>

          {/* Quick Actions Grid */}
          <View style={styles.quickActionsContainer}>
            {/* Past Trips */}
            <TouchableOpacity style={styles.actionCard}>
              <Map size={32} color="#374151" style={styles.actionIcon} />
              <Text style={styles.actionLabel}>Past trips</Text>
            </TouchableOpacity>

            {/* Connections */}
            <TouchableOpacity style={[styles.actionCard, { marginLeft: 15 }]}>
              <Users size={32} color="#374151" style={styles.actionIcon} />
              <Text style={styles.actionLabel}>Connections</Text>
            </TouchableOpacity>
          </View>

          {/* Promo Banner */}
          <TouchableOpacity style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <View style={styles.promoTextContainer}>
                <Text style={styles.promoTitle}>Become a host</Text>
                <Text style={styles.promoSubtitle}>
                  It's easy to start hosting and earn extra income
                </Text>
              </View>
              <Home size={32} color="#374151" />
            </View>
          </TouchableOpacity>

          {/* Menu List 1 */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <MenuRow key={index} item={item} />
            ))}
          </View>

          <View style={styles.divider} />

          {/* Menu List 2 */}
          <View style={styles.menuContainer}>
            {menuItemsSecondary.map((item, index) => (
              <MenuRow key={index} item={item} />
            ))}

            {/* Log Out */}
            <TouchableOpacity style={styles.menuItem} onPress={signOut}>
              <View style={styles.menuItemLeft}>
                <LogOut size={24} color="#4B5563" />
                <Text style={styles.menuItemLabel}>Log out</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function MenuRow({ item }: { item: { icon: any; label: string } }) {
  const Icon = item.icon;
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Icon size={24} color="#4B5563" />
        <Text style={styles.menuItemLabel}>{item.label}</Text>
      </View>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER_BG_COLOR,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: HEADER_BG_COLOR,
  },
  notificationBtn: {
    padding: 5,
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444", // Red dot
    borderWidth: 1,
    borderColor: HEADER_BG_COLOR,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: "#4B5563",
  },
  quickActionsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 120, // Square-ish
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  promoBanner: {
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  promoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  menuContainer: {
    // marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemLabel: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 16,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
});
