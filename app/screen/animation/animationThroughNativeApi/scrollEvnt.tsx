import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Animated, useAnimatedValue, Dimensions } from "react-native";

// vcf
const HEADER_HEIGHT = 80;
const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);



const ScrollEvent = () => {

    const scrollY = useAnimatedValue(0);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, 40],
        extrapolate: 'clamp'

    })


    const renderItem = ({ item }: any) => {


        return <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    }


    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Text style={[styles.headerText]}>Collapsible</Text>
            </Animated.View>
            <Animated.FlatList
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 10 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        { nativeEvent: { contentOffset: { y: scrollY } } }
                    ],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />
        </View>
    )
};


export default ScrollEvent;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    itemContainer: {
        backgroundColor: '#444',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.9,
    },
    itemText: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center'
    }
})
