import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage'

import { fetchProfileData } from '../store/actions/profiles'
import { fetchAttendanceData } from '../store/actions/attendance'

const StartupScreen = props => {

  const [IsLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setError(null);
    setIsLoading(true)
    try {
    await dispatch(fetchProfileData());
    await dispatch(fetchAttendanceData())
    } catch(err) {
      setError(err.message);
    }
    setIsLoading(false)
 }, [dispatch, setError, setIsLoading]);

 const tryLogin = useCallback(async () => {
  const userData = await AsyncStorage.getItem('userData');
  if (!userData) {
    props.navigation.navigate('Auth');
    return;
  }
  const transformedData = JSON.parse(userData);
  const { token, userId, expiryDate } = transformedData;
  const expirationDate = new Date(expiryDate);

  if (expirationDate <= new Date() || !token || !userId) {
    props.navigation.navigate('Auth');
    return;
  }
  props.navigation.navigate('Main');
})


  useEffect(() => {
    loadData();
    tryLogin();
  }, [loadData, tryLogin]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadData}
          color={'#000'}
        />
      </View>
    );
  }

if (IsLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color='#000' />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large"/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
}
});

export default StartupScreen;
