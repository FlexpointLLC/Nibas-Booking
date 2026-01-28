import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const [wishlists, setWishlists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select("*, listings(*)");

      if (error) throw error;

      // Group by something or just show list? Design expects "Folders".
      // For now, I'll just map each wishlist item as a "folder" or list item.
      // The current UI shows "Bedroom" etc.
      // I'll just map them to cards.

      // Let's adapt the UI slightly to show listings directly since "Wishlist" structure usually implies user created lists.
      // But my schema is simple (user_id, listing_id).
      // So I will just display the listings found in wishlist.

      setWishlists(data || []);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWishlists();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Green Header Background */}
      <View style={[styles.greenHeader, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Card - Overlaps Header */}
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
          <Text style={styles.screenTitle}>Wishlists</Text>

          {loading ? (
            <Text>Loading...</Text>
          ) : wishlists.length === 0 ? (
            <Text>No items in wishlist</Text>
          ) : (
            wishlists.map((item) => {
              const listing = item.listings;
              if (!listing) return null;

              return (
                <View key={item.id} style={styles.wishlistFolder}>
                  <View style={styles.gridContainer}>
                    <Image
                      source={{ uri: listing.image_urls?.[0] }}
                      style={[styles.gridImage, { width: "100%" }]}
                    />
                  </View>
                  <Text style={styles.folderTitle}>{listing.title}</Text>
                  <Text style={styles.folderSubtitle}>{listing.location}</Text>
                </View>
              );
            })
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
    paddingHorizontal: 20,
    // paddingTop handled dynamically
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  contentCard: {
    flex: 1,
    marginTop: -80,
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
  wishlistFolder: {
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 4,
  },
  gridImage: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: "4%",
  },
  folderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  folderSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
});
