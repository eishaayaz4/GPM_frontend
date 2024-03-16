import React from 'react'
import { View, Text, StyleSheet, Pressable, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const Splash = (props) => {
    
 //   const navigation = useNavigation()
    return (
        <View>

            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.backgroundImage}>
            </ImageBackground>
            <View style={style.container}>
                <View>
                    <Image
                        source={require('../assets/kodi2.png')}
                        style={{ width: 170, height: 170, alignSelf: 'center', marginTop: 180, }} />
                </View>
                <View style={{ marginBottom: 40, marginTop: 15 }}>
                    <Text style={style.Text}>
                        GROUP PHOTO MANAGER
                    </Text>
                </View>
                <View>
                    <Pressable onPress={() => {
                        props.navigation.navigate('dashboard');
                    }}
                        style={{ backgroundColor: '#AC326A', padding: 20, alignSelf: 'center', borderRadius: 40, margin: 20 }} >
                        <Text style={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: 22, fontWeight: 'bold', paddingHorizontal: 50 }}>
                            GET STARTED
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>


    )
}
const style = StyleSheet.create({
    backgroundImage: {
        height: 900,
        width: 500,
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    Text: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 29,
        fontWeight: 'bold',
        fontFamily: 'Poppins', marginTop: 20,
        padding: 20
    }
})
export default Splash;