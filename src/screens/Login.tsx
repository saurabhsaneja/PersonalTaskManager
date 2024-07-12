import React, { useEffect, useMemo, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    ScrollViewBase,
    StatusBar,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton';
import Toast from 'react-native-simple-toast'
import { getFont } from '../helpers/helper';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
};
const Login = ({ navigation }: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        fetchUserAccount()
    }, [])
    const fetchUserAccount = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('email');
            const userPassword = await AsyncStorage.getItem('password');
            if (userEmail && userPassword) {
                setEmail(userEmail)
                setPassword(userPassword)
            }
        } catch (error) {
            console.log('error fetchUserAccount', error);
        }
    }
    const validation = () => {
        if (email?.trim()?.length === 0) {
            Toast.show(`Please enter email`, Toast.SHORT)
            return false
        } else if (password?.trim()?.length === 0) {
            Toast.show(`Please enter password`, Toast.SHORT)
            return false
        }
        return true
    }
    const handleLogin = async () => {
        if (!validation()) {
            return
        }
        Toast.show(`Login successful`, Toast.SHORT)
        navigation.navigate('HOME')
    }
    return (
        <View style={styles.container} >
            <ScrollView style={styles.mainView} contentContainerStyle={{ alignItems: 'center' }} >
                <Text style={styles.heading}>Login</Text>
                <MyTextInput
                    value={email}
                    setValue={setEmail}
                    placeholder={'email'}
                />
                <MyTextInput
                    value={password}
                    setValue={setPassword}
                    placeholder={'password'}
                />
                <MyButton title='Login' onPress={handleLogin} />
            </ScrollView>
        </View>
    )
}

export default Login;

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
    }
})