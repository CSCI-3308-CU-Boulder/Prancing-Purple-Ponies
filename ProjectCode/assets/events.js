import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';



// export a function to render the card
export default function Event(info) {
    // return the view
    return(
        // create parent view
        <View style={styles.listItem}>
        
            {/* title text */}
            <Text style={styles.event_title}>
                Pickup {info.sport}!
            </Text>

            {/* Location of event */}
            <View style={styles.informationFields} > 
                <Image source={require('./images/event_location.png')} style={{marginRight: 5}}/>
                <Text>
                   {info.location} 
                </Text>
            </View>

            {/* Time of the event */}
            <View style={styles.informationFields}> 
                <Image source={require('./images/event_time.png')} style={{marginRight: 5}}/>
                <Text>
                   {info.time} 
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
    informationFields: {
        // put spacing 
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