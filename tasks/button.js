import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

const App = () => {

    return (
        <View>
            <TouchableOpacity style={styles.mycolor}><Text>Click Me</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mycolor: {
        backgroundColor: 'blue',
    }
});

export default App;