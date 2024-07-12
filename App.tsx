
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

function App(): React.JSX.Element {
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
