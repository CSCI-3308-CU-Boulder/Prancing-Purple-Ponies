import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { db, auth } from "./database";

/*
rsvpYesFormat = function(props) {
    // check if they've rsvp'd yes or maybe
    if(props.user == somethingelse) {
        return (styles.rsvpButtons_Click_Yes)
    }
    else {
        return (styles.rsvpButtons_default)
    }
}

rsvpMaybeFormat = function(props) {

    // check if they've rsvp'd yes or maybe
    if(props.user == somethingelse) {
        return (styles.rsvpButtons_Click_Maybe)
    }
    else {
        return (styles.rsvpButtons_default)
    }
}
*/


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

// rsvp_yes = function() {


// }

// rsvp_maybe = function() {
    

// }


function rsvp_yes(event_id) {
    db.collection("event").doc(event_id).get().then((doc) => {
        let data = doc.data();
        if (data.rsvp_yes === undefined) {
            data.rsvp_yes = [];
        }
        data.rsvp_yes.push("Add user id here");

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
                        <TouchableOpacity style={styles.rsvpButtons_Click_Yes} onPress={() => rsvp_yes(doc.id)}>
                            <Text >YES!</Text>
                        </TouchableOpacity>

                        {/* Displaying the number of Yes RSVP's */}
                        <View style={yesCountFormat(data)}>

                            <Text style={{fontWeight: 'bold'}}> {numYes} </Text>

                        </View>



                        {/* RSVP Maybe Button */}
                        <TouchableOpacity style={styles.rsvpButtons_default} onPress={() => rsvp_maybe()}>
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