import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, Clock, Truck } from 'lucide-react-native';
import { Restaurant } from '@/types';
import { router } from 'expo-router';

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: 'default' | 'featured';
}

export default function RestaurantCard({ restaurant, variant = 'default' }: RestaurantCardProps) {
  const handlePress = () => {
    router.push(`/restaurant/${restaurant.id}`);
  };

  const cardStyle = variant === 'featured' ? styles.featuredCard : styles.defaultCard;
  const imageStyle = variant === 'featured' ? styles.featuredImage : styles.defaultImage;

  return (
    <TouchableOpacity style={cardStyle} onPress={handlePress} activeOpacity={0.8}>
      {restaurant.isPromoted && (
        <View style={styles.promotedBadge}>
          <Text style={styles.promotedText}>Promoted</Text>
        </View>
      )}
      
      <Image source={{ uri: restaurant.image }} style={imageStyle} />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFA500" fill="#FFA500" />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.deliveryInfo}>
            <Clock size={14} color="#64748B" />
            <Text style={styles.deliveryText}>{restaurant.deliveryTime}</Text>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Truck size={14} color="#64748B" />
            <Text style={styles.deliveryText}>
              {restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  defaultImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featuredImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  promotedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  promotedText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  cuisineText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
});