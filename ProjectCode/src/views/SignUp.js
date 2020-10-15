import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
import Login from "./Login";

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

  signUp = () => 
  {
    const { email, username, password, confirm_password } = this.state;
    alert("Successfully Signed Up!")
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
          onChangeText={val => this.onChangeText('name', val)}
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
        <TouchableOpacity onPress={() => this.navigate.to(Login)}>
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