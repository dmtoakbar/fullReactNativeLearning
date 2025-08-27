import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";

// vcf



const Basic = () => {

    const position = useRef(new Animated.Value(0)).current; // useAnimatedValue(0);

    const startAnimation = () => {
        Animated.timing(position, {
            toValue: 200,
            duration: 1000,
            useNativeDriver: false, // on false it will run on js thread, and on true, it will run on ui thread
        }).start(()=>{
            // write a callback function here after finish the animation
            Animated.timing(position, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false,
            }).start();
        });
    }


    useEffect(() => {
        startAnimation();
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { marginLeft: position }]}></Animated.View>
        </View>
    )
};


export default Basic;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: 'yellow',
        width: 100,
        height: 100
    }
})
