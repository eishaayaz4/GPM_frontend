import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, ImageBackground, Pressable,StyleSheet } from 'react-native'


export default function App() {
    useEffect(() => {

    }, [])   


    const GetData = async() => {
        try {
            const response = await fetch(`${url}GetAllBackgrounds`);
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                console.log("bg", data)
            } else {
                throw new Error('Failed to fetch backgrounds.');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={styles.background}
            >
            </ImageBackground>

            <View style={styles.imageContainer}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },
    imageContainer: {
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 40,
        paddingVertical: 30,
        margin: 40,
        borderRadius: 10
        
    }
})