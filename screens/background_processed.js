import React from 'react'
import { Text, View, StyleSheet, Pressable, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native'
export default function App() {
    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >
            </ImageBackground>
            <View style={style.container}>
                <View style={style.download}>
                    <Text style={{ color: '#ac326a', fontSize: 18, fontFamily: 'Poppins Bold', fontWeight: 'bold' }}>
                        DOWNLOAD
                    </Text>
                    <Image
                        source={require('../assets/download.png')}
                        style={{ height: 30, width: 30, resizeMode: 'contain', marginLeft: 60 }}
                    />
                </View>
                <View style={style.downloadBox}>
                    <Image
                        source={require('../assets/anushka.jpg')}
                        style={style.downloadImage}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, }}>

                    <View style={style.box}>
                        <Image
                            source={require('../assets/tower.jpg')}
                            style={style.image}
                        />
                        <View style={[style.swipeBox, {
                            left: -55,
                        }]}>

                            <View style={{ position: 'absolute' }}>
                                <Image
                                    source={require('../assets/left.png')}
                                    style={{ height: 20, width: 30 }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={style.box}>
                        <Image
                            source={require('../assets/pyramids.jpg')}
                            style={style.image}
                        />
                        <View style={[style.swipeBox, {
                            right: -15,
                        }]}>
                            <View style={{ position: 'absolute' }}>
                                <Image
                                    source={require('../assets/right.png')}
                                    style={{ height: 20, width: 30 }}
                                />
                            </View>
                        </View>
                    </View>

                </View>


            </View>
        </View >
    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },
    download: {
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 20,
        paddingVertical: 18,
        margin: 20,
        borderRadius: 15,
        marginTop: 50,
        elevation: 3,
        flexDirection: 'row',
        marginRight: 130,
        left: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },

    downloadBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 22,
        marginVertical: 8,
        elevation: 3,
        width: 350,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    downloadImage: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 22,
        marginVertical: 8,
        width: 340,
        height: 290,


    },
    box: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 6,
        marginVertical: 8,
        elevation: 3,
        width: 150,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    swipeBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 25,
        marginLeft: 43,
        elevation: 3,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        opacity: 0.8
    },
    image: {
        width: 140,
        height: 190,
        borderRadius: 12
    },


}
)