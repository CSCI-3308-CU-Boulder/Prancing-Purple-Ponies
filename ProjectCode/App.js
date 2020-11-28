import React, {useEffect} from 'react';
import {Image, LogBox, Platform, StyleSheet, View} from 'react-native';
import Async from 'react-async';
import StartPage from "./src/views/StartPage";
import MainFeed from "./src/views/MainFeed";
import Navigation from "./src/utility/navigation";
import {currentUser} from "./src/utility/database";
import * as ImagePicker from "expo-image-picker";


const logo = {uri: "https://i.pinimg.com/474x/ee/d9/10/eed9106bd6077a92afd326edefd8d50b.jpg"};
LogBox.ignoreLogs(["Setting a timer", "Require cycle", "componentWillReceiveProps"]);


async function getInitialScreen() {
    await new Promise(r => setTimeout(r, 2000));
    if (currentUser) {
        // If the user is logged in, display the main feed straight away
        return <Navigation startOn={MainFeed}/>;
    } else {
        // If the user is not logged in, display the start page
        return <Navigation startOn={StartPage}/>;
    }
}


export default function App() {

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    return (
        <Async promiseFn={getInitialScreen}>
            <Async.Loading>
                {/* Display the logo while the app figures out if the user is logged in. */}
                <View style={styles.container}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode="contain"
                    >
                    </Image>
                </View>
            </Async.Loading>
            <Async.Resolved>
                {/* Display the view returned by the getInitialScreen function. */}
                {view => (
                    view
                )}
            </Async.Resolved>
        </Async>
    )
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
    }
});