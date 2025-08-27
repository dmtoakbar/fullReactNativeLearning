import { useEffect, useRef } from "react";
import { StyleSheet, useAnimatedValue, View, Animated } from "react-native";


const BasicXY = () => {

      const position =  useAnimatedValue(0); // useRef(new Animated.Value(0)).current;

      const position2 =  useAnimatedValue(20);
      const position3 =  Animated.add(position, position2);
      const position4 =  Animated.subtract(position, position2);
      const position5 =  Animated.multiply(position, position2);
      const position6 =  Animated.modulo(position, 1);
      const position7 =  Animated.divide(position, position2);



      const basePosition = useAnimatedValue(50);
      const oscillation = useAnimatedValue(0);
      const combinePosition = Animated.add(basePosition, oscillation);

      const xyValue = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    
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

        const xyValueAnimationStart = () => {
            Animated.timing(xyValue, {
                toValue:{x: 100, y: -200},
                duration: 5000,
                useNativeDriver: true,
            }).start();
        };

        const startOscillation = () => {
            // for loop animation like continue animation(use can also pass iteration to run this looop count time)
            Animated.loop(
                // for sequence animation Animated.sequence
                Animated.parallel([
                    Animated.timing(oscillation, {
                        toValue:150,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(oscillation, {
                        toValue: -150,
                        duration: 2000,
                        useNativeDriver: true,
                    })
                ]), {iterations: 5} // for inifinite , do not use this block {iterations: 5}
            ).start()
        }
    
    
        useEffect(() => {
            startAnimation();
            xyValueAnimationStart();
            startOscillation();
        }, [])


    return (
        <View style={styles.container}>
          <Animated.View style={[styles.box, { marginLeft: position }]}></Animated.View>
          {/* <Animated.View style={[styles.box2, xyValue.getLayout()]}></Animated.View> */}
          <Animated.View style={[styles.box2, {transform: xyValue.getTranslateTransform()}]}></Animated.View>

          <Animated.View style={[styles.circle, {transform: [{translateX: combinePosition}]}]}></Animated.View>
        </View>
    );
};
export default BasicXY;

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
    },
    box2: {
        backgroundColor: 'blue',
        width: 100,
        height: 100
    },
    circle: {
        width: 150,
        height: 150, 
        marginTop: 20,
        borderRadius: 400,
        backgroundColor: 'blue'
    }
});