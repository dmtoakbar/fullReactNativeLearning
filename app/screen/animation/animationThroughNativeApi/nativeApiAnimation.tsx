import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native"
import Basic from "./bsics";
import BasicXY from "./basics-xy";
import { Interpolation } from "@react-spring/native";
import InterPolation from "./interpolation";
import AnimTypes from "./animTypes";
import NestingFunction from "./nestingFunction";
import AnimatedEvent from "./event";
import CustomAnimatedComponent from "./createAnimatedComponent";
import LayoutStrcAnimation from "./laoyoutAnimation";


const AnimatedApi = () => {
    const [position, setPosition] = useState(0);

    // it will run on js thread
    useEffect(() => {
        let interval: NodeJS.Timeout;
        interval = setInterval(() => {
         setPosition(prev => (prev < 200 ? prev + 5 : 0));
        }, 50);

        return ()  => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Animated Through Native Animated Api</Text>
            {/* no library */}
            {/* <View style={[styles.box, {marginLeft: position}]}></View> */}
            {/* animated library */}
            {/* <Basic/> */}
            {/* <BasicXY /> */}
            {/* <InterPolation /> */}
            {/* <AnimTypes /> */}
            {/* <NestingFunction /> */}
            {/* <AnimatedEvent/> */}
            {/* <CustomAnimatedComponent /> */}
            <LayoutStrcAnimation />
        </View>
    );
};


export default AnimatedApi;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        alignItems: 'center'
    },
    box: {
        backgroundColor: 'yellow',
        width: 100,
        height: 100
    }
})