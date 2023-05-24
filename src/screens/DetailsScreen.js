import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';

const DetailsScreen = ({ route }) => {
  const { id } = route.params;
  const { users } = useSelector((state) => state);
  const user = users.find((user) => user.id === id);

  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default DetailsScreen;
