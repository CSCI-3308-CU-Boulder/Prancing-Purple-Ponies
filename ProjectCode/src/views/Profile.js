import React, { useState, useEffect, Component } from 'react';
import {Button, Image, View, Platform, TextInput, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { render } from 'react-dom';
import {currentUser, updateCurrentUser} from '../utility/database';
import MainFeed from "./MainFeed";

//displays error message on screen
function displayErrorMessage(error){
    Alert.alert(error);
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigate;
        this.state = {
            image: null
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    };

    setImage(image) {
        this.setState({image: image})
    }

    checkInput(name, major, sport){

        // check name is not blank
        if (name === ''){
            displayErrorMessage("What's your name?");
            return false;
        }

        // check major isn't blank
        if (major === '') {
            displayErrorMessage("What's your major?");
            return false;
        }

        // check sport isn't blank
        if (sport === ''){
            displayErrorMessage("What's your favorite sport?");
            return false;
        }

        return true;
    }

    getSavedData(data, which){
        if (data === '' && which === 'name'){
            return 'Name';
        }
        if (data === '' && which === 'major'){
            return 'Major';
        }
        if (data === '' && which === 'sport'){
            return 'Favorite Sport';
        }
        if (which === 'name'){
            return data.name;
        }
        if (which === 'major'){
            return data.major;
        }
        if (which === 'sport'){
            return data.sport;
        }
    }

    //make functions
    //check out mainfeed.js for examples
    // make sure onTouch() is inside touchableopacity
    changeProfile = () =>
    {
       const { image, name, major, sport } = this.state;

        if (this.checkInput(name, major, sport)){
            updateCurrentUser({
                name: name,
                major: major,
                sport: sport
            });
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setImage(result.uri);
        }

    };
    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={this.pickImage} />
                {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 230, height: 250, borderRadius: 80 }} />}
                <TextInput
                    style={styles.input}
                    placeholder={this.getSavedData(currentUser.data(), 'name')}
                    autoCapitalize="none"
                    placeholderTextColor='#ABABAB'
                    onChangeText={val => this.onChangeText('name', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={this.getSavedData(currentUser.data(), 'major')}
                    autoCapitalize="none"
                    placeholderTextColor='#ABABAB'
                    onChangeText={val => this.onChangeText('major', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={this.getSavedData(currentUser.data(), 'sport')}
                    autoCapitalize="none"
                    placeholderTextColor='#ABABAB'
                    onChangeText={val => this.onChangeText('sport', val)}
                />
                <TouchableOpacity
                    onPress={() => this.changeProfile()}>
                    <Text style={styles.signup}>RSVP</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => this.navigate.to(MainFeed)}>
                            <Image style={styles.footerImg} source={require('../../assets/images/navbar_court_button.png')} />
                        </TouchableOpacity>
                        <Image style={styles.footerImg} source={require('../../assets/images/navbar_profile_button.png')} />
                    </View>
                </View>
            </View>
        );
    }
}


export default function ImagePickerExample(navigate) {
    // const [image, setImage] = useState(null);

    return (<Profile navigate={navigate}/>);
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#E5E5E5',
        margin: 10,
        padding: 8,
        color: '#ABABAB',
        borderRadius: 15,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        // position at bottom
        position: 'absolute',
        bottom: 0,
        // dimensions
        width: '100%',
        height: 90,

        // adding border to top and setting background color
        borderTopWidth: 2,
        borderColor: '#B2B2B2',
        backgroundColor: 'white',

        // alignment of contents
        alignItems: 'center',
        justifyContent: 'center',
    },
    signup: {
        backgroundColor: '#CFB87C',
        color: 'black',
        width: 350,
        height: 55,
        borderRadius: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: "2%",
        fontSize:  25,
        marginTop: '10%'
    },
    footerImg: {
        // position
        marginHorizontal: 65,
        marginBottom: 10,
        height: 40,
        resizeMode: 'stretch',
    },
    login: {
        marginTop: 25,
    }
})