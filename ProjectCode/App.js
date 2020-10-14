import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Alert,Modal } from 'react-native';
import CreateEvent from './createEvent'

export default function App() {
    const[modalOpen, setModalOpen] = useState(false);
    const addSport = (meetingInfo) => {
        //some code here to pass to firebase
        setModalOpen(false);
    }
    return (
    <View style={styles.container}>

      <Modal visible = {modalOpen} animationType = 'slide'>
          <View style = {styles.container}>
              <Button
                  onPress={()=> setModalOpen(false)}
                  title="Close"
                  color="#841584"
                  accessibilityLabel="Close the event creater using this button"
              />
              <CreateEvent addSport = {addSport}/>
          </View>
      </Modal>

      <Text style={[styles.bigfont]}>Welcome to SKO Play! </Text>
      <StatusBar style="auto" />
      <Button
          onPress={()=> setModalOpen(true)}
          title="Add Event"
          color="#841584"
          style={styles.modalToggle}
          accessibilityLabel="Add event using this button"
      />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalToggle: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#f2f2f2',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
  },
  bigfont:{
      fontSize:30,
  },
});
