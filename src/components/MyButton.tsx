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

interface Props {
    title: string;
    onPress: any;
    style?: any;
}
const MyButton = ({ title, onPress, style = {} }: Props) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
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