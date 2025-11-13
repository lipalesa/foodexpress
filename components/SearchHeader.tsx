import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, MapPin, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

interface SearchHeaderProps {
  location?: string;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
}

export default function SearchHeader({ 
  location = "123 Main St, San Francisco",
  onLocationPress,
  onNotificationPress
}: SearchHeaderProps) {
  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.locationContainer} onPress={onLocationPress}>
          <MapPin size={16} color="#10B981" />
          <Text style={styles.locationText} numberOfLines={1}>
            {location}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
          <Bell size={20} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress} activeOpacity={0.7}>
        <Search size={20} color="#64748B" />
        <Text style={styles.searchPlaceholder}>Search restaurants or dishes...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    flex: 1,
  },
  notificationButton: {
    padding: 8,
  },
  searchBar: {
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
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    flex: 1,
  },
});