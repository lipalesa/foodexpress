import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, Star, Clock, Truck, Heart, Share } from 'lucide-react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { mockRestaurants } from '@/data/mockData';
import MenuItemCard from '@/components/MenuItemCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const restaurant = mockRestaurants.find(r => r.id === id);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Restaurant not found</Text>
      </SafeAreaView>
    );
  }

  const categories = ['All', ...restaurant.categories];
  const filteredMenu = selectedCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={20} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Image */}
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />

        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFA500" fill="#FFA500" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
          </View>

          <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>

          <View style={styles.restaurantStats}>
            <View style={styles.statItem}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.statText}>{restaurant.deliveryTime}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Truck size={16} color="#64748B" />
              <Text style={styles.statText}>
                {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee} delivery`}
              </Text>
            </View>
          </View>

          <Text style={styles.minimumOrder}>
            Minimum order: ${restaurant.minimumOrder}
          </Text>
        </View>

        {/* Menu Categories */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>
            {selectedCategory === 'All' ? 'Menu' : selectedCategory}
          </Text>
          
          {filteredMenu.map(item => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              restaurantId={restaurant.id}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  restaurantImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  restaurantInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 8,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  cuisineText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 16,
  },
  restaurantStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  minimumOrder: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  menuSection: {
    marginTop: 8,
  },
  menuTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  bottomSpacer: {
    height: 100,
  },
});