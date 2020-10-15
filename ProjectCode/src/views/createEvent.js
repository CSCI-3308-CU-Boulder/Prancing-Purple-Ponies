import React from 'react';
import {StyleSheet, Button, TextInput, View, Text} from 'react-native';
import {globalStyles} from '../styles/global.js';
import {Formik} from 'formik';

export default function CreateEvent({addSport}){
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
                        <TextInput
                            style = {globalStyles.input}
                            placeholder = 'Sport'
                            onChangeText = {props.handleChange('sport')}
                            value={props.values.sport}
                        />

                        <Button title =  'submit' color = 'purple' onPress = {props.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
