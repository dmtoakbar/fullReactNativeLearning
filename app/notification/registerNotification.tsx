import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { registerForNotification } from './send-token'; // Update path accordingly

const RegisterScreen = () => {
    const handleRegisterPress = () => {
        registerForNotification();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    button: {
        width: 150,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});
