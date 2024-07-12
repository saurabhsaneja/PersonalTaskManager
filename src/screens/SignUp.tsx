import React, { useEffect, useState } from 'react';
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
const SignUp = ({navigation}: Props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const validation = () => {
        console.log(email);

        if (email?.trim()?.length === 0) {
            Toast.show(`Please enter email`, Toast.SHORT)
            return false
        } else if (password?.trim()?.length === 0) {
            Toast.show(`Please enter password`, Toast.SHORT)
            return false
        }
        return true
    }
    const handleSignup = async () => {
        console.log('validation()', validation());

        if (!validation()) {
            return
        }
        try {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            Toast.show(`Sign up successful`, Toast.SHORT)
            navigation.navigate('HOME')
        } catch (e) {
            Toast.show(`Problem in sign up. Please try again later`, Toast.SHORT)
            console.log('error sending email to async storage', e);
        }
    }
    return (
        <View style={styles.container} >
            <ScrollView style={styles.mainView} contentContainerStyle={{ alignItems: 'center' }} >
                <Text style={styles.heading}>Sign Up</Text>
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
                <MyButton title='Sign Up' onPress={handleSignup} />
            </ScrollView>
        </View>
    )
}

export default SignUp;

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