import React, {Component} from 'react';
import { LogBox } from 'react-native';
import StartPage from "./src/views/StartPage";
import MainFeed from "./src/views/MainFeed";
import Navigation from "./src/utility/navigation";


LogBox.ignoreLogs(["Setting a timer", "Require cycle"]);


export default function App() {
    return <Navigation startOn={StartPage}/>;
}
