import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, FlatList, Pressable, StyleSheet, Image, ImageBackground } from 'react-native';
import url from '../api_url';
import { useNavigation } from '@react-navigation/native';


const Login = (props) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${url}Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                
            });
console.log(response)
            if (response.ok) {
                const result = await response.json();
                console.log(result);

                if (result.role=== 'admin') {
                    navigation.navigate('view_template');
                } else {
                    navigation.navigate('dashboard');
                }
            } else {
                console.error('Login failed:', result.Message);
             }
        } catch (error) {
            console.error('Error:', error);
         }
     };



    return (
        <ImageBackground
            source={require('../assets/Imagebg.png')}
            style={styles.backgroundImage}
        >

            <View style={styles.container}>

                <View>
                    <Image
                        source={require('../assets/login.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.InputContainer}>

                        <Image
                            source={require('../assets/Email.png')}
                            style={{ tintColor: '#4C4B49', height: 22, width: 22 }}
                        />
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={'#4C4B49'}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }}
                            onChangeText={(text) => setEmail(text)}
                        ></TextInput>
                    </View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.InputContainer}>

                        <Image
                            source={require('../assets/pswd.png')}
                            style={{ tintColor: '#4C4B49', height: 22, width: 22 }}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder='Password'
                            placeholderTextColor={'#4C4B49'}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }}
                            onChangeText={(text) => setPassword(text)}
                        ></TextInput>
                    </View>
                </View>
                <View >
                    <Pressable style={{ backgroundColor: '#AC326A', padding: 15, margin: 20, marginHorizontal: 65, borderRadius: 35 }} onPress={handleLogin}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Login</Text>
                    </Pressable>
                    <View style={styles.loginText}>
                        <Text style={{ fontSize: 16, marginLeft: 15, color: '#4C4B49' }}>Don't have an account?  </Text>
                        <Pressable><Text style={{ color: '#ac326a', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }} onPress={()=>navigation.navigate('signUp')}>Register</Text></Pressable>
                    </View>

                </View>

            </View >
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "transparent"
    },
    image: {
        height: 300,
        width: 300,
        alignSelf: 'center',
    },
    textContainer: {
        marginTop: 40,


    },
    InputContainer: {
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FCFCFC',
        paddingVertical: 7,
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 2
    },
    loginText: {
        marginHorizontal: 50,

        flexDirection: 'row'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
    }
    , label: {
        fontSize: 16,
        fontFamily: 'poppins',
        color: '#4C4B49',
        marginBottom: 6,
        marginLeft: 10,
        fontWeight: 'bold'
    },
})
export default Login;