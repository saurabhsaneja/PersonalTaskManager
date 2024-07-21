//react components
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
//third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
//global
//styles
import { CommonActions } from '@react-navigation/native';
import { getFont } from '../helpers/helper';
import { NavigationProp } from '@react-navigation/native';
import tasksStore from '../helpers/tasksStore';

type Props = {
    navigation: NavigationProp<any>;
};
const Splash = ({ navigation }: Props) => {
    const { addAllToTaskList } = tasksStore()
    //function : navigation function
    const resetIndexGoToLogin = CommonActions.reset({
        index: 1,
        routes: [{ name: 'LOGIN' }],
    });
    const resetIndexGoToSignUp = CommonActions.reset({
        index: 1,
        routes: [{ name: 'SIGNUP' }],
    });
    //useEffect
    useEffect(() => {
        setTimeout(async () => {
            try {
                const email = await AsyncStorage.getItem('email');
                const allTasks = await AsyncStorage.getItem('tasks');
                if (allTasks) {
                    addAllToTaskList(JSON.parse(allTasks))
                }
                if (email) {
                    navigation.dispatch(resetIndexGoToLogin)
                } else {
                    navigation.dispatch(resetIndexGoToSignUp)
                }
            } catch (error) {
                console.log('error getting email from async storage', error);
            }
        }, 2000);
        return () => { };
    }, []);

    //UI
    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.splashText} >Personal Task Manager</Text>
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashText: {
        color: 'black',
        fontSize: 20,
        fontFamily: getFont('Medium')
    }
})
