import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';

const image = {uri: "https://i.pinimg.com/474x/ee/d9/10/eed9106bd6077a92afd326edefd8d50b.jpg"};

export default class App extends React.Component {

    signupPressed = ()=> {
        alert("Completed Signup!")
        //navigation.navigate('SignUp')
    };

    loginPressed = ()=> {
        alert("Completed Login!")
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={image}
                    style={styles.logo}
                    resizeMode="contain"
                >
                </Image>
                <TouchableOpacity style={styles.rounded} onPress={this.loginPressed}>
                    <Text style={styles.login}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rounded} onPress={this.signupPressed}>
                    <Text style={styles.signup}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo:{
        width: 280,
        height: 300,
        borderRadius: 80
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup: {
        backgroundColor: '#CFB87C',
        color: 'black',
        width: 150,
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: "2%",
        fontSize:  25,
        marginTop: 50
    },
    login: {
        backgroundColor: '#CFB87C',
        color: 'black',
        width: 150,
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: "2%",
        fontSize:  25,
        marginTop: 100
    },
    rounded: {
        borderRadius: 25,
    }
});