import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Search, Filter, X } from 'lucide-react-native';
import RestaurantCard from '@/components/RestaurantCard';
import { mockRestaurants, cuisineTypes, sortOptions } from '@/data/mockData';
import { Restaurant } from '@/types';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRestaurants = useMemo(() => {
    let results = mockRestaurants;

    // Apply search query
    if (searchQuery.trim()) {
      results = results.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.menu.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply cuisine filters
    if (selectedFilters.length > 0) {
      results = results.filter(restaurant =>
        selectedFilters.includes(restaurant.cuisine)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'delivery_time':
        results.sort((a, b) => {
          const timeA = parseInt(a.deliveryTime.split('-')[0]);
          const timeB = parseInt(b.deliveryTime.split('-')[0]);
          return timeA - timeB;
        });
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        results.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      case 'price_high':
        results.sort((a, b) => b.deliveryFee - a.deliveryFee);
        break;
      default:
        // Keep recommended order (promoted first, then by rating)
        results.sort((a, b) => {
          if (a.isPromoted && !b.isPromoted) return -1;
          if (!a.isPromoted && b.isPromoted) return 1;
          return b.rating - a.rating;
        });
    }

    return results;
  }, [searchQuery, selectedFilters, sortBy]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSortBy('recommended');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or dishes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            (selectedFilters.length > 0 || sortBy !== 'recommended') && styles.filterButtonActive
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={selectedFilters.length > 0 ? "#ffffff" : "#64748B"} />
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Sort by</Text>
            <View style={styles.filterOptions}>
              {sortOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    sortBy === option.value && styles.filterOptionActive
                  ]}
                  onPress={() => setSortBy(option.value)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      sortBy === option.value && styles.filterOptionTextActive
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Cuisine</Text>
            <View style={styles.filterOptions}>
              {cuisineTypes.slice(1).map(cuisine => (
                <TouchableOpacity
                  key={cuisine}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(cuisine) && styles.filterOptionActive
                  ]}
                  onPress={() => toggleFilter(cuisine)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.includes(cuisine) && styles.filterOptionTextActive
                    ]}
                  >
                    {cuisine}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear all filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results */}
      <ScrollView style={styles.results} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {filteredRestaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            variant="default"
          />
        ))}

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
  searchHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  filterButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filtersPanel: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterOptionActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  filterOptionTextActive: {
    color: '#ffffff',
  },
  clearFiltersButton: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  clearFiltersText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
  },
  results: {
    flex: 1,
  },
  resultsHeader: {
    padding: 20,
    paddingBottom: 8,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  bottomSpacer: {
    height: 32,
  },
});