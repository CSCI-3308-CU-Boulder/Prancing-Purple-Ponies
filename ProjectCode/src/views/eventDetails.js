import React, {Component} from 'react';
import Async from 'react-async';
import {Text, View, Image, FlatList, TouchableOpacity, Modal, Button} from 'react-native';
import {forEachEntry, addEntry, currentUser, db} from "../utility/database";
import {globalStyles} from '../styles/global.js';
import { Avatar } from "react-native-elements";


var yesses = {};
var maybes = {};

function getFullNameYes(email) {
  db.collection("user").where("email", "==", email)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var name = doc.data().name;
            yesses[email] = name;
            return name;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function getFullNameMaybe(email) {
  db.collection("user").where("email", "==", email)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var name = doc.data().name;
            maybes[email] = name;
            return name;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function renderParticipant({ item: participant }) {
    if (participant.email != null) {
        return (
            <View style={{flexDirection: "row", marginTop: 3}}>
                <Avatar
                containerStyle={{width: 30, height: 30}}
                rounded
                size="small"
                source={{uri: participant.image}}>
                </Avatar>
                <Text style={{marginTop: 4, marginLeft: 10}}>
                    {participant.name}
                </Text>
            </View>
        );
    }
}

async function getParticipantData(rsvp_list) {
    let participants = [];
    for (let i=0; i<rsvp_list.length; i++) {
        await rsvp_list[i].reference.get().then((user) => {
            let userData = user.data();
            userData.key = i;
            participants.push(userData);
        })
    }
    return participants;
}

// export a function to render the card
export default function Details(props) {

    let data = props.doc.data();

    // return the view
    return(
        <View style={{padding: 20, width: '100%'}}>

          <Text style={globalStyles.headerTitle}>Pickup {data.sport}!</Text>

            {/* Location of event */}
            <View style={globalStyles.informationFields} >
                <Image source={require('../../assets/images/event_location.png')} style={{marginRight: 5}}/>
                <Text>
                    {data.location}
                </Text>
            </View>

            {/* Time of the event */}
            <View style={globalStyles.informationFields}>
                <Image source={require('../../assets/images/event_time.png')} style={{marginRight: 5}}/>
                <Text>
                    {data.date}
                </Text>
            </View>
            {/* List of Yesses */}
            <View style={globalStyles.listContainer}>
                <View>
                    <Text style={globalStyles.listSectionTitle}>Who's playing?</Text>
                    <Async promiseFn={async () => getParticipantData(data.rsvp_yes)}>
                        <Async.Loading><Text>Loading...</Text></Async.Loading>
                        <Async.Resolved>
                            {participants => (
                                <FlatList style={globalStyles.detailList}
                                          data={participants}
                                          renderItem={renderParticipant}/>
                            )}
                        </Async.Resolved>
                    </Async>
                </View>
                {/* List to hold Maybes */}
                <View>
                    <Text style={globalStyles.listSectionTitle}>Maybe</Text>
                    <Async promiseFn={() => getParticipantData(data.rsvp_maybe)}>
                        <Async.Loading><Text>Loading...</Text></Async.Loading>
                        <Async.Resolved>
                            {participants => (
                                <FlatList style={globalStyles.detailList}
                                          data={participants}
                                          renderItem={renderParticipant}/>
                            )}
                        </Async.Resolved>
                    </Async>
                </View>
            </View>
        </View>
    )
}
