import React, { useState, useEffect } from 'react';
import { Alert, Image, View, Platform, TextInput, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { render } from 'react-dom';
import {currentUser, updateCurrentUser} from "../utility/database";
import Profile from "./Profile";


const image1 = {uri: "https://ih1.redbubble.net/image.1220742639.9615/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image2 = {uri: "https://ih1.redbubble.net/image.594857806.8866/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image3 = {uri: "https://ih1.redbubble.net/image.670564412.2039/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image4 = {uri: "https://ih1.redbubble.net/image.672188677.8427/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image5 = {uri: "https://i.pinimg.com/474x/ee/d9/10/eed9106bd6077a92afd326edefd8d50b.jpg"}
const image6 = {uri: "https://ih1.redbubble.net/image.1118591247.2373/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image7 = {uri: "https://ih1.redbubble.net/image.503497998.4429/aps,504x498,small,transparent-pad,600x600,f8f8f8.u3.jpg"}
const image8 = {uri: "https://ih1.redbubble.net/image.594856339.8826/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image9 = {uri: "https://ih1.redbubble.net/image.1233654268.6059/st,small,507x507-pad,600x600,f8f8f8.jpg"}

function displayErrorMessage(error){
    Alert.alert(error);
}

class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigate;
  }

  state = {
    name: currentUser.data().name, major: currentUser.data().major, sport: currentUser.data().sport,
    image: currentUser.data().image,
    submitting: false
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  select = (image) =>
  {
    this.setState({image: image.uri})
  }

  getImageStyle(image) {
    if (image.uri === this.state.image) {
      return styles.chosenImage
    } else {
      return styles.image
    }
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

  changeProfile(component){
    if (component.state.submitting) {
      return;
    }

    component.setState({submitting: true})
    const { name, major, sport, image } = component.state;

    if (component.checkInput(name, major, sport)){
      updateCurrentUser({
        name: name,
        major: major,
        sport: sport,
        image: image
      }, () => {
        component.navigate.to(Profile);
      });
    }

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.select(image1)}>
            <Image source={image1} style={this.getImageStyle(image1)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.select(image2)}>
            <Image source={image2} style={this.getImageStyle(image2)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.select(image3)}>
            <Image source={image3} style={this.getImageStyle(image3)} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.select(image4)}>
            <Image source={image4} style={this.getImageStyle(image4)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.select(image5)}>
            <Image source={image5} style={this.getImageStyle(image5)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.select(image6)}>
            <Image source={image6} style={this.getImageStyle(image6)} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => this.select(image7)}>
            <Image source={image7} style={this.getImageStyle(image7)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.select(image8)}>
            <Image source={image8} style={this.getImageStyle(image8)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.select(image9)}>
            <Image source={image9} style={this.getImageStyle(image9)} />
          </TouchableOpacity>
        </View>
        <TextInput 
            style={styles.firstInput}
            placeholder='Name'
            defaultValue={this.getSavedData(currentUser.data(), 'name')}
            autoCapitalize="none"
            placeholderTextColor='#ABABAB'
            onChangeText={val => this.onChangeText('name', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Major'
            defaultValue={this.getSavedData(currentUser.data(), 'major')}
            autoCapitalize="none"
            placeholderTextColor='#ABABAB'
            onChangeText={val => this.onChangeText('major', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Favorite Sport'
            defaultValue={this.getSavedData(currentUser.data(), 'sport')}
            autoCapitalize="none"
            placeholderTextColor='#ABABAB'
            onChangeText={val => this.onChangeText('sport', val)}
          />
          <TouchableOpacity onPress={() => this.changeProfile(this)}>
            <Text style={styles.submit}>{this.state.submitting ? "Submitting..." : "Submit"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{justifyContent: "center", marginTop: 20}}
                            onPress={() => this.navigate.to(Profile)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          
      </View>
    )
  }
}

export default function EditProfile(navigate) {
  return <EditProfilePage navigate={navigate}/>
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#E5E5E5',
    margin: 5,
    padding: 8,
    color: '#ABABAB',
    borderRadius: 15,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },
  firstInput: {
    width: 350,
    height: 55,
    backgroundColor: '#E5E5E5',
    margin: 5,
    padding: 8,
    color: '#ABABAB',
    borderRadius: 15,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 25
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  caption: {
    fontStyle: 'italic',
    fontSize: 10,
    marginTop: 15
  },
  image: {
    width: 85, 
    height: 85, 
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10
  },
  chosenImage: {
    width: 85,
    height: 85,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#CFB87C',
    borderWidth: 2
  },
  row: {
    flexDirection: 'row',
    //marginTop: 100,
    marginBottom: 5
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
  submit: {
    backgroundColor: '#CFB87C',
    color: 'black',
    width: 350,
    height: 55,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    //fontStyle: 'italic',
    padding: "3%",
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
