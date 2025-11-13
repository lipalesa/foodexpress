import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import SearchHeader from '@/components/SearchHeader';
import CategoryFilter from '@/components/CategoryFilter';
import RestaurantCard from '@/components/RestaurantCard';
import { mockRestaurants, cuisineTypes } from '@/data/mockData';
import { Restaurant } from '@/types';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredRestaurants = mockRestaurants.filter(r => r.isPromoted);
  
  const filteredRestaurants = selectedCategory === 'All' 
    ? mockRestaurants 
    : mockRestaurants.filter(r => r.cuisine === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <CategoryFilter
          categories={cuisineTypes}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Featured Restaurants */}
        {featuredRestaurants.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
            >
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  variant="featured"
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Restaurants' : selectedCategory}
          </Text>
          
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              variant="default"
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  featuredScroll: {
    paddingHorizontal: 20,
    gap: 0,
  },
  bottomSpacer: {
    height: 32,
  },
});