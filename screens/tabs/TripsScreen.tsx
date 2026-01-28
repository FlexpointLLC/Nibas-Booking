import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";

const { width } = Dimensions.get("window");

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, listings(*)")
        .order("start_date", { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Green Header Background */}
      <View style={[styles.greenHeader, { paddingTop: insets.top + 20 }]} />

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2B8761"
              colors={["#2B8761"]}
            />
          }
        >
          <Text style={styles.screenTitle}>Trips</Text>

          {loading ? (
            <Text>Loading...</Text>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => {
              const listing = booking.listings;
              return (
                <View key={booking.id} style={styles.bookingCard}>
                  <Image
                    source={{ uri: listing?.image_urls?.[0] }}
                    style={styles.bookingImage}
                  />
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingTitle}>{listing?.title}</Text>
                    <Text style={styles.bookingDate}>
                      {booking.start_date} - {booking.end_date}
                    </Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{booking.status}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyTitle}>Build the perfect trip</Text>
              <Text style={styles.emptyDesc}>
                Explore homes, experiences, and services. When you book, your
                reservations will show up here.
              </Text>

              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Get started</Text>
              </TouchableOpacity>
            </View>
          )}
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
    // paddingTop handled dynamically
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
  placeholderBox: {
    width: "100%",
    height: 200,
    backgroundColor: "#E5E7EB", // Gray placeholder
    borderRadius: 16,
    marginBottom: 32,
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
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
    marginBottom: 32,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: "#34D399",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bookingCard: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  bookingImage: {
    width: 100,
    height: 100,
    backgroundColor: "#eee",
  },
  bookingInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  bookingDate: {
    color: "#666",
    fontSize: 14,
    marginBottom: 6,
  },
  statusBadge: {
    backgroundColor: "#E6FFFA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#2B8761",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
