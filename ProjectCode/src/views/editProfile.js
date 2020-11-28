import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { render } from 'react-dom';

const image1 = {uri: "https://ih1.redbubble.net/image.1220742639.9615/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image2 = {uri: "https://ih1.redbubble.net/image.594857806.8866/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image3 = {uri: "https://ih1.redbubble.net/image.670564412.2039/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image4 = {uri: "https://ih1.redbubble.net/image.672188677.8427/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image5 = {uri: "https://i.pinimg.com/474x/ee/d9/10/eed9106bd6077a92afd326edefd8d50b.jpg"}
const image6 = {uri: "https://ih1.redbubble.net/image.1118591247.2373/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image7 = {uri: "https://ih1.redbubble.net/image.503497998.4429/aps,504x498,small,transparent-pad,600x600,f8f8f8.u3.jpg"}
const image8 = {uri: "https://ih1.redbubble.net/image.594856339.8826/st,small,507x507-pad,600x600,f8f8f8.jpg"}
const image9 = {uri: "https://ih1.redbubble.net/image.1233654268.6059/st,small,507x507-pad,600x600,f8f8f8.jpg"}

export default class Profile extends React.Component {

  state = {
    name: '', major: '', favsport: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  submit = () => 
  {
    const { name, major, favsport } = this.state
    alert("Successfully Submitted!")
  }
  select = () =>
  {
    this.setState({borderColor: "#20232a", borderWidth: 2})
    alert("Selected Profile Picture")
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.select}>
            <Image source={image1} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.select}>
            <Image source={image2} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.select}>
            <Image source={image3} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.select}>
            <Image source={image4} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.select}>
            <Image source={image5} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.select}>
            <Image source={image6} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.select}>
            <Image source={image7} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.select}>
            <Image source={image8} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.select}>
            <Image source={image9} style={styles.image} />
          </TouchableOpacity>
        </View>
        <Text style={styles.caption}>Select one of the profile pictures above</Text>
        <TextInput 
            style={styles.firstInput}
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
          <TouchableOpacity onPress={this.submit}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
          
      </View>
    )
  }
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
    textAlign: 'center'
  },
  firstInput: {
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
    marginTop: 40
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
    marginLeft: 15,
    marginRight: 15
  },
  row: {
    flexDirection: 'row',
    //marginTop: 100,
    marginBottom: 15
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
