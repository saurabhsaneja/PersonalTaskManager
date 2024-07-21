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
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface Props {
    title: string;
    onPress: any;
    style?: any;
}
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MyButton = ({ title, onPress, style = {} }: Props) => {
    // Create a shared value for the animation
    const scale = useSharedValue(1);

    // Define the animated style
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    // Handle the button press
    const handlePressIn = () => {
        scale.value = withSpring(0.3, { easing: Easing.out(Easing.exp) });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { easing: Easing.out(Easing.exp) });
    };

    return (
        <AnimatedTouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress} style={[styles.button, style, animatedStyle]}>
            <Text style={styles.someText}>{title}</Text>
        </AnimatedTouchableOpacity>

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