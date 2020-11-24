import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {db, currentUser} from "./database";


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


// formatting for when event yes rsvp exceed 1 (which is the creator)
let yesCountFormat = function(data) {
    
    if(data.rsvp_yes.length > 1) {
        return (styles.countDisplay_yes);
    }
    else {
        return (styles.countDisplay);
    }
}

// formatting for when event maybe rsvp exceed 1 (which is the creator)
let maybeCountFormat = function(data) {
    
    if(data.rsvp_maybe.length > 1) {
        return (styles.countDisplay_maybe);
    }
    else {
        return (styles.countDisplay);
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
export default function Event(doc) {

    let data = doc.data();
    var numYes = data.rsvp_yes.length;
    var numMaybe = data.rsvp_maybe.length;

    // return the view
    return(
        // create parent view
        <View style={styles.listItem}>
        
            {/* title text */}
            <Text style={styles.event_title}>
                Pickup {data.sport}!
            </Text>

                {/* RSVP buttons and people  */}
                <View style={styles.rsvpCont}>

                    {/* RSVP YES and Maybe Buttons and counts */}
                    <View style={{flexDirection: 'row'}}>


                        {/* RSVP Yes button */}
                        <TouchableOpacity style={rsvpYesFormat(data)} onPress={() => rsvp("yes", doc.id)}>
                            <Text >YES!</Text>
                        </TouchableOpacity>

                        {/* Displaying the number of Yes RSVP's */}
                        <View style={yesCountFormat(data)}>

                            <Text style={{fontWeight: 'bold'}}> {numYes} </Text>

                        </View>



                        {/* RSVP Maybe Button */}
                        <TouchableOpacity style={rsvpMaybeFormat(data)} onPress={() => rsvp("maybe", doc.id)}>
                            <Text>Maybe</Text>
                        </TouchableOpacity>

                        {/* Displaying the number of Maybe RSVP's */}
                        <View style={maybeCountFormat(data)}>

                            <Text style={{fontWeight: 'bold'}}> {numMaybe} </Text>

                        </View>
                        

                    </View>
                    
                </View>

            {/* Location of event */}
            <View style={styles.informationFields} > 
                <Image source={require('../../assets/images/event_location.png')} style={{marginRight: 5}}/>
                <Text>
                   {data.location}
                </Text>
            </View>

            {/* Time of the event */}
            <View style={styles.informationFields}> 
                <Image source={require('../../assets/images/event_time.png')} style={{marginRight: 5}}/>
                <Text>
                   {data.time}
                </Text>
            </View>
            
        </View>
    )
}

// style sheet for events
const styles = StyleSheet.create({
    listItem: {
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
    // view holding the buttons and counts of yesses and maybes
    rsvpCont: {
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
    countDisplay: {
        width: '10%',
        marginRight: 10,
        marginLeft: 1,
        marginVertical: 5,
        padding: 5,
        
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#E5E5E5',


        alignItems: 'center',
        justifyContent: 'center',
    },
    countDisplay_yes: {
        width: '10%',
        marginRight: 10,
        marginLeft: 1,
        marginVertical: 5,
        padding: 5,
        
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#ccf6c8',


        alignItems: 'center',
        justifyContent: 'center',
    },
    countDisplay_maybe: {
        width: '10%',
        marginRight: 10,
        marginLeft: 1,
        marginVertical: 5,
        padding: 5,
        
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#fafcc2',


        alignItems: 'center',
        justifyContent: 'center',
    },
    informationFields: {
        // put spacing at very top
        paddingVertical: 5,

        // put the icon and information in one row
        flexDirection: 'row',
    },
    event_title: {
        // special styling for the title of each event
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 7,
    }
});