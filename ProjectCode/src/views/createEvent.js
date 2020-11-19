import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, View, Text,Picker, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {globalStyles} from '../styles/global.js';
import {Formik} from 'formik';


export default function CreateEvent({addSport}){
    const [selectedValue, setSelectedValue] = useState("java");
    const [date, setDate] = useState('09-10-2020');
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
                        <Text style={globalStyles.guide}>Enter a meeting location </Text>
                        <TextInput
                            style = {globalStyles.input}
                            placeholder = 'Meeting Location'
                            onChangeText = {props.handleChange('location')}
                            value={props.values.location}
                        />

                        <Text style={globalStyles.guide}>Pick the date for the meeting</Text>
                        <DatePicker
                            style = {{width:300, height:50}}
                            date = {date}
                            mode="date"
                            placeholder = "Pick a date"
                            format = "DD-MM-YYYY"
                            confirmBtnText = "Done"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    display: 'none',

                                },
                                dateInput: {
                                    flex:1,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    padding: 20,
                                    fontSize: 30,
                                    borderRadius: 6,
                                },
                            }}
                            onDateChange={(date) =>
                            {setDate(date);{props.setFieldValue('time',date)}}

                            }
                        />
                        <Text style={globalStyles.guide}>Pick the sport of the meeting </Text>
                        <Picker
                            style = {{height:50, width:300, color: '#A9A9A9'}}

                            selectedValue ={selectedValue}
                            onValueChange = {(itemValue) =>
                            {setSelectedValue(itemValue); props.setFieldValue('sport',itemValue)}
                            }
                            onChange = {(itemValue) =>
                            {setSelectedValue(itemValue)}
                            }

                        >
                            <Picker.Item label="Click here to select a sport!" value="" />
                            <Picker.Item label="Basketball" value="Basketball" />
                            <Picker.Item label="Baseball" value="Baseball" />
                            <Picker.Item label="Soccer" value="Soccer" />
                            <Picker.Item label="Football" value="Football" />
                        </Picker>


                        <Button title =  'submit' color = '#CFB87C' onPress = {props.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
