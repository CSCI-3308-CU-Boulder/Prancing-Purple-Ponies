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

export default class SignUp extends React.Component {
  state = {
    email: '', password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  login = () => 
  {
    const { email, password } = this.state
    alert("Successfully Logged In!")
  }

  navigate = () => 
  {

  }
 
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
        <TouchableOpacity onPress={this.login}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigate}>
          <Text style={styles.signup}>Don't have an account? Sign Up</Text>
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