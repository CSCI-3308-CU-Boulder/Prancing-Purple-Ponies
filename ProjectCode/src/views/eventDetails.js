import React, {Component} from 'react';
import Async from 'react-async';
import {Text, View, Image, FlatList, TouchableOpacity, Modal, Button} from 'react-native';
import {forEachEntry, addEntry, currentUser, db} from "../utility/database";
import {globalStyles} from '../styles/global.js';

// import the external styles sheet
// import styles from "../styles/mainFeed"

let rsvpYesFormat = function(data) {
    // check if they've rsvp'd yes or maybe
    if(currentUserInRSVPYes(data) !== -1) {
        return (styles.rsvpButtons_Click_Yes)
    }
    else {
        return (styles.rsvpButtons_default)
    }
}


let rsvpMaybeFormat = function(data) {
    // check if they've rsvp'd yes or maybe
    if(currentUserInRSVPMaybe(data) !== -1) {
        return (styles.rsvpButtons_Click_Maybe)
    }
    else {
        return (styles.rsvpButtons_default)
    }
}


function currentUserInRSVPYes(event_data) {
    var userEmail = currentUser.data().email;
    var found = -1;
    var numYes = event_data.rsvp_yes.length;
    for(var i = 0; i < numYes; i++) {

        if(event_data.rsvp_yes[i].email === userEmail) {
            found = i;
            break;
        }
    }

    return found;
}


function currentUserInRSVPMaybe(event_data) {
    var userEmail = currentUser.data().email;
    var found = -1;
    var numYes = event_data.rsvp_maybe.length;
    for(var i = 0; i < numYes; i++) {

        if(event_data.rsvp_maybe[i].email === userEmail) {
            found = i;
            break;
        }
    }

    return found;
}


function deleteFromRSVPYes(event_data) {
    if (currentUserInRSVPYes(event_data) !== -1) {
        let userIndex = currentUserInRSVPYes(event_data);
        delete event_data.rsvp_yes.splice(userIndex, 1);
    }
    return event_data;
}


function deleteFromRSVPMaybe(event_data) {
    if (currentUserInRSVPMaybe(event_data) !== -1) {
        let userIndex = currentUserInRSVPMaybe(event_data);
        delete event_data.rsvp_maybe.splice(userIndex, 1);
    }
    return event_data;
}


function rsvp(rsvp_list, event_id) {
    db.collection("event").doc(event_id).get().then((doc) => {
        let data = doc.data();

        console.log(data);

        if (rsvp_list === "maybe") {
            // Add user to RSVP Maybe
            if (currentUserInRSVPMaybe(data) === -1) {
                data.rsvp_maybe.push({
                    email: currentUser.data().email,
                    reference: currentUser.ref
                });
            }

            data = deleteFromRSVPYes(data);

        } else {
            // Add user to RSVP Yes
            if (currentUserInRSVPYes(data) === -1) {
                data.rsvp_yes.push({
                    email: currentUser.data().email,
                    reference: currentUser.ref
                });
            }

            data = deleteFromRSVPMaybe(data);
        }

        console.log(data);

        db.collection("event").doc(event_id).set(data).then(() => {
            console.log("Success!");
        }).catch((error) => {
            console.log("Error adding data");
        })

    }).catch((error) => {
        console.log(error.message)
    })
}

var yesses = new Object();
var maybes = new Object();

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

// export a function to render the card
export default function Details(doc) {

    let data = doc.doc;

    var numYes = data.rsvp_yes.length;
    var numMaybe = data.rsvp_maybe.length;

    // store the names of the rsvps
    for(var i = 0; i < numYes; i++) {
        getFullNameYes(data.rsvp_yes[i].email);
    }
    for(var i = 0; i < numMaybe; i++) {
        getFullNameMaybe(data.rsvp_maybe[i].email);
    }

    renderItem = ({ item }) => {
      if (item.email != null) {
        return (
          <View>
          <Text>
            {item.email}
          </Text>
          </View>
        );
      }
    }


    // return the view
    return(
        <View style={globalStyles.container}>

            {/* hold info about time and place */}
            <View>

              <Text style={globalStyles.headerTitle}> {data.sport} </Text>

                {/* Location of event */}
                <View style={globalStyles.informationFields} >
                    <Image source={require('../../assets/images/event_location.png')} style={{marginRight: 5}}/>

                    <Text> {data.location} </Text>

                </View>

                {/* Time of the event */}
                <View style={globalStyles.informationFields}>
                    <Image source={require('../../assets/images/event_time.png')} style={{marginRight: 5}}/>

                    <Text> {data.time} </Text>

                </View>
            </View>

            {/* List of Yesses */}
            <View style={globalStyles.listContainer}>
            <View>
                <Text style={globalStyles.listSectionTitle}>Who's playing?</Text>
                <FlatList style={globalStyles.list}
                    data={data.rsvp_yes}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
            {/* List to hold Maybes */}
            <View>
                <Text style={globalStyles.listSectionTitle}>Maybe</Text>
                <FlatList style={globalStyles.list}
                    data={data.rsvp_maybe}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
            </View>
        </View>
    )
}
