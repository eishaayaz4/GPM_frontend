import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, TouchableOpacity, TextInput, ImageBackground, Image, Alert } from 'react-native'
import url from '../api_url';
import { useNavigation } from '@react-navigation/native';

export default function App() {
const navigation=useNavigation()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    
    const handleSignUp = async () => {
        console.log(name,email,password,confirmPassword)
        if (!name || !email || !password ||!confirmPassword) {
            Alert.alert("Fill the required fields")
        } else {
            if (password == confirmPassword) {
                try {

                    await fetch(`${url}SignUp`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({

                            name: name,
                            email: email,
                            password: password

                        }),
                    });
                    console.log("added...")
                    Alert.alert("Added successfully...")
                }
                catch (error) {
                    console.error(error);
                }    
            } else {
                Alert.alert("Password doesn't match")
            }
           
        }



    }


    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >

            </ImageBackground>
            <View style={style.container}>
                <View>
                    <Image
                        source={require('../assets/signup.png')}
                        style={{ height: 230, width: 230, alignSelf: 'center' }}
                    />
                </View>
                <View style={{ marginTop: 22 }}>


                    {/* <Text style={style.label}>Name</Text> */}
                    <View style={style.textContainer}>
                        <Image source={require('../assets/profile.png')}
                            style={{ tintColor: '#4C4B49', height: 25, width: 25, marginBottom: 5 }} />
                        <TextInput placeholder='Name' placeholderTextColor={'#4C4B49'} onChangeText={val => setName(val)}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }} ></TextInput>

                    </View>

                    {/* <Text style={style.label}>Email</Text> */}
                    <View style={style.textContainer}>
                        <Image source={require('../assets/Email.png')}
                            style={{ tintColor: '#4C4B49', height: 25, width: 25, }} />
                        <TextInput placeholder='Email' placeholderTextColor={'#4C4B49'} onChangeText={val => setEmail(val)}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }} ></TextInput>

                    </View>

                    {/* <Text style={style.label}>Password</Text> */}
                    <View style={style.textContainer}>
                        <Image source={require('../assets/pswd.png')}
                            style={{ tintColor: '#4C4B49', height: 25, width: 25, }} />
                        <TextInput placeholder='Password'
                            placeholderTextColor={'#4C4B49'}
                            secureTextEntry
                            onChangeText={val => setPassword(val)}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }} ></TextInput>

                    </View>

                    {/* <Text style={style.label}>Confirm Password</Text> */}
                    <View style={style.textContainer}>
                        <Image source={require('../assets/pswd.png')}
                            style={{ tintColor: '#4C4B49', height: 25, width: 25, }} />
                        <TextInput
                            placeholder='Confirm Password'
                            placeholderTextColor={'#4C4B49'}
                           secureTextEntry
                            
                            onChangeText={val => setConfirmPassword(val)}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }} ></TextInput>

                    </View>
                    <View >
                        <Pressable
                            style={{ backgroundColor: '#AC326A', padding: 15, margin: 15, marginHorizontal: 65, borderRadius: 35 }} onPress={handleSignUp}>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Register</Text></Pressable>
                        <View style={style.loginText}>
                            <Text style={{ fontSize: 16, marginLeft: 15, color: '#4C4B49' }}>Already have an account?  </Text>
                            <Pressable><Text style={{ color: '#ac326a', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }} onPress={()=>navigation.navigate('Login')}>Login</Text></Pressable>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {

        paddingHorizontal: 20,
        paddingVertical: 1,
        backgroundColor: "transparent"

    },
    textContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FCFCFC',
        paddingVertical: 7,
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 3

    },
    loginText: {
        marginHorizontal: 50,

        flexDirection: 'row'
    },
    background: {
        height: 900,
        width: 500,
        resizeMode: 'cover',
        flex: 1
    },
    label: {
        fontSize: 17,
        paddingHorizontal: 10,
        marginBottom: 7,
        fontWeight: 'bold'
    }
})