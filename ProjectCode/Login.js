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
import SignUp from "./SignUp";
import MainFeed from "./MainFeed";
import {auth} from "../utility/database"

class LogInComponent extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigate;
  }

  state = {
    email: '', password: ''
  };

  checkCredentials(email, password){
    // check if email includes @colorado.edu
    if (!email.match(/\b[A-Za-z0-9._%+-]+@colorado.edu/g)){
      this.displayErrorMessage("Please use your @colorado.edu email.");
      return false;
    }

    // check if email isn't blank
    if (email == ''){
      this.displayErrorMessage("email plz");
      return false;
    }

    // check password isn't blank
    if (password === ''){
      this.displayErrorMessage("Password plz");
      return false;
    }

    return true;
  }

  //displays error message on screen
  displayErrorMessage(error){
    Alert.alert(error);
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  };

  login = () => {
    const {email, password} = this.state;
    // check passwords match, and not blank
    if (this.checkCredentials(email, password) {
      auth.signInWithEmailAndPassword(email, password).then(function (cred) {
        Alert.alert("Successfully Signed Up!")
      }).catch(function (error) {
        this.displayErrorMessage("Something went wrong.");
      });

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
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#ABABAB'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TouchableOpacity onPress={() => this.navigate.to(MainFeed)}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.navigate.to(SignUp)}>
          <Text style={styles.signup}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default function LogIn(navigate) {
  return (
      <LogInComponent navigate={navigate}/>
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
  login: {
    backgroundColor: '#CFB87C',
    color: 'black',
    width: 350,
    height: 55,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    fontSize:  25,
    marginTop: 100
  },
  signup: {
    marginTop: 25,
  }
})
