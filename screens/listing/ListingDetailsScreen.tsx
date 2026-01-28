import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Share,
  Heart,
  Star,
  MapPin,
  DoorOpen,
  CheckCircle,
  Utensils,
  Wifi,
  Wind,
  Tv,
  Car,
  ChevronRight,
  ShieldCheck,
  Flag,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ListingDetailsScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  // 1. Get the passed listing data
  const { listing } = route.params || {};

  // 2. Define the rich mock data as default
  const defaultItem = {
    title: "Basila, Mohammadpur",
    subtitle: "Entire rental unit in Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: "5.0",
    reviews: 35,
    price: "6000",
    host: {
      name: "Tanjim",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      reviews: 35,
      rating: 5.0,
      experience: "8 Months hosting",
      responseRate: "100%",
      responseTime: "within an hour",
    },
    features: ["2 Guests", "1 Bed", "1 Bath", "1 Kitchen"],
    highlights: [
      {
        icon: DoorOpen,
        title: "Top 10% of homes",
        description:
          "This home is highly ranked based on ratings, reviews, and reliability.",
      },
      {
        icon: CheckCircle,
        title: "Self check-in",
        description: "Check yourself in through the lockbox.",
      },
      {
        icon: MapPin,
        title: "Outstanding location",
        description: "100% of guests gave 5-star rating.",
      },
    ],
    description_points: [
      "This cozy single-bed flat offers a perfect blend of comfort and convenience",
      "Thoughtfully designed with modern interiors, it features a spacious bedroom, a cozy living area, and a fully equipped kitchen",
      "The flat is tastefully furnished with elegant furniture and premium fittings, ensuring a luxurious touch",
      "Its prime location ensures easy access to shopping, dining, and transport hubs.",
    ],
    amenities: [
      { icon: Utensils, label: "Kitchen" },
      { icon: Wifi, label: "Wifi" },
      { icon: Tv, label: "TV" },
      { icon: Car, label: "Free parking on premises" },
      { icon: Wind, label: "AC - split-type ductless system" },
    ],
    reviews_sample: {
      author: "Sakib",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      tenure: "11 months on Nibas",
      date: "3 days ago",
      content:
        "Lorem ipsum dolor sit amet consectetur. Suspendisse ullamcorper tortor diam dictumst turpis donec fringilla.",
    },
  };

  // 3. Merge passed data with default data
  // listing provided: { id, title, price (string "X BDT..."), image }
  // we want to use listing.title, listing.image, and extract price.

  // Handle Price (string "600 BDT" or number 6000)
  let displayPrice = defaultItem.price;
  if (listing?.price !== undefined) {
    if (typeof listing.price === "number") {
      displayPrice = listing.price.toString();
    } else {
      displayPrice = listing.price.toString().includes(" ")
        ? listing.price.toString().split(" ")[0]
        : listing.price.toString();
    }
  }

  // Handle Image (single 'image' or 'images' array)
  let displayImage = defaultItem.image;
  if (
    listing?.images &&
    Array.isArray(listing.images) &&
    listing.images.length > 0
  ) {
    displayImage = listing.images[0];
  } else if (listing?.image) {
    displayImage = listing.image;
  }

  const item = {
    ...defaultItem,
    ...(listing || {}),
    price: displayPrice,
    image: displayImage,
    title: listing?.title || defaultItem.title,
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Sticky Footer */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.footerPrice}>{item.price} BDT</Text>
          </View>
          <Text style={styles.footerDate}>For 3 nights. Sep 3 - 6</Text>
          <View style={styles.freeCancelBadge}>
            <Text style={styles.freeCancelText}>✓ Free cancellation</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={[styles.imageContainer, { position: "relative" }]}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={[styles.headerActions, { top: insets.top + 10 }]}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={20} color="#000" />
            </TouchableOpacity>
            <View style={styles.rightActions}>
              <TouchableOpacity
                style={[styles.circleButton, { marginRight: 10 }]}
              >
                <Share size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleButton}>
                <Heart size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>1 / 27</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Title & Stats */}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuresScroll}
          >
            {item.features.map((feature, index) => (
              <View key={index} style={styles.featureChip}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Mini Stats (Top) */}
          <View style={styles.statsContainer}>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{item.rating}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={10} color="#FBBF24" fill="#FBBF24" />
                ))}
              </View>
            </View>
            <View style={styles.statsCard}>
              <Heart
                size={24}
                color="#000"
                fill="#000"
                style={{ marginBottom: 4 }}
              />
              <Text style={styles.statsLabel}>Most loved</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>{item.reviews}</Text>
              <Text
                style={[styles.statsLabel, { textDecorationLine: "underline" }]}
              >
                Reviews
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Host Summary Row */}
          <View style={styles.hostRow}>
            <Image
              source={{ uri: item.host.image }}
              style={styles.hostAvatar}
            />
            <View>
              <Text style={styles.hostName}>Hosted by {item.host.name}</Text>
              <Text style={styles.hostTenure}>{item.host.experience}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Highlights */}
          {item.highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <View key={index} style={styles.highlightRow}>
                <Icon size={24} color="#000" strokeWidth={1.5} />
                <View style={styles.highlightTextContainer}>
                  <Text style={styles.highlightTitle}>{highlight.title}</Text>
                  <Text style={styles.highlightDesc}>
                    {highlight.description}
                  </Text>
                </View>
              </View>
            );
          })}

          <View style={styles.divider} />

          {/* Description */}
          {item.description_points.map((point, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreLinkText}>View details</Text>
            <ChevronRight size={16} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", marginLeft: -20, paddingLeft: 20 }}
          >
            {[
              {
                title: "Bedroom",
                subtitle: "1 queen bed",
                image:
                  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                title: "Living Room",
                subtitle: "1 sofa bed",
                image:
                  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
            ].map((room, index) => (
              <View key={index} style={{ marginRight: 16, width: 160 }}>
                <Image source={{ uri: room.image }} style={styles.sleepImage} />
                <Text style={styles.sleepLabel}>{room.title}</Text>
                <Text style={styles.sleepSubtitle}>{room.subtitle}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.divider} />

          {/* Amenities */}
          <Text style={styles.sectionTitle}>This accommodation provides</Text>
          {item.amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <View key={index} style={styles.amenityRow}>
                <Icon size={24} color="#4B5563" />
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            );
          })}
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Show all amenities</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Where you'll be (Map) */}
          <Text style={styles.sectionTitle}>You'll find yourself in</Text>
          <Image
            source={{ uri: "https://mt.google.com/vt/lyrs=m&x=13&y=8&z=5" }}
            style={styles.mapImage}
          />
          <Text style={styles.locationTitle}>Basila, Dhaka, Bangladesh</Text>
          <Text style={styles.locationDesc}>
            Located on a quiet suburban street.
          </Text>
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreLinkText}>Show more</Text>
            <ChevronRight size={16} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Reviews Section */}
          <View style={styles.reviewsSection}>
            <Text style={styles.bigRating}>5.0</Text>
            <Text style={styles.mostLovedText}>Most loved</Text>
            <Text style={styles.reviewsSubtitle}>
              This property ranks among the highest-rated accommodations
              available.
            </Text>

            <View style={styles.starsRowCentered}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} color="#FBBF24" fill="#FBBF24" />
              ))}
              <Text style={styles.reviewDate}>{item.reviews_sample.date}</Text>
            </View>

            <Text style={styles.reviewContent}>
              {item.reviews_sample.content}
            </Text>
            <TouchableOpacity style={styles.showMoreLink}>
              <Text style={styles.showMoreLinkText}>Show more</Text>
            </TouchableOpacity>

            <View style={styles.reviewerRow}>
              <Image
                source={{ uri: item.reviews_sample.avatar }}
                style={styles.reviewerAvatar}
              />
              <View>
                <Text style={styles.reviewerName}>
                  {item.reviews_sample.author}
                </Text>
                <Text style={styles.reviewerTenure}>
                  {item.reviews_sample.tenure}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.outlineButton, { alignSelf: "stretch" }]}
            >
              <Text style={styles.outlineButtonText}>Show all reviews</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Meet your host */}
          <Text style={styles.sectionTitle}>Meet your host</Text>
          <View style={styles.hostCard}>
            <View style={styles.hostCardHeader}>
              <Image
                source={{ uri: item.host.image }}
                style={styles.hostCardAvatar}
              />
              <View>
                <Text style={styles.hostCardName}>{item.host.name}</Text>
                <Text style={styles.hostCardRole}>Host</Text>
              </View>
            </View>

            <View style={styles.hostStatsRow}>
              <View style={styles.hostStat}>
                <Text style={styles.hostStatValue}>{item.host.reviews}</Text>
                <Text style={styles.hostStatLabel}>Reviews</Text>
              </View>
              <View style={styles.hostStat}>
                <Text style={styles.hostStatValue}>{item.host.rating}</Text>
                <Text style={styles.hostStatLabel}>Rating</Text>
              </View>
              <View style={styles.hostStat}>
                <Text style={styles.hostStatValue}>8</Text>
                <Text style={styles.hostStatLabel}>Months hosting</Text>
              </View>
            </View>

            <View style={styles.hostDetails}>
              <Text style={styles.hostDetailLabel}>Host details</Text>
              <Text style={styles.hostDetailText}>
                Response rate: {item.host.responseRate}
              </Text>
              <Text style={styles.hostDetailText}>
                Responds {item.host.responseTime}
              </Text>
            </View>

            <TouchableOpacity style={styles.messageHostButton}>
              <Text style={styles.messageHostText}>Message host</Text>
            </TouchableOpacity>

            <View style={styles.securityNote}>
              <ShieldCheck
                size={16}
                color="#6B7280"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.securityNoteText}>
                To protect your payment, always use Nibas to send money and
                communicate with hosts.
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Rules & Regulations */}
          <Text style={styles.sectionTitle}>Rules & regulations</Text>
          <Text style={styles.ruleText}>Check-in after 12:00 PM</Text>
          <Text style={styles.ruleText}>Checkout before 11:00 AM</Text>
          <Text style={styles.ruleText}>2 guests maximum</Text>
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreLinkText}>Show more</Text>
            <ChevronRight size={16} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Cancellation Policy */}
          <Text style={styles.sectionTitle}>Cancellation policy</Text>
          <Text style={styles.ruleText}>
            Free cancellation before Sep 2. Cancel before check-in on Sep 3 for
            a partial refund.
          </Text>
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreLinkText}>Show more</Text>
            <ChevronRight size={16} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Security */}
          <Text style={styles.sectionTitle}>Security and premises</Text>
          <Text style={styles.ruleText}>Smoke alarm not reported</Text>
          <Text style={styles.ruleText}>
            Exterior security cameras on property
          </Text>
          <Text style={styles.ruleText}>Nearby river, lake, restaurant</Text>
          <TouchableOpacity style={styles.showMoreButton}>
            <Text style={styles.showMoreLinkText}>Show more</Text>
            <ChevronRight size={16} color="#000" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Report this listing */}
          <TouchableOpacity style={styles.reportRow}>
            <Flag size={20} color="#000" style={{ marginRight: 12 }} />
            <Text style={styles.reportText}>Report this listing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: { width: width, height: 300, backgroundColor: "#ddd" },
  image: { width: "100%", height: "100%" },
  headerActions: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  rightActions: { flexDirection: "row" },
  circleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageCounter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  imageCounterText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  content: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e121b",
    marginBottom: 4,
  },
  subtitle: { fontSize: 16, color: "#4B5563", marginBottom: 16 },
  featuresScroll: { flexDirection: "row", marginBottom: 24 },
  featureChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginRight: 8,
  },
  featureText: { fontSize: 14, color: "#374151", fontWeight: "500" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 16,
  },
  statsCard: { width: "33%", alignItems: "center", justifyContent: "center" },
  statsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0e121b",
    marginBottom: 2,
  },
  starsRow: { flexDirection: "row" },
  statsLabel: { fontSize: 11, color: "#4B5563" },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 24 },
  hostRow: { flexDirection: "row", alignItems: "center" },
  hostAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
  hostName: { fontSize: 16, fontWeight: "bold", color: "#0e121b" },
  hostTenure: { fontSize: 14, color: "#6B7280" },
  highlightRow: { flexDirection: "row", marginBottom: 20 },
  highlightTextContainer: { marginLeft: 16, flex: 1 },
  highlightTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0e121b",
    marginBottom: 4,
  },
  highlightDesc: { fontSize: 14, color: "#6B7280", lineHeight: 20 },
  bulletPoint: { flexDirection: "row", marginBottom: 12 },
  bulletDot: { fontSize: 16, marginRight: 10, color: "#000" },
  bulletText: { fontSize: 15, color: "#374151", lineHeight: 22, flex: 1 },
  showMoreButton: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  showMoreText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    textDecorationLine: "underline",
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0e121b",
    marginBottom: 16,
  },
  sleepImage: { width: "100%", height: 120, borderRadius: 12, marginBottom: 8 },
  sleepLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0e121b",
    marginBottom: 2,
  },
  sleepSubtitle: { fontSize: 12, color: "#4B5563" },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  amenityLabel: { fontSize: 16, color: "#374151", marginLeft: 16 },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  outlineButtonText: { fontSize: 16, fontWeight: "600", color: "#000" },
  locationTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  locationDesc: { fontSize: 14, color: "#4B5563", marginBottom: 8 },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#e1e1e1",
  },
  reviewsSection: { alignItems: "center" },
  bigRating: { fontSize: 48, fontWeight: "bold", color: "#0e121b" },
  mostLovedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0e121b",
    marginBottom: 8,
  },
  reviewsSubtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
  },
  starsRowCentered: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewDate: { fontSize: 12, color: "#6B7280", marginLeft: 8 },
  reviewContent: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 8,
  },
  showMoreLink: { marginBottom: 16, alignSelf: "flex-start" },
  showMoreLinkText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    textDecorationLine: "underline",
  },
  reviewerRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  reviewerName: { fontSize: 16, fontWeight: "600" },
  reviewerTenure: { fontSize: 12, color: "#6B7280" },
  hostCard: {
    backgroundColor: "#fff",
    borderRadius: 20, // Card-like appearance? Reference image shows it might be flat but with layout
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  hostCardHeader: { flexDirection: "row", marginBottom: 24 },
  hostCardAvatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  hostCardName: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  hostCardRole: { fontSize: 14, color: "#6B7280" },
  hostStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 24,
  },
  hostStat: { width: "30%" },
  hostStatValue: { fontSize: 18, fontWeight: "bold" },
  hostStatLabel: { fontSize: 10, color: "#4B5563", marginTop: 2 },
  hostDetails: { marginBottom: 24 },
  hostDetailLabel: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  hostDetailText: { fontSize: 14, color: "#374151", marginBottom: 4 },
  messageHostButton: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  messageHostText: { fontSize: 16, fontWeight: "600" },
  securityNote: { flexDirection: "row", alignItems: "flex-start" },
  securityNoteText: { fontSize: 11, color: "#6B7280", flex: 1, lineHeight: 14 },
  ruleText: { fontSize: 15, color: "#374151", marginBottom: 8 },
  reportRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  reportText: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    zIndex: 20,
  },
  footerPrice: { fontSize: 16, fontWeight: "bold", color: "#0e121b" },
  footerDate: { fontSize: 14, color: "#4B5563", marginTop: 2 },
  freeCancelBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  freeCancelText: { fontSize: 10, color: "#374151", fontWeight: "500" },
  reserveButton: {
    backgroundColor: "#2B8761",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  reserveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
