import React, {Component} from 'react';
import Async from 'react-async';
import {Text, View, Image, FlatList, TouchableOpacity, Modal, Button} from 'react-native';
import {forEachEntry, addEntry, currentUser} from "../utility/database";

// import the external styles sheet
import styles from "../styles/mainFeed"

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


// export a function to render the card
export default function Details(doc) {

    let data = doc.data();
    var numYes = data.rsvp_yes.length;
    var numMaybe = data.rsvp_maybe.length;
    var yesses = [numYes];
    var maybes = [numMaybe];

    // store the names of the rsvps
    for(var i = 0; i < numYes; i++) {
        yesses[i] = data.rsvp_yes[i].reference;
    }
    for(var i = 0; i < numMaybe; i++) {
        maybes[i] = data.rsvp_maybe[i].reference;
    }


    // return the view
    return(
        <View style={styles.modalContainer}>

            {/* hold info about time and place */}
            <View style={styles.eventInfo}>

                {/* Location of event */}
                <View style={styles.informationFields} > 
                    <Image source={require('../../assets/images/event_location.png')} style={{marginRight: 5}}/>

                    <Text> {data.location} </Text>

                </View>

                {/* Time of the event */}
                <View style={styles.informationFields}> 
                    <Image source={require('../../assets/images/event_time.png')} style={{marginRight: 5}}/>
                    
                    <Text> {data.time} </Text>

                </View>
            </View>

            {/* Yes and Maybe Buttons */}
            <View style={styles.rsvpCont}>

                <TouchableOpacity style={rsvpYesFormat(data)} onPress={() => rsvp("yes", doc.id)}>
                    <Text >YES!</Text>
                </TouchableOpacity>

                {/* RSVP Maybe Button */}
                <TouchableOpacity style={rsvpMaybeFormat(data)} onPress={() => rsvp("maybe", doc.id)}>
                    <Text>Maybe</Text>
                </TouchableOpacity>

            </View>

            {/* List of Yesses */}
            <View>
                <Text style={"fontWeight: 'bold', fontSize: 20"}> YES </Text>

                <FlatList style={styles.list}
                    data={yesses}
                    renderItem={renderItem}
                />

            </View>
            {/* List to hold Maybes */}
            <View>
                <Text style={"fontWeight: 'bold', fontSize: 20"}> Maybe </Text>

                <FlatList style={styles.list}
                    data={maybes}
                    renderItem={renderItem}
                />


            </View>
        </View>
    )
}


// create the style sheet
const styles = StyleSheet.create({
    modalContainer: {
        width: '95%',
        height: '80%',

        // create shadow effect on cards
        shadowOffset:{  width: 15,  height: 15,  },
        shadowColor: 'black',
        shadowOpacity: 0.15,
        // add padding inside for text and margin between cards
        padding: 20,
        margin: 10,

        // make background white so shadow doesn't shine through
        backgroundColor: 'white',

        // create border around the events and round corners
        borderWidth: 2,
        borderColor: '#B2B2B2',
        borderRadius: 20,
    },
    eventInfo: {
        height: '15%',
        flexDirection: 'row',
    },
    // view holding the buttons and counts of yesses and maybes
    rsvpCont: {
        flexDirection: 'row',
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
        borderBottomEndRadius: 5,

    },
    // default styling of the buttons when they haven't been clicked
    rsvpButtons_default: {
        width: '40%',
        margin: 5,
        padding: 5,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        alignItems: 'center',
    },
    // styling for when yes is clicked
    rsvpButtons_Click_Yes: {
        width: '40%',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',

        // When clicked
        fontWeight: 'bold',
        backgroundColor: '#ccf6c8',
    },
    // styling for when maybe is clicked
    rsvpButtons_Click_Maybe: {
        // default styling
        width: '40%',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',

        // When clicked
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#fafcc2',
    },
});