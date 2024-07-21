
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './src/navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import notifee, { AndroidImportance } from '@notifee/react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    getPermission()
  }, [])
  const getPermission = async () => {
    await notifee.requestPermission();
  
        // Create notification channel for Android
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
  }
  return (
    <NavigationContainer>
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'white'}
        />
        <MainStack />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
