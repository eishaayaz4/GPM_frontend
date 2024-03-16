import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
export default function App() {
    const [option, setoption] = useState('Batsman');
    const optionsObject = {
        "1": "Bowler",
        "2": "Batsman",
        "3": "AllRounder"
    };

    const handleOptionChange = (itemValue, itemIndex) => setoption(itemValue)

    return (
        <View style={styles.container}>

            <Text>Select Option</Text>
            <Picker
                style={styles.pickerStyles}
                selectedValue={option}
                onValueChange={handleOptionChange}>

                {
                    Object.entries(optionsObject).map(([key, value]) => {

                        return (<Picker.Item label={value} value={key} key={key} />)


                    })
                }


            </Picker>
            <Text>selected Key: {option} and Selected Value: {optionsObject[option]}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerStyles: {
        width: '70%',
        backgroundColor: 'gray',
        color: 'white'
    }
});