import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert,Modal } from 'react-native';
import CreateEvent from './createEvent'
import {forEachEntry, addEntry, auth} from "../utility/database";
import MainFeed from "./MainFeed";


class Page extends Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigate
    }

    state = {
        modalOpen: false
    };

    setModalOpen(visible) {
        this.setState({modalOpen: visible})
    }

    render() {
        const addSport = (meetingInfo) => {
            // Write to firebase
            addEntry("event", {
                sport: meetingInfo.sport,
                location: meetingInfo.location,
                time: meetingInfo.time
            });
            this.setModalOpen(false);
        };

        return (
            <View style={styles.container}>

                <Modal visible = {this.state.modalOpen} animationType = 'slide'>
                    <View style = {styles.container}>
                        <Button
                            onPress={()=> this.setModalOpen(false)}
                            title="Close"
                            color="#841584"
                            accessibilityLabel="Close the event creater using this button"
                        />
                        <CreateEvent addSport = {addSport}/>
                    </View>
                </Modal>

                <Text style={[styles.bigfont]}>Welcome to SKO Play! </Text>
                <StatusBar style="auto" />
                <Button
                    onPress={()=> this.setModalOpen(true)}
                    title="Add Event"
                    color="#841584"
                    style={styles.modalToggle}
                    accessibilityLabel="Add event using this button"
                />
                <Button
                    onPress={()=> this.navigate.to(MainFeed)}
                    title="Return to Feed"
                    color="#841584"
                    style={styles.modalToggle}
                    accessibilityLabel="Add event using this button"
                />

            </View>
        )
    }
}


export default function App(navigate) {
    return (
        <Page navigate={navigate}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    bigfont:{
        fontSize:30,
    },
});