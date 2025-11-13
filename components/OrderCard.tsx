import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, MapPin, User } from 'lucide-react-native';
import { Order } from '@/types';
import { router } from 'expo-router';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return '#F59E0B';
      case 'ready': return '#8B5CF6';
      case 'picked_up': return '#3B82F6';
      case 'on_the_way': return '#10B981';
      case 'delivered': return '#64748B';
      default: return '#64748B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for pickup';
      case 'picked_up': return 'Picked up';
      case 'on_the_way': return 'On the way';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const handlePress = () => {
    if (order.status === 'on_the_way' || order.status === 'picked_up') {
      router.push(`/order-tracking/${order.id}`);
    }
  };

  const isTrackable = order.status === 'on_the_way' || order.status === 'picked_up';

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={isTrackable ? 0.8 : 1}
      disabled={!isTrackable}
    >
      <View style={styles.header}>
        <Image source={{ uri: order.restaurant.image }} style={styles.restaurantImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
          <Text style={styles.orderTime}>
            {order.orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        {order.items.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            {item.quantity}x {item.menuItem.name}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <View style={styles.infoRow}>
            <MapPin size={14} color="#64748B" />
            <Text style={styles.addressText} numberOfLines={1}>
              {order.deliveryAddress}
            </Text>
          </View>
          {order.driver && (
            <View style={styles.infoRow}>
              <User size={14} color="#64748B" />
              <Text style={styles.driverText}>{order.driver.name}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.footerRight}>
          <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
          {isTrackable && (
            <Text style={styles.trackText}>Tap to track</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  restaurantImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  orderTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  itemsList: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLeft: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    flex: 1,
  },
  driverText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  trackText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    marginTop: 2,
  },
});