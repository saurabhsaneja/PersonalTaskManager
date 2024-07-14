import React, { useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform, FlatList, StyleSheet } from 'react-native';
import Toast from 'react-native-simple-toast';
import DropdownPicker from './DropdownPicker';
import MyTextInput from './MyTextInput';
import moment from 'moment';
import MyButton from './MyButton';
import DatePicker from 'react-native-date-picker';
import { getFont } from '../helpers/helper';
interface Task {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
}
interface Props {
    visible: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    createOrUpdateTask: (task: Task) => void;
    actionType: string;
    selectedTaskIndex: number;
    tasks: Task[]
}

const CreateUpdateTask = ({ visible, setVisibility, createOrUpdateTask, actionType, selectedTaskIndex, tasks }: Props) => {
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
    //function : modal function
    const closeModal = () => {
        setVisibility(false);
    };
    //UI
    return (
        <Modal
            visible={visible}
            onRequestClose={closeModal}
            animationType="fade"
            onShow={() => {
                if (actionType === 'edit') {
                    const task = tasks[selectedTaskIndex]
                    setTitle(task?.title)
                    setDescription(task?.description)
                    setDueDate(parseCustomDate(task?.dueDate))
                    setStatus(task?.status)
                } else {
                    setTitle('')
                    setDescription('')
                    setDueDate('')
                    setStatus('')
                }
            }}
            transparent>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.blurView} onPress={closeModal} />
                    <View style={styles.mainView}>
                        <Text style={styles.heading1}>{actionType === 'create' ? 'Create Task' : 'Edit Task'}</Text>

                        <MyTextInput
                            value={title}
                            setValue={setTitle}
                            placeholder={'Title'}
                        />
                        <MyTextInput
                            value={description}
                            setValue={setDescription}
                            placeholder={'Description'}
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
                        <MyButton title={actionType === 'create' ? 'Create Task' : 'Edit Task'} onPress={() => createOrUpdateTask({ title, description, dueDate: moment(dueDate).format('DD MMM, YYYY'), status })} style={{ width: '100%', alignSelf: 'center' }} />
                    </View>
                </View>
            </KeyboardAvoidingView>
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
        </Modal>
    );
};

export default CreateUpdateTask;

function parseCustomDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const day = parseInt(parts[0], 10);
    const monthName = parts[1]?.substring(0, parts[1]?.length - 1);
    const year = parseInt(parts[2], 10);

    // Create a mapping for month names to numbers
    const months: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3,
        'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7,
        'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    // Get the month number from the month name
    const month = months[monthName];

    console.log('year, month, day', year, month, day);
    // Create a Date object with year, month, and day
    return new Date(year, month, day);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.3)',
    },
    blurView: {
        flex: 1,
    },
    mainView: {
        padding: 20,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
    },
});