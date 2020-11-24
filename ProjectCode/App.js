import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { render } from 'react-dom';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
   
  };

  class SignUp extends React.Component { 
    state = {
      name: '', major: '', favsport: ''
    }
    onChangeText = (key, val) => {
      this.setState({ [key]: val })
    }
    signUp = () => 
    {
      const { name, major, favsport } = this.state
      alert("Successfully Signed Up!")
    }
   }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 230, height: 250, borderRadius: 80 }} />}
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