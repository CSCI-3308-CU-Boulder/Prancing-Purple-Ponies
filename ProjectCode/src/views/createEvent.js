import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, View, Text,Picker, } from 'react-native';

import {globalStyles} from '../styles/global.js';
import {Formik} from 'formik';


export default function CreateEvent({addSport}){
    const [selectedValue, setSelectedValue] = useState("java");
    return(
        <View style = {globalStyles.container}>
            <Formik
                initialValues={{location: '', time: '', sport: ''}}
                onSubmit={(values) =>{
                    addSport(values);
                    console.log(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style = {globalStyles.input}
                            placeholder = 'Meeting Location'
                            onChangeText = {props.handleChange('location')}
                            value={props.values.location}
                        />
                        <TextInput
                            style = {globalStyles.input}
                            placeholder = 'Meeting time (HH:MM)'
                            onChangeText = {props.handleChange('time')}
                            value={props.values.time}
                        />


                        <Picker
                            style = {{height:50, width:300, color: '#A9A9A9'}}
                            selectedValue ={selectedValue}
                            onValueChange = {(itemValue) =>
                            {props.setFieldValue('sport',itemValue)}
                            }
                            onChange = {(itemValue) =>
                            {setSelectedValue(itemValue)}
                            }

                        >
                            <Picker.Item label="Click here to select a sport!" value="Basketball" />
                            <Picker.Item label="Basketball" value="Basketball" />
                            <Picker.Item label="Baseball" value="Baseball" />
                            <Picker.Item label="Soccer" value="Soccer" />
                            <Picker.Item label="Football" value="Football" />
                        </Picker>
                        <TextInput
                          style = {{fontSize : 30}}
                          id = "selectedSport"
                          label = "sport"
                          value={props.values.sport}
                        />
                        <Button title =  'submit' color = 'purple' onPress = {props.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
