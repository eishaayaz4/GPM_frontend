import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
export default function App() {

    const [name, setName] = useState('')
    const [age,setAge] = useState(0)
    return (
        <View style={{ felx: 1 }}>
            <Text>
                Name:
            </Text>
            <TextInput />
            <Text>
                Age:
            </Text>
            <TextInput />
            <Picker>
                <Picker.Item></Picker.Item>
</Picker>
        </View>   
    )
    
}