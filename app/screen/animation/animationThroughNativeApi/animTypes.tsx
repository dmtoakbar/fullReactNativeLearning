import { useEffect } from "react";
import { Animated, StyleSheet, useAnimatedValue, View } from "react-native";

//vcf rules
//decay, spring, timing


const AnimTypes = () => {
    const springValue = useAnimatedValue(0);
    const timingValue = useAnimatedValue(0);
    const decayValue = useAnimatedValue(0);

    const startSpring = () => {
        Animated.spring(springValue, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start()
    };

    const startTiming = () => {

    }

    const startDecay = () => {
        Animated.decay(decayValue, {
            velocity: 2,
            deceleration: 0.9,
            useNativeDriver: true
        }).start();
    }

    const animatedX = decayValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 300]
    })

    const animtedSpringX = {
        transform: [{
            translateY: springValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200]
            })
        }]
    };


    useEffect(() => {
        startDecay();
        startSpring();
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box1, { transform: [{ translateX: animatedX }] }]} />
            <Animated.View style={[styles.box2, animtedSpringX]} />
            <Animated.View style={[styles.box3]} />
        </View>
    )
}


export default AnimTypes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    box1: {
        backgroundColor: 'yellow',
        width: 100,
        height: 100
    },
    box2: {
        backgroundColor: 'blue',
        width: 100,
        height: 100
    },
    box3: {
        backgroundColor: 'green',
        width: 100,
        height: 100
    },
})