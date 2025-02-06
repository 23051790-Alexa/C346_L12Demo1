import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, SafeAreaView} from 'react-native';
import {Barometer} from 'expo-sensors';

const styles = StyleSheet.create({
  container: {

  },
});

export default function App() {
  const [{pressure,relativeAltitude}, setData] = useState({
      pressure: 0,
      relativeAltitude: 'N/A',
  });

  useEffect(() => {
      Barometer.setUpdateInterval(100)
    const subscription = Barometer.addListener((data) => {
        setData({
            pressure: data.pressure,
            relativeAltitude: data.relativeAltitude ?? 'Not Available',
        });
    });
    return () => subscription.remove();
  }
  ,[]);

  return (
    <SafeAreaView>
      <StatusBar/>
      <Text>Pressure: {pressure}</Text>
      <Text>Relative Altitude: {relativeAltitude}</Text>
    </SafeAreaView>
  );
}


