import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Button, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, Text, Image } from 'react-native'
import { ListItem, Avatar, ButtonGroup, Divider, Accessory } from "react-native-elements";

const image = {uri: "https://i.pinimg.com/474x/ee/d9/10/eed9106bd6077a92afd326edefd8d50b.jpg"}
const name = 'Welcome to Sko Play'
const major = ''
const favSport = ''

export default class Profile extends React.Component {
  state = {
    email: '', username: '', password: '', confirm_password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  active = () =>
  {
    alert("Navigate to Active RSVPs")
  }
  past = () =>
  {
    alert("Navigate to Past RSVPs")
  }
  myEvents = () =>
  {
    alert("Navigate to My Events")
  }

  render() {
    return (
      <View style={styles.container}>
        <ListItem
          //Component={TouchableHighlight}
          //containerStyle={styles.container}
          disabledStyle={{ opacity: 0.5 }}
          //onLongPress={() => console.log("onLongPress()")}
          //onPress={() => console.log("onLongPress()")}
          pad={30}
          //style={styles.container}
        >
        <View style={styles.column}>
          <Text style={styles.name}>Nathan Straub</Text>
          <Text style={styles.majorSport}>Major:</Text>
          <Text style={styles.majorSport}>Favorite Sport:</Text>
        </View>
        <Avatar
          containerStyle={{borderColor: "#20232a", borderWidth: 2}}
          onPress={() => alert("Navigate to Edit Profile")}
          rounded
          showAccessory
          size="xlarge"
          source={image}
        > 
        <Accessory/>
        </Avatar>
        </ListItem>
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
        <Divider style={{ width: "80%", margin: 20 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //flexDirection: 'row',
    //justifyContent: 'space-evenly',
    marginTop: 100,
    //marginBottom: 30
  },
  row: {
    flexDirection: 'row',
    marginTop: 100,
    //marginBottom: 30
  },
  button: {
    color: '#CFB87C',
    width: '100%',
    height: 20,
    //justifyContent: 'space-evenly'
    marginLeft: 25,
    marginRight: 25
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
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "bold"
  },
  majorSport: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10
  }
})

