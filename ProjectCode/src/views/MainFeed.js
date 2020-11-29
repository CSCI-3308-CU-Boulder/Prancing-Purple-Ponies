import React, {Component} from 'react';
import Async from 'react-async';
import {Text, View, Image, FlatList, TouchableOpacity, Modal, Button} from 'react-native';
import {forEachEntry, addEntry, currentUser} from "../utility/database";

// import the external styles sheet
import styles from "../styles/mainFeed"
// import the event function from events
import Event from '../utility/events'
import CreateEvent from "./createEvent";
import Details from "./eventDetails";


let my_events = [];

async function getEvents() {
    let data = [];

    console.log("EVENTS:");
    await forEachEntry("event", (event) => {
        event.key = data.length.toString();
        data.push(event);
        my_events.push(event.data());
        console.log("event here:");
        console.log(event.data());
    });

    // console.log("EVENTS:");
    // console.log(my_events);

    return data;
}


class MainFeed extends Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigate;
        this.state = {
            events: [],
            modalOpen: false,
            detailOpen: false,
            selectedEvent: null
        }
    }

    setModalOpen(visible) {
        this.setState({modalOpen: visible})
    }

    setDetailOpen(visible, item) {
        this.setState({detailOpen: visible});
        // console.log("hey here it is:");
        // console.log(item.data());
        this.setState({selectedEvent: item.data()});
    }

    addSport(meetingInfo) {
        // Write to firebase
        addEntry("event", {
            sport: meetingInfo.sport,
            location: meetingInfo.location,
            time: meetingInfo.time,
            rsvp_yes: [{email: currentUser.data().email, reference: currentUser.ref}],
            rsvp_maybe: []
        });
    };

    render() {
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
                                renderItem={({item, onTap}) => Event(item, ()=> this.setDetailOpen(true, item))}/>
                        )}

                    </Async.Resolved>
                    <Async.Rejected><Text>Error!</Text></Async.Rejected>
                </Async>

                <Modal visible = {this.state.detailOpen} animationType = 'slide'>
                    <View style={{alignItems: 'flex-start', marginVertical: 40}}>
                        <Button
                            onPress={()=> this.setDetailOpen(false)}
                            title="Close"
                            color="#841584"
                            accessibilityLabel="Close the detail view using this button"

                        />
                        <Details doc={this.state.selectedEvent}/>
                    </View>
                </Modal>

                <Modal visible = {this.state.modalOpen} animationType = 'slide'>
                    <View style = {styles.container}>
                        <Button
                            onPress={()=> this.setModalOpen(false)}
                            title="Close"
                            color="#841584"
                            accessibilityLabel="Close the event creater using this button"
                        />
                        <CreateEvent addSport={this.addSport} closeModal={() => this.setModalOpen(false)}/>
                    </View>
                </Modal>

                {/* Add event button */}
                <View style={styles.evenButton}>
                    <TouchableOpacity
                        onPress={() => this.setModalOpen(true)}>
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
        )
    }
}


export default function App(navigate) {
    return (
        <MainFeed navigate={navigate}/>
    );
}
