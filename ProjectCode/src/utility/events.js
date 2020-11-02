import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';


let event_id = 0;

// export a function to render the card
export default function Event(data) {
    event_id++;
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

                    {/* RSVP YES and Maybe Buttons */}
                    <View style={{flexDirection: 'row'}}>

                    {/* RSVP Yes button */}
                    <TouchableOpacity style={styles.rsvpButtons_Click_Yes}>
                        <Text>YES!</Text>
                    </TouchableOpacity>

                    {/* RSVP Maybe Button */}
                    <TouchableOpacity style={styles.rsvpButtons_default}>
                        <Text>Maybe</Text>
                    </TouchableOpacity>

                    </View>
                    {/* View to Hold counts of Yesses and  */}

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
        width: "95%",
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        borderBottomEndRadius: 5,

    },
    // default styling of the buttons when they haven't been clicked
    rsvpButtons_default: {
        width: '50%',
        margin: 5,
        padding: 5,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        alignItems: 'center',
    },
    // styling for when yes is clicked
    rsvpButtons_Click_Yes: {
        width: '50%',
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
        width: '50%',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',

        // When clicked
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#fafcc2',
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