import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Async from 'react-async';
import {Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {forEachEntry, addEntry, auth} from "../utility/database";
import ModalView from "./Modal";

// import the external styles sheet
import styles from "../styles/mainFeed"
// import the event function from events
import Event from '../utility/events'


async function getEvents() {
    let data = [];

    await forEachEntry("event", (event) => {
        event.key = data.length.toString();
        data.push(event);
    });

    return data;
}


export default function App(navigation) {
    return (
        <View style={styles.container}>
            {/* make a new view for the header of our app*/}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>What's Sko'n on?</Text>
            </View>

            <Async promiseFn={getEvents}>
                <Async.Loading><Text>Loading...</Text></Async.Loading>
                <Async.Resolved>
                    {events => (
                        <FlatList style={styles.list}
                                  data={events}
                                  renderItem={({item}) => Event(item)}/>
                    )}
                </Async.Resolved>
                <Async.Rejected><Text>Error!</Text></Async.Rejected>
            </Async>

            {/* Add event button */}
            <View style={styles.evenButton}>
                <TouchableOpacity
                    onPress={() => navigation.to(ModalView)}>
                    <Image source={require('../../assets/images/create_event_button.png')} />
                </TouchableOpacity>
            </View>

            {/* make a view for the foot */}
            <View style={styles.footer}>

                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.footerImg} source={require('../../assets/images/navbar_court_button.png')} />
                    <Image style={styles.footerImg} source={require('../../assets/images/navbar_profile_button.png')} />
                </View>
            </View>
            {/* <StatusBar style="auto" /> */}
        </View>
    );
}
