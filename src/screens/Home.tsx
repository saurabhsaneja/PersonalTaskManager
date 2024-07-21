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
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import tasksStore from '../helpers/tasksStore';

interface Task {
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const Home = () => {
    const {taskList, addAllToTaskList, addToTaskList, updateTaskList, deleteFromTaskList} = tasksStore()
    // title, description, due date, and status (pending/completed
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1)
    const [actionType, setActionType] = useState('')
    const [showCreateUpdateTaskModel, setShowCreateUpdateTaskModel] = useState(false)
    const [filterStatus, setFilterStatus] = useState('')
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
    // useEffect(() => {
    //     console.log('taskList updated', taskList);
    // }, [taskList])
    useEffect(() => {
        getTasks()
        scheduleNotification()
    }, [])

    async function scheduleNotification() {
        // Create a time-based trigger
        const date = new Date(Date.now());
        date.setSeconds(date.getSeconds() + 10); // after 5 secs
        // date.setHours(date.getHours() + 1); // Schedule notification to appear in one hour

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(), // Unix timestamp in milliseconds
        };

        await notifee.createTriggerNotification(
            {
                title: 'Scheduled Notification',
                body: 'This notification was scheduled 5 seconds ago',
                android: {
                    channelId: 'default',
                },
            },
            trigger,
        );
    }

    const getTasks = async () => {
        try {
            let allTasks = await AsyncStorage.getItem('tasks');
            if (allTasks) {
                setTasks(JSON.parse(allTasks))
                if(taskList?.length == 0){
                    addAllToTaskList(JSON.parse(allTasks))
                }
                console.log('alltasks fetched', JSON.parse(allTasks));
            }
        } catch (error) {
            Toast.show(`error fetching tasks`, Toast.SHORT)
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
            let allTasks: Task[] = await AsyncStorage.getItem('tasks');
            allTasks = JSON.parse(allTasks)
            console.log('allTasks', allTasks);

            if (actionType === 'create') {
                addToTaskList(task)
                if (!allTasks) {
                    AsyncStorage.setItem('tasks', JSON.stringify([task]));
                } else {
                    AsyncStorage.setItem('tasks', JSON.stringify([...allTasks, task]));
                }
            } else {
                updateTaskList(task, selectedTaskIndex)
                let allTasksCopy = [...allTasks]
                allTasksCopy = allTasksCopy?.map((tk, index) => index === selectedTaskIndex ? task : tk)
                AsyncStorage.setItem('tasks', JSON.stringify(allTasksCopy));
            }
            setShowCreateUpdateTaskModel(false)
            Toast.show(`Task ${actionType === 'create' ? 'created' : 'updated'} sucessfully`, Toast.SHORT)
            getTasks()
        } catch (error) {
            Toast.show(`Error ${actionType === 'create' ? 'creating' : 'updating'} task`, Toast.SHORT)
            console.log('error adding task', error);

        }
    }
    const deletetask = async (index: number) => {
        const tasksCopy = [...tasks]
        tasksCopy.splice(index, 1)
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasksCopy));
            deleteFromTaskList(index)
            // setTasks(tasksCopy);
            getTasks()
            Toast.show(`Task deleted sucessfully`, Toast.SHORT)
        } catch (error) {
            Toast.show(`Error deleting task`, Toast.SHORT)
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
                <MyButton title='Create Task' onPress={createTask} style={{ backgroundColor: 'green' }} />
                <Text style={[styles.heading1, { marginTop: 20 }]}>All Tasks</Text>
                {tasks?.length === 0 ?
                    <Text style={[styles.heading1, { marginTop: 20 }]}>No tasks to show</Text>
                    :
                    <>
                        <Text style={[styles.filter, { marginTop: 20 }]}>Filter tasks by status</Text>
                        <DropdownPicker
                            placeholder="Select status"
                            value={filterStatus}
                            setValue={setFilterStatus}
                            data={statusData}
                        />
                        <View style={{ width: '90%' }} >
                            {getTodaysTasks(tasks, filterStatus)?.length > 0 ?
                                <>
                                    <Text style={[styles.heading1, { marginTop: 20 }]}>Tasks due today</Text>
                                    {getTodaysTasks(tasks, filterStatus)?.map((tk, index) =>
                                        <View key={index?.toString()} style={styles.taskTable} >
                                            <MyButton title='Delete' onPress={() => deletetask(index)} style={{ alignSelf: 'center', marginBottom: 10, width: '100%' }} />
                                            <MyButton title='Edit' onPress={() => editTask(index)} style={{ alignSelf: 'center', width: '100%' }} />
                                            <View style={styles.taskRow}>
                                                <View>
                                                    <Text style={styles.taskHeading} >Title</Text>
                                                    <Text style={styles.taskHeading} >Description</Text>
                                                </View>
                                                <View style={styles.rightColumn} >
                                                    <Text style={styles.taskValue} >{tk.title}</Text>
                                                    <Text style={styles.taskValue} >{tk.description}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.taskRow}>
                                                <View>
                                                    <Text style={styles.taskHeading} >Due Date</Text>
                                                    <Text style={[styles.taskHeading, {marginTop: 15}]} >Status</Text>
                                                </View>
                                                <View style={styles.rightColumn} >
                                                    <Text style={styles.taskValue} >{moment(tk.dueDate).format('DD MMM, YYYY, HH:mm A')}</Text>
                                                    <Text style={styles.taskValue} >{tk.status}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    )}
                                </>
                                : <Text style={[styles.heading1, { marginTop: 20 }]}>No Tasks due today</Text>}
                            {getUpcomingTasks(tasks, filterStatus)?.length > 0 ?
                                <>
                                    <Text style={[styles.heading1, { marginTop: 20 }]}>Upcoming Tasks</Text>
                                    {getUpcomingTasks(tasks, filterStatus)?.map((tk, index) =>
                                        <View key={index?.toString()} style={styles.taskTable} >
                                            <MyButton title='Delete' onPress={() => deletetask(index)} style={{ alignSelf: 'center', marginBottom: 10, width: '100%' }} />
                                            <MyButton title='Edit' onPress={() => editTask(index)} style={{ alignSelf: 'center', width: '100%' }} />
                                            <View style={styles.taskRow}>
                                                <View>
                                                    <Text style={styles.taskHeading} >Title</Text>
                                                    <Text style={styles.taskHeading} >Description</Text>
                                                </View>
                                                <View style={styles.rightColumn} >
                                                    <Text style={styles.taskValue} >{tk.title}</Text>
                                                    <Text style={styles.taskValue} >{tk.description}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.taskRow}>
                                                <View>
                                                    <Text style={styles.taskHeading} >Due Date</Text>
                                                    <Text style={[styles.taskHeading, {marginTop: 15}]} >Status</Text>
                                                </View>
                                                <View style={styles.rightColumn} >
                                                    <Text style={styles.taskValue} >{moment(tk.dueDate).format('DD MMM, YYYY, HH:mm A')}</Text>
                                                    <Text style={styles.taskValue} >{tk.status}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    )}
                                </>
                                : <Text style={[styles.heading1, { marginTop: 20 }]}>No upcoming Tasks</Text>}
                        </View>
                    </>
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
    filter: {
        color: 'black',
        fontSize: 18,
        fontFamily: getFont('Medium'),
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
        marginBottom: 10,
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

// Function to check if a given date is today
function isToday(dateString: string) {
    const dateToCheck = moment(dateString); // Parse the input date string
    const today = moment(); // Get today's date
    // console.log('dateToCheck', dateToCheck);
    // console.log('today', today);

    // Compare date without time component
    return dateToCheck.isSame(today, 'day');
}

const getTodaysTasks = (tasks, filterStatus) => {
    if (filterStatus === '') {
        return tasks?.filter(tk => isToday(tk?.dueDate))
    } else {
        return tasks?.filter(tk => isToday(tk?.dueDate))?.filter(tk => tk?.status === filterStatus)
    }
}
const getUpcomingTasks = (tasks, filterStatus) => {
    if (filterStatus === '') {
        return tasks?.filter(tk => !isToday(tk?.dueDate))
    } else {
        return tasks?.filter(tk => isToday(tk?.dueDate))?.filter(tk => tk?.status === filterStatus)
    }
}