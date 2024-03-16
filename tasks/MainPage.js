import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, FlatList, Text, View, TextInput, Button, StyleSheet, TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid
} from 'react-native';

global.baseUrl = "http://88.88.88.118/APIDemo/"
export default function MainPage({ navigation }) {
    //     const Nav = () => {
    //         navigation.navigate("userAlbum")
    //     }
    const [name, setName] = useState("haris")
    const [age, setAge] = useState("23")
    const[img,setImage]=useState()
  
    const postNewUser = () => {

        try {
            console.log('Post Called')
            fetch(global.baseUrl + 'api/User/Post', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({

                    name: name,
                    age: age,
                }),
            });
            console.log("posted...")

        }
        catch (error) {
            console.error(error);
        }




    }
    const getAllUsers = async () => {
        try {
            const response = await fetch(global.baseUrl + 'api/User/Get');
            const json = await response.json();
            setUser(json)
            console.log(json)
        } catch (error) {
            console.error(error);
        }
    }
    const postImage = async () => {
        alert(JSON.stringify(img))
        console.log(JSON.stringify(img))
        let data = new FormData()
        data.append('image', img)
        let response = await fetch(global.baseUrl + 'api/User/UploadImage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: data
        })
        let json = await response.json()
        console.log(json)
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

            <Text style={{ color: 'black' }}>Name: {name}</Text>
            <Text style={{ color: 'black' }}>Age: {age}</Text>
            <Image source={require('../assets/anushka.jpg')} style={{ width: 100, height: 100 }} />
          <Text>

            </Text>
            <Button title="Upload All" onPress=
                
                {postNewUser} />
            <Text>
                
</Text>
            <Button title="Get All users" onPress={getAllUsers} />
        </View>

    )
}
