import React, { useState, useEffect } from 'react'
import { Text, TextInput, View,RadioButton,Pressable } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
export default function App() {
    return (
        <View>
            <View>
                <Picker>
                    <Picker.Item label='' value={1}></Picker.Item>

                </Picker>
                <Text>
                    /
                </Text>
                <Picker>
                    <Picker.Item label='' value={1}></Picker.Item>

                </Picker>
                <Text>
                    /
                </Text>
                <Picker>
                    <Picker.Item label='' value={1}></Picker.Item>
                </Picker>
            </View>
       </View> 
    )
}


