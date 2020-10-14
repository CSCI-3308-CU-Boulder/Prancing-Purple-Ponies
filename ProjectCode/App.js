import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity } from 'react-native';


// import the external styles sheet
import styles from "./assets/styles"
// import the event function from events
import Event from './assets/events.js'

const DATA = [
  {
    id: 'example1',
    sport: 'Basketball',
    location: 'Farrand Field',
    time: '10/20 at 4:30pm'

  },
  {
    id: 'example2',
    sport: 'Football',
    location: 'Boulder High School',
    time: '10/24 at 3:30pm'
  },
  {
    id: 'example3',
    sport: 'Soccer',
    location: 'Will Vill fields',
    time: '11/5 at 4:00pm'
  },
];


export default function App() {
  return (

    <View style={styles.container}>
      {/* make a new view for the header of our app*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>What's Sko'n on?</Text>
      </View>

      {/* list of all events stored in the data array */}
      <FlatList style={styles.list}
        data={DATA}
        renderItem={({item}) => Event(item)}
        />


      {/* Add event button */}
      <View style={styles.evenButton}>
        <TouchableOpacity>
          <Image source={require('./assets/images/create_event_button.png')} />
        </TouchableOpacity>
      </View>

      {/* make a view for the foot */}
      <View style={styles.footer}>

        <View style={{flexDirection: 'row'}}>
          <Image style={styles.footerImg} source={require('./assets/images/navbar_court_button.png')} />
          <Image style={styles.footerImg} source={require('./assets/images/navbar_profile_button.png')} />
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
