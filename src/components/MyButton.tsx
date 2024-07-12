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
    Image
} from 'react-native';

const MyButton = ({ title, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.button} >
            <Text style={styles.someText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MyButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        height: 45,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    someText: {
        color: 'white',
        fontSize: 20
    }
})