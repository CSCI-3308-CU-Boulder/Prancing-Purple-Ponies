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

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  };

  login = () => 
  {
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    alert("Successfully Logged In!")
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