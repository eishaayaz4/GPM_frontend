import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
export default function App() {
    const [name, setName] = useState('')
    const [color, setColor] = useState(false)
    const users = [
        {
            id: 1,
            name: "Ali"
        },
        {
            id: 2,
            name: "eisha"
        },
        {
            id: 3,
            name: "asma"
        },
        {
            id: 4,
            name: "amna"
        },
        {
            id: 5,
            name: "zainab"
        }
    ]
    const handleButton = () => {
        for (let u of users) {
            setName(u.name)
        }
        console.log(name)
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={handleButton} style={{ backgroundColor: "yellow",padding:15 }} >
                <Text style={{fontSize:17,fontWeight:'bold'}}>Get last user in the list</Text>
            </Pressable>
            <Text style={{margin:20,fontSize:17}}>
                Last user is :{name}
            </Text>
        </View>
    )
}