import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, View, Text,Picker, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {globalStyles} from '../styles/global.js';
import {Formik} from 'formik';
import * as Yup from "yup";


export default function CreateEvent({addSport, closeModal}){
    var curDate = new Date();

    const [selectedValue, setSelectedValue] = useState("java");
    const [date, setDate] = useState(curDate);
    const [time, setTime] = useState('1:12 AM');
    const [hhh, setHhh] = useState('');
    const [mmm, setMmm] = useState('');
    const [ampmm, setAmpmm] = useState('');
    const SignupVal = Yup.object().shape({
        location: Yup.string()
            .required("Please enter a location")
            .min(2),
        sport: Yup.string()
            .required("Please select a sport"),
        date: Yup.string()
            .required("Please select a date"),
        hh: Yup.string()
            .required("Required"),
        mm: Yup.string()
            .required("Required"),
        ampm: Yup.string()
            .required("Required"),
    })
    return(
        <View style = {globalStyles.container}>
            <Formik
                initialValues={{location: '', time: '', sport: '',date: '',inform: '',hh:'',mm:'',ampm:''}}
                onSubmit={(values) =>{

                    addSport(values);
                    closeModal(false);
                    console.log(values);
                }}
                validationSchema={SignupVal}
            >
                {(props) => (
                    <View>


{/*input for location------------------------------------------------------------------------------------*/}
                        <Text style={globalStyles.guide}>Enter a meeting location </Text>
                        <TextInput
                            style = {globalStyles.input}
                            placeholder = 'Meeting Location'
                            onChangeText = {props.handleChange('location')}
                            value={props.values.location}
                        />
                        <Text style = {globalStyles.errorMsg}> {props.errors.location}</Text>
{/*input for date---------------------------------------------------------------------------------------*/}
                        <Text style={globalStyles.guide}>Pick the date for the meeting</Text>
                        <DatePicker
                            style = {{width:300, height:50}}
                            date = {date}
                            mode="date"
                            placeholder = "Pick a date"
                            format = "MM/DD/YYYY"
                            minDate = {curDate}
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
                            {setDate(date);props.setFieldValue("date",date)}

                            }
                        />
                        <Text style = {globalStyles.errorMsg}> {props.errors.date}</Text>
{/*input for time---------------------------------------------------------------------------------------*/}
                        <Text style={globalStyles.guide}>Pick the time for the meeting </Text>

                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:1}}>
                                <Picker
                                    style = {{height:50, width:100, color: '#A9A9A9'}}

                                    selectedValue ={hhh}
                                    onValueChange = {(itemValue) =>
                                    {setHhh(itemValue);props.setFieldValue('hh', itemValue)}
                                    }
                                >
                                    <Picker.Item label="Hour" value="" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                    <Picker.Item label="7" value="7" />
                                    <Picker.Item label="8" value="8" />
                                    <Picker.Item label="9" value="9" />
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="11" value="11" />
                                    <Picker.Item label="12" value="12" />
                                </Picker>
                                <Text style = {globalStyles.errorMsg}> {props.errors.hh}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Picker
                                    style = {{height:50, width:100, color: '#A9A9A9'}}

                                    selectedValue ={mmm}
                                    onValueChange = {(itemValue) =>
                                    {setMmm(itemValue);props.setFieldValue('mm', itemValue)}
                                    }
                                >
                                    <Picker.Item label="Minute" value="" />
                                    <Picker.Item label="00" value="00" />
                                    <Picker.Item label="05" value="05" />
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="15" value="15" />
                                    <Picker.Item label="20" value="20" />
                                    <Picker.Item label="25" value="25" />
                                    <Picker.Item label="30" value="30" />
                                    <Picker.Item label="35" value="35" />
                                    <Picker.Item label="40" value="40" />
                                    <Picker.Item label="45" value="45" />
                                    <Picker.Item label="50" value="50" />
                                    <Picker.Item label="55" value="55" />

                                </Picker>
                                <Text style = {globalStyles.errorMsg}> {props.errors.mm}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Picker
                                    style = {{height:50, width:100, color: '#A9A9A9'}}

                                    selectedValue ={ampmm}
                                    onValueChange = {(itemValue) =>
                                    {setAmpmm(itemValue);props.setFieldValue('ampm', itemValue)}
                                    }
                                >
                                    <Picker.Item label="AM/PM" value="" />
                                    <Picker.Item label="AM" value="AM" />
                                    <Picker.Item label="PM" value="PM" />
                                </Picker>
                                <Text style = {globalStyles.errorMsg}> {props.errors.ampm}</Text>
                            </View>
                        </View>
{/*input for sport---------------------------------------------------------------------------------------*/}
                        <Text style={globalStyles.guide}>Pick the sport of the meeting </Text>
                        <Picker
                            style = {{height:50, width:300, color: '#A9A9A9'}}

                            selectedValue ={selectedValue}
                            onValueChange = {(itemValue) =>
                            {setSelectedValue(itemValue); props.setFieldValue('sport',itemValue)}
                            }

                        >
                            <Picker.Item label="Click here to select a sport!" value="" />
                            <Picker.Item label="Basketball" value="Basketball" />
                            <Picker.Item label="Baseball" value="Baseball" />
                            <Picker.Item label="Soccer" value="Soccer" />
                            <Picker.Item label="Football" value="Football" />
                        </Picker>
                        <Text style = {globalStyles.errorMsg}> {props.errors.sport}</Text>
{/*input for info---------------------------------------------------------------------------------------*/}
                        <Text style={globalStyles.guide}>Enter additional description </Text>
                        <TextInput
                            style = {globalStyles.input}
                            placeholder = 'Description'
                            onChangeText = {props.handleChange('inform')}
                            value={props.values.inform}
                        />
                        <Text>''</Text>
{/*-----------------------------------------------------------------------------------------------------*/}
                        <Button title =  'submit' color = '#CFB87C' onPress = {props.handleSubmit}/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
