import { View, Text, StyleSheet } from "react-native"

const Temp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  )
}

export default Temp;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black'
  }
});
