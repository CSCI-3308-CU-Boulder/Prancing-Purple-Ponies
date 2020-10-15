import React from 'react';
import { LogBox } from 'react-native';
import MainFeed from "./src/views/MainFeed";
import StartPage from "./src/views/StartPage";
import Navigation from "./src/utility/navigation";


LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
    return (
        <Navigation startOn={StartPage}/>
    );
}
