
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, useAnimatedValue, Easing, PanResponder } from "react-native"



const InterPolation = () => {
    const animatedValue = useAnimatedValue(0);
    const pan = useRef(new Animated.ValueXY()).current;

    const defferentialClampY = useRef(Animated.diffClamp(pan.y, -500, 500)).current;
    const defferentialClampX = useRef(Animated.diffClamp(pan.x, -500, 500)).current;


    const startInterpolation = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start();
    };


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: pan.x,
                dy: pan.y
            }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false
            }).start()
        }
    });


    useEffect(() => {
        startInterpolation();
    })




    return (
        <View style={styles.container}>
            <Text>InterPolation</Text>
            <Animated.View style={[styles.box,
            {
                transform: [
                    {
                        translateX: animatedValue.interpolate(
                            {
                                inputRange: [0, 1],
                                outputRange: [-200, 200],
                                //extrapolateLeft: 'clamp'
                                extrapolate: 'clamp' // clamp will be in same range, extend: go to out of range, idenity: same output
                            }
                        )
                    }
                ]
            }
            ]}></Animated.View>

            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.box2, {
                    transform: [
                        {
                            translateY: defferentialClampY,
                        },
                        { translateX: defferentialClampX }
                    ]
                }]} />
        </View>
    )
};



export default InterPolation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: 'yellow',
        width: 150,
        height: 150,
        borderRadius: 300
    },
    box2: {
        backgroundColor: 'blue',
        width: 150,
        height: 150,
        borderRadius: 300,
        marginTop: 20,
    }
})