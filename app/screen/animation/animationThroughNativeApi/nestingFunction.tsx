import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// loop, parrelle, sequence, delay, stagger
// 📌 Explanation of Animation Helpers

// Animated.sequence([...])
// Runs animations one after another (in order).

// Animated.parallel([...])
// Runs multiple animations at the same time.

// Animated.stagger(time, [...])
// Starts animations in order, but with a delay (time) between each start.

// Animated.delay(time)
// Adds a delay before the next animation starts (used inside sequence).

// Animated.loop(animation, {iterations})
// Repeats an animation (by default forever, or you can set number of iterations).

const NestingFunction = () => {
    const animatedValue1 = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Example: Sequence of animations
        Animated.sequence([
            Animated.timing(animatedValue1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.delay(500), // wait
            Animated.parallel([
                Animated.spring(animatedValue1, {
                    toValue: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue2, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            // Loop the whole thing
            Animated.loop(
                Animated.stagger(300, [
                    Animated.timing(animatedValue1, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue1, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        opacity: animatedValue1,
                        transform: [
                            {
                                translateY: animatedValue2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -100],
                                }),
                            },
                        ],
                    },
                ]}
            />
        </View>
    );
};

export default NestingFunction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        backgroundColor: "yellow",
        width: 100,
        height: 100,
    },
});
