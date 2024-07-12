import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    ScrollViewBase,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton';
import Toast from 'react-native-simple-toast'
import { getFont } from '../helpers/helper';
import DropdownPicker from '../components/DropdownPicker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const Home = () => {
    // title, description, due date, and status (pending/completed
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [statusData, setStatusData] = useState([
        {
            label: 'pending',
            value: 'pending',
        },
        {
            label: 'completed',
            value: 'completed',
        },
    ])
    const [openDueDate, setOpenDueDate] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [date, setDate] = useState(new Date());
    const createTaskValidation = () => {
        if (title?.trim()?.length === 0) {
            Toast.show(`Please enter email`, Toast.SHORT)
            return false
        }
        return true
    }
    return (
        <View style={styles.container} >
            <ScrollView style={styles.mainView} contentContainerStyle={{ alignItems: 'center' }} >
                <Text style={styles.heading}>Home</Text>
                <Text style={styles.heading1}>Create Task</Text>

                <MyTextInput
                    value={title}
                    setValue={setTitle}
                    placeholder={'title'}
                />
                <MyTextInput
                    value={description}
                    setValue={setDescription}
                    placeholder={'description'}
                />
                <TouchableOpacity
                    onPress={() => setOpenDueDate(true)}
                    style={styles.datePicker}>
                    <Text style={[styles.datePickerText, dueDate ? { color: 'black' } : null]} >{dueDate
                        ? moment(dueDate).format('DD MMM, YYYY')
                        : 'Select Due Date'}</Text>
                </TouchableOpacity>
                <DropdownPicker
                    placeholder="Please select status"
                    value={status}
                    setValue={setStatus}
                    data={statusData}
                />
            </ScrollView>
            <DatePicker
                modal
                mode="date"
                // mode="time"
                open={openDueDate}
                date={date}
                minimumDate={new Date()}
                onConfirm={time => {
                    setOpenDueDate(false);
                    setDueDate(time);
                }}
                onCancel={() => {
                    setOpenDueDate(false);
                }}
            />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        padding: 20,
    },
    heading: {
        color: 'black',
        fontSize: 20,
        fontFamily: getFont('Medium'),
        marginBottom: 10
    },
    heading1: {
        color: 'black',
        fontSize: 18,
        fontFamily: getFont('MediumItalic'),
        marginBottom: 10
    },
    datePicker: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black',
        justifyContent: 'center',
        marginBottom: 10
    },
    datePickerText: {
        color: 'grey',
        fontSize: 18,
        fontFamily: getFont('Regular'),
    }
})