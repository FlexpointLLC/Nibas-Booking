export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string | null;
          end_date: string;
          id: string;
          listing_id: string | null;
          start_date: string;
          status: string | null;
          total_price: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          end_date: string;
          id?: string;
          listing_id?: string | null;
          start_date: string;
          status?: string | null;
          total_price: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          end_date?: string;
          id?: string;
          listing_id?: string | null;
          start_date?: string;
          status?: string | null;
          total_price?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_listing_id_fkey";
            columns: ["listing_id"];
            isOneToOne: false;
            referencedRelation: "listings";
            referencedColumns: ["id"];
          },
        ];
      };
      listings: {
        Row: {
          bathrooms: number | null;
          bedrooms: number | null;
          beds: number | null;
          category: string;
          created_at: string | null;
          currency: string | null;
          description: string | null;
          features: string[] | null;
          host_id: string | null;
          id: string;
          image_urls: string[];
          latitude: number | null;
          location: string;
          longitude: number | null;
          max_guests: number | null;
          price_per_night: number;
          rating: number | null;
          review_count: number | null;
          title: string;
        };
        Insert: {
          bathrooms?: number | null;
          bedrooms?: number | null;
          beds?: number | null;
          category: string;
          created_at?: string | null;
          currency?: string | null;
          description?: string | null;
          features?: string[] | null;
          host_id?: string | null;
          id?: string;
          image_urls: string[];
          latitude?: number | null;
          location: string;
          longitude?: number | null;
          max_guests?: number | null;
          price_per_night: number;
          rating?: number | null;
          review_count?: number | null;
          title: string;
        };
        Update: {
          bathrooms?: number | null;
          bedrooms?: number | null;
          beds?: number | null;
          category?: string;
          created_at?: string | null;
          currency?: string | null;
          description?: string | null;
          features?: string[] | null;
          host_id?: string | null;
          id?: string;
          image_urls?: string[];
          latitude?: number | null;
          location?: string;
          longitude?: number | null;
          max_guests?: number | null;
          price_per_night?: number;
          rating?: number | null;
          review_count?: number | null;
          title?: string;
        };
        Relationships: [];
      };
      wishlists: {
        Row: {
          created_at: string | null;
          id: string;
          listing_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          listing_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          listing_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "wishlists_listing_id_fkey";
            columns: ["listing_id"];
            isOneToOne: false;
            referencedRelation: "listings";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
