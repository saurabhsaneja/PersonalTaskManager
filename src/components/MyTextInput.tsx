import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    ScrollViewBase,
    StatusBar,
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

interface MyTextInputProps {
    value: string;
    setValue: (text: string) => void;
    placeholder: string;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ value, setValue, placeholder }) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={(text) => setValue(text)}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
        />
    )
}

export default MyTextInput

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: '100%',
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        color: 'black',
        fontSize: 18
    },
})