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
import CreateUpdateTask from '../components/CreateUpdateTask';
interface Task {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
}

const Home = () => {
    // title, description, due date, and status (pending/completed
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1)
    const [actionType, setActionType] = useState('')
    const [showCreateUpdateTaskModel, setShowCreateUpdateTaskModel] = useState(false)
    useEffect(() => {
        getTasks()
    }, [])
    const getTasks = async () => {
        try {
            let allTasks = await AsyncStorage.getItem('tasks');
            if (allTasks) {
                setTasks(JSON.parse(allTasks))
                console.log('alltasks fetched', JSON.parse(allTasks));
            }
        } catch (error) {
            console.log('error getting tasks', error);

        }
    }
    const createOrUpdateaskValidation = (task: Task) => {
        if (task?.title?.trim()?.length === 0) {
            Toast.show(`Please enter email`, Toast.SHORT)
            return false
        }
        else if (task?.description?.trim()?.length === 0) {
            Toast.show(`Please enter description`, Toast.SHORT)
            return false
        }
        else if (task?.dueDate === '') {
            Toast.show(`Please select due date`, Toast.SHORT)
            return false
        }
        else if (task?.status?.trim()?.length === 0) {
            Toast.show(`Please select status`, Toast.SHORT)
            return false
        }
        return true
    }
    const createOrUpdateTask = async (task: Task) => {
        if (!createOrUpdateaskValidation(task)) {
            return
        }
        try {
            let allTasks = await AsyncStorage.getItem('tasks');
            if (actionType === 'create') {
                if (!allTasks) {
                    AsyncStorage.setItem('tasks', JSON.stringify([task]));
                } else {
                    AsyncStorage.setItem('tasks', JSON.stringify([...allTasks, task]));
                }
            } else {
                let allTasksCopy = [...allTasks]
                allTasksCopy = allTasksCopy?.map((tk, index) => index === selectedTaskIndex ? task : tk)
                AsyncStorage.setItem('tasks', JSON.stringify(allTasksCopy));
            }
            setShowCreateUpdateTaskModel(false)
            Toast.show(`Task ${actionType === 'create' ? 'created' : 'updated'} sucessfully`, Toast.SHORT)
            getTasks()
        } catch (error) {
            console.log('error adding task', error);

        }
    }
    const deletetask = async (index: number) => {
        const tasksCopy = [...tasks]
        tasksCopy.splice(index, 1)
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasksCopy));
            setTasks(tasksCopy);
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    }
    const editTask = async (index: number) => {
        setSelectedTaskIndex(index)
        setActionType('edit')
        setShowCreateUpdateTaskModel(true)
    }
    const createTask = async () => {
        setActionType('create')
        setShowCreateUpdateTaskModel(true)
    }
    return (
        <View style={styles.container} >
            <ScrollView style={styles.mainView} contentContainerStyle={{ alignItems: 'center', paddingBottom: '20%' }} >
                <Text style={styles.heading}>Home</Text>
                <MyButton title='Create Task' onPress={createTask} />
                <Text style={[styles.heading1, { marginTop: 20 }]}>All Tasks</Text>
                {tasks?.length === 0 ?
                    <Text style={[styles.heading1, { marginTop: 20 }]}>No tasks to show</Text>
                    :

                    <View style={styles.taskTable} >
                        {tasks?.map((tk, index) =>
                            <View key={index?.toString()} >
                                <MyButton title='Delete' onPress={() => deletetask(index)} />
                                <MyButton title='Edit' onPress={() => editTask(index)} />
                                <View style={styles.taskRow}>
                                    <View>
                                        <Text style={styles.taskHeading} >Title</Text>
                                        <Text style={styles.taskValue} >{tk.title}</Text>
                                    </View>
                                    <View style={styles.rightColumn} >
                                        <Text style={styles.taskHeading} >Description</Text>
                                        <Text style={styles.taskValue} >{tk.description}</Text>
                                    </View>
                                </View>
                                <View style={styles.taskRow}>
                                    <View>
                                        <Text style={styles.taskHeading} >Due Date</Text>
                                        <Text style={styles.taskValue} >{tk.dueDate}</Text>
                                    </View>
                                    <View style={styles.rightColumn} >
                                        <Text style={styles.taskHeading} >Status</Text>
                                        <Text style={styles.taskValue} >{tk.status}</Text>
                                    </View>
                                </View>
                            </View>

                        )}
                    </View>
                }
            </ScrollView>
            <CreateUpdateTask
                visible={showCreateUpdateTaskModel}
                setVisibility={setShowCreateUpdateTaskModel}
                createOrUpdateTask={createOrUpdateTask}
                actionType={actionType}
                selectedTaskIndex={selectedTaskIndex}
                tasks={tasks}
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
    },
    taskTable: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%'
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskHeading: {
        color: 'black',
        fontSize: 18,
        fontFamily: getFont('Medium'),
        marginBottom: 10
    },
    taskValue: {
        color: 'black',
        fontSize: 18,
        fontFamily: getFont('Regular'),
        marginBottom: 10
    },
    rightColumn: {
        width: '40%'
    }
})