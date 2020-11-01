import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native'
import Login from "./Login";
import {addEntry, auth} from "../utility/database"


//function that lets the user know that the passwords dont match
//displays error message on screen
function displayErrorMessage(error){
  Alert.alert(error);
}

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigate;
  }

  state = {
    email: '', username: '', password: '', confirm_password: ''
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  };

  checkCredentials(email, username, password, confirm_password){
    // check if email includes @colorado.edu
    if (!email.match(/^[A-Za-z0-9._%+-]+@colorado.edu$/g)){
      displayErrorMessage("Please use your @colorado.edu email.");
      return false;
    }
    // check username is not blank and has certain characters
    if (!username.match(/^[A-Za-z' -]{4,20}$/g)){
      //make sure error message fits
      displayErrorMessage("That username's wack. Your username can include: Letters, Numbers, . and _");
      return false;
    }
    // check passwords aren't blank
    if (password === '' || confirm_password === ''){
      displayErrorMessage("You might want a password.");
      return false;
    }
    // check password equals confirm_password
    if (password !== confirm_password){
      displayErrorMessage("Passwords dont match!");
      return false;
    }

    // check username isnt taken

    return true;
  }

  signUp = () =>
  {
    const { email, username, password, confirm_password } = this.state;
    // check passwords match, and not blank
    if (this.checkCredentials(email, username, password, confirm_password)) {
      auth.createUserWithEmailAndPassword(email, password).then(function (cred){
        // Write to firebase
        addEntry("user", {
          email: email,
          username: username
        });
        Alert.alert("Successfully Signed Up!")
      }).catch(function (error) {
        console.log(error);
        displayErrorMessage("Something went wrong.");
      });
      // add username to firebase

    }


  };


  render() {
    return (
        <View style={styles.container}>
          <TextInput
              style={styles.input}
              placeholder='CU Email'
              autoCapitalize="none"
              placeholderTextColor='#ABABAB'
              onChangeText={val => this.onChangeText('email', val)}
          />
          <TextInput
              style={styles.input}
              placeholder='Username'
              autoCapitalize="none"
              placeholderTextColor='#ABABAB'
              onChangeText={val => this.onChangeText('username', val)}
          />
          <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor='#ABABAB'
              onChangeText={val => this.onChangeText('password', val)}
          />
          <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor='#ABABAB'
              onChangeText={val => this.onChangeText('confirm_password', val)}
          />
          <TouchableOpacity onPress={() => this.signUp()}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate.to(Login)}>
            <Text style={styles.login}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default function SignUp(navigate) {
  return (
      <SignUpComponent navigate={navigate}/>
  )
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
  login: {
    marginTop: 25,
  }
})