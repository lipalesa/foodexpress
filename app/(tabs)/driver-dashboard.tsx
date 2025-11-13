import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Car, DollarSign, MapPin, Clock, Star, Power, Navigation, Bell } from 'lucide-react-native';
import { mockDriver } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function DriverDashboardScreen() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(mockDriver.isOnline);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: mockDriver.photo }} style={styles.driverPhoto} />
          <View style={styles.driverText}>
            <Text style={styles.driverName}>{user?.name || mockDriver.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFA500" fill="#FFA500" />
              <Text style={styles.ratingText}>{mockDriver.rating}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Online/Offline Toggle */}
        <View style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>You're {isOnline ? 'Online' : 'Offline'}</Text>
            <Text style={styles.statusSubtitle}>
              {isOnline ? 'Ready to receive delivery requests' : 'Go online to start earning'}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.toggleButton, isOnline && styles.toggleButtonActive]}
            onPress={toggleOnlineStatus}
            activeOpacity={0.8}
          >
            <Power size={24} color={isOnline ? "#ffffff" : "#64748B"} />
          </TouchableOpacity>
        </View>

        {/* Earnings Overview */}
        <View style={styles.earningsCard}>
          <Text style={styles.cardTitle}>Today's Earnings</Text>
          
          <View style={styles.earningsGrid}>
            <View style={styles.earningsStat}>
              <View style={styles.earningsIconContainer}>
                <DollarSign size={20} color="#10B981" />
              </View>
              <Text style={styles.earningsAmount}>${mockDriver.earnings.today.toFixed(2)}</Text>
              <Text style={styles.earningsLabel}>Total Earned</Text>
            </View>
            
            <View style={styles.earningsStat}>
              <View style={styles.earningsIconContainer}>
                <Car size={20} color="#3B82F6" />
              </View>
              <Text style={styles.earningsAmount}>{mockDriver.earnings.trips}</Text>
              <Text style={styles.earningsLabel}>Trips Completed</Text>
            </View>
            
            <View style={styles.earningsStat}>
              <View style={styles.earningsIconContainer}>
                <Clock size={20} color="#F59E0B" />
              </View>
              <Text style={styles.earningsAmount}>7.5 hrs</Text>
              <Text style={styles.earningsLabel}>Online Time</Text>
            </View>
          </View>

          <View style={styles.weeklyEarnings}>
            <Text style={styles.weeklyText}>
              This week: <Text style={styles.weeklyAmount}>${mockDriver.earnings.week.toFixed(2)}</Text>
            </Text>
          </View>
        </View>

        {/* Current Trip/Available Trips */}
        <View style={styles.tripsCard}>
          <Text style={styles.cardTitle}>
            {isOnline ? 'Available Trips' : 'Go Online to See Trips'}
          </Text>
          
          {isOnline ? (
            <View style={styles.availableTrips}>
              <View style={styles.tripItem}>
                <View style={styles.tripInfo}>
                  <Text style={styles.tripRestaurant}>Bella Napoli</Text>
                  <Text style={styles.tripAddress}>123 Main St → 456 Oak Ave</Text>
                  <View style={styles.tripDetails}>
                    <View style={styles.tripDetail}>
                      <MapPin size={14} color="#64748B" />
                      <Text style={styles.tripDetailText}>2.1 mi</Text>
                    </View>
                    <View style={styles.tripDetail}>
                      <Clock size={14} color="#64748B" />
                      <Text style={styles.tripDetailText}>12 min</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.tripActions}>
                  <Text style={styles.tripEarning}>$8.50</Text>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.tripItem}>
                <View style={styles.tripInfo}>
                  <Text style={styles.tripRestaurant}>Tokyo Sushi Bar</Text>
                  <Text style={styles.tripAddress}>789 Market St → 321 Pine St</Text>
                  <View style={styles.tripDetails}>
                    <View style={styles.tripDetail}>
                      <MapPin size={14} color="#64748B" />
                      <Text style={styles.tripDetailText}>1.8 mi</Text>
                    </View>
                    <View style={styles.tripDetail}>
                      <Clock size={14} color="#64748B" />
                      <Text style={styles.tripDetailText}>9 min</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.tripActions}>
                  <Text style={styles.tripEarning}>$12.25</Text>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.offlineState}>
              <View style={styles.offlineIcon}>
                <Car size={48} color="#CBD5E1" />
              </View>
              <Text style={styles.offlineTitle}>You're offline</Text>
              <Text style={styles.offlineDescription}>
                Go online to start receiving delivery requests and earning money
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Navigation size={20} color="#3B82F6" />
              <Text style={styles.actionButtonText}>Navigation</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <DollarSign size={20} color="#10B981" />
              <Text style={styles.actionButtonText}>Earnings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Car size={20} color="#8B5CF6" />
              <Text style={styles.actionButtonText}>Vehicle</Text>
            </TouchableOpacity>
          </View>
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
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  driverText: {
    marginLeft: 12,
  },
  driverName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  toggleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  toggleButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  earningsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  earningsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  earningsStat: {
    alignItems: 'center',
    flex: 1,
  },
  earningsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  earningsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    textAlign: 'center',
  },
  weeklyEarnings: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  weeklyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  weeklyAmount: {
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  tripsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  availableTrips: {
    gap: 12,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tripInfo: {
    flex: 1,
  },
  tripRestaurant: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  tripAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  tripDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripDetailText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  tripActions: {
    alignItems: 'flex-end',
  },
  tripEarning: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 8,
  },
  acceptButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  offlineState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  offlineIcon: {
    marginBottom: 16,
  },
  offlineTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#475569',
    marginBottom: 8,
  },
  offlineDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
  actionsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginTop: 8,
  },
  bottomSpacer: {
    height: 32,
  },
});