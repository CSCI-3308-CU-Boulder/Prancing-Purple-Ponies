import React, { Component } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { render } from 'react-dom';
import { uploadImage } from '../utility/database'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigate;
        this.state = {
            image: null
        }
    }


    setImage(image) {
        this.setState({image: image})
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            base64: true,
            aspect: [1, 1],
            quality: 0.3
        }).then((image) => {
            console.log("HERE!!")
            console.log(image)
            console.log("HERE!!")
            uploadImage(image);
        })

        console.log(result);

        if (result) {
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
                    placeholder='Name'
                    autoCapitalize="none"
                    placeholderTextColor='#ABABAB'
                    onChangeText={val => this.onChangeText('name', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Major'
                    autoCapitalize="none"
                    placeholderTextColor='#ABABAB'
                    onChangeText={val => this.onChangeText('major', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Favorite Sport'
                    autoCapitalize="none"
                    placeholderTextColor='#ABABAB'
                    onChangeText={val => this.onChangeText('favsport', val)}
                />
                <TouchableOpacity>
                    <Text style={styles.signup}>RSVP</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.footerImg} source={require('../../assets/images/navbar_court_button.png')} />
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