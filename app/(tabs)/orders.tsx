import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import OrderCard from '@/components/OrderCard';
import { mockOrders } from '@/data/mockData';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeOrders = mockOrders.filter(order => 
    ['preparing', 'ready', 'picked_up', 'on_the_way'].includes(order.status)
  );
  
  const orderHistory = mockOrders.filter(order => 
    order.status === 'delivered'
  );

  const currentOrders = activeTab === 'active' ? activeOrders : orderHistory;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Clock size={16} color={activeTab === 'active' ? '#ffffff' : '#64748B'} />
            <Text style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText
            ]}>
              Active ({activeOrders.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <CheckCircle size={16} color={activeTab === 'history' ? '#ffffff' : '#64748B'} />
            <Text style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText
            ]}>
              History ({orderHistory.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentOrders.length > 0 ? (
          <>
            {currentOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            <View style={styles.bottomSpacer} />
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              {activeTab === 'active' ? (
                <Clock size={48} color="#CBD5E1" />
              ) : (
                <CheckCircle size={48} color="#CBD5E1" />
              )}
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'active' ? 'No active orders' : 'No order history'}
            </Text>
            <Text style={styles.emptyDescription}>
              {activeTab === 'active' 
                ? 'When you place an order, it will appear here'
                : 'Your completed orders will appear here'
              }
            </Text>
          </View>
        )}
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#10B981',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#475569',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});