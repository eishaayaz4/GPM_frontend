import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
export default function App() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('')
    const [status, setStatus] = React.useState('')
    return (
        <View>
            <View>
                <Text>Name</Text>
                <TextInput></TextInput>
            </View>

            <View>
                <Text>Email</Text>
                <TextInput></TextInput>
            </View>
        </View>

    )
};