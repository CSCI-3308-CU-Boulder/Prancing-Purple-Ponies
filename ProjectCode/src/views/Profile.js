import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Button, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, Text, Image } from 'react-native'
import { ListItem, Avatar, ButtonGroup, Divider } from "react-native-elements";
import EditProfile from "./EditProfile";
import {currentUser, updateCurrentUser} from "../utility/database";
import MainFeed from "./MainFeed";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigate;
  }
  state = {
    email: '', username: '', password: '', confirm_password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  active = () =>
  {
    updateCurrentUser({test: "test"})
    // alert("Navigate to Active RSVPs")
  }
  past = () =>
  {
    // alert("Navigate to Past RSVPs")
  }
  myEvents = () =>
  {
    // alert("Navigate to My Events")
  }

  render() {

    let userData = currentUser.data();

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.navigate.to(MainFeed)}>
          <View style={{flexDirection: "row"}}>
            <Image style={{width: 20, height: 20, margin: 10}} source={require("../../assets/images/back.png")}/>
            <Text style={{marginTop: 10}}>Back to feed</Text>
          </View>
        </TouchableOpacity>
        <ListItem
          //Component={TouchableHighlight}
          //containerStyle={styles.container}
          disabledStyle={{ opacity: 0.5 }}
          //onLongPress={() => console.log("onLongPress()")}
          //onPress={() => console.log("onLongPress()")}
          pad={30}
          //style={styles.container}
        >
        <Avatar
            containerStyle={{borderColor: "#20232a", borderWidth: 2, width: 110, height: 110}}
            rounded
            showAccessory
            size="xlarge"
            source={{uri: userData.image}}
        >
        </Avatar>
        <View style={styles.column}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.majorSport}>Major: {userData.major}</Text>
          <Text style={styles.majorSport}>Favorite Sport: {userData.sport}</Text>
        </View>
        </ListItem>
        <TouchableOpacity onPress={() => this.navigate.to(EditProfile)}>
          <Text style={styles.editProfileButton}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity onPress={this.active}>
            <Text style={styles.button}>Active RSVPs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.past}>
            <Text style={styles.button}>Past RSVPs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.myEvents}>
            <Text style={styles.button}>My Events</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{ width: "200%", marginTop: 10 }} />

        {/*<View style={styles.footer}>*/}

        {/*  <View style={{flexDirection: 'row'}}>*/}
        {/*    <Image style={styles.footerImg} source={require('../../assets/images/navbar_court_button.png')} />*/}
        {/*    <TouchableOpacity*/}
        {/*        onPress={() => this.navigate.to(Profile)}>*/}
        {/*      <Image style={styles.footerImg} source={require('../../assets/images/navbar_profile_button.png')} />*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </View>
    )
  }
}

export default function Profile(navigate) {
  return <ProfilePage navigate={navigate}/>
}

const styles = StyleSheet.create({
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
  container: {
    // flex: 1,
    // alignItems: 'center',
    //flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
    width: "65%"
    //marginBottom: 30
  },
  row: {
    flexDirection: 'row',
    marginTop: 60,
    // justifyContent: 'space-evenly'
    //marginBottom: 30
  },
  button: {
    color: '#CFB87C',
    width: '100%',
    height: 20,
    //justifyContent: 'space-evenly'
    marginLeft: 20,
    marginRight: 20
  },
  editProfileButton: {
    backgroundColor: '#CFB87C',
    color: 'black',
    borderRadius: 15,
    textAlign: 'center',
    fontSize:  15,
    width: 120,
    padding: 5,
    marginLeft: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#20232a",
    borderWidth: 2 
  },
  column: {
    flexDirection : 'column'
  },
  name: {
    fontSize: 30,
    fontWeight: "bold"
  },
  majorSport: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10
  }
})

