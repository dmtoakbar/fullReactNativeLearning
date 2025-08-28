import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity, useAnimatedValue } from "react-native";

// vcf


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);



const CustomAnimatedComponent = () => {

    const scaleValue = useAnimatedValue(1);

    const handlePress = () => {
        Animated.spring(scaleValue, {
            toValue: 1.5,
            useNativeDriver: true
        }).start();
    }

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    };

    return (
       <AnimatedTouchableOpacity style={[styles.button, {transform: [{scale: scaleValue}]}]}
       onPressIn={handlePress}
       onPressOut={handlePressOut}
       >
          <Text style={styles.text}>Press me</Text>
       </AnimatedTouchableOpacity>
    )
};


export default CustomAnimatedComponent;


const styles = StyleSheet.create({
    button: {
        width: 200, 
        height: 46, 
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14
    },
    text: {
       color: 'white',
       fontSize: 16, 
       fontWeight: 'bold',
    }
})
