import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Pressable, ImageBackground, Image, ScrollView, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const App = (props) => {

    const navigation = useNavigation()
    const { user_id } = props.route?.params || { user_id: 0 };
    useEffect(() => {
        console.log("---------", user_id)
    }, [])


    //ab krn cheeck set krn isko b kis ko? text ko kon sa text oh acha ? bas? rukn login kr k dkh ln. okk fit thnkuuuuuuuu
//welcome A????


    return (
        <ImageBackground
            source={require('../assets/Imagebg.png')}
            style={style.background}
        >
            < View style={[style.container, { flex: 1 }]} >
                <View style={style.draft}>
                    <Text style={{ color: '#ac326a', fontSize: 18, fontFamily: 'Poppins Bold', fontWeight: 'bold' }}>
                        DRAFTS
                    </Text>
                    <Image
                        source={require('../assets/drafts.png')}
                        style={{ height: 30, width: 30, resizeMode: 'contain', marginLeft: 150 }}
                    />
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => navigation.navigate('background', { user_id: user_id })} style={style.box}>
                            <Image
                                source={require('../assets/gallery1.png')}
                                style={style.image}
                            />
                            <Text style={style.label}>BACKGROUND</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('celebrity', { user_id: user_id })} style={[style.box, {}]}>
                            <Image
                                source={require('../assets/star.png')}
                                style={style.image}
                            />
                            <Text style={style.label}>CELEBRITY SHOT</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => navigation.navigate('group_photo', { user_id: user_id })} style={style.box}>
                            <Image
                                source={require('../assets/AddGroup.png')}
                                style={style.image}
                            />
                            <Text style={style.label}>ADD TO GROUP</Text>
                        </Pressable>
                        <Pressable style={style.box} onPress={() => { navigation.navigate('remove_from_group', { user_id: user_id }) }}>

                            <Image
                                source={require('../assets/removeUSer.png')}
                                style={style.image}
                            />
                            <Text style={style.label}>REMOVE FROM</Text>
                            <Text style={style.label}>Group</Text>
                        </Pressable>
                    </View>
                </View>
                <View>
                    {user_id == 0 && (
                        <>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('signUp');
                                }}
                                style={{ backgroundColor: '#FCFCFC', paddingHorizontal: 50, paddingVertical: 20, margin: 20, marginHorizontal: 35, borderRadius: 35, marginTop: 50 }} >
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18, color: '#AC326A' }} onPress={() => { navigation.navigate('signUp') }}>REGISTER NEW ACCOUNT</Text></Pressable>
                            <View style={style.loginText}>
                                <Text style={{ fontSize: 17, marginLeft: 15, color: '#4C4B49' }}>Already have an account?  </Text>
                                <Pressable><Text style={{ color: '#ac326a', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }} onPress={() => {
                                    navigation.navigate('Login');
                                }}>LOGIN</Text></Pressable>
                            </View>
                        </>
                    )}
                </View>
            </View >

            <View style={style.bottomBar}>
                <Pressable onPress={() => navigation.navigate('dashboard')}>
                    <Image source={require('../assets/home.png')} style={style.icon} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('history', { user_id: user_id })}>
                    <Image source={require('../assets/history.png')} style={style.icon} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('asset', { user_id: user_id })}>
                    <Image source={require('../assets/asset.png')} style={style.icon} />

                </Pressable>
            </View>

        </ImageBackground >
    )
}
const style = StyleSheet.create({
    background: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    draft: {
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 50,
        paddingVertical: 25,
        margin: 20,
        borderRadius: 15,
        elevation: 3,
        flexDirection: 'row'
    },
    box: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginTop: 30,
        marginLeft: 25,
        elevation: 3,
        width: '40%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        marginHorizontal: 50,
        flexDirection: 'row'
    },
    image: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    label: {
        fontSize: 15,
        color: '#AC326A',
        textAlign: 'center',
        fontFamily: 'Poppins Regular'
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        height: 60,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
}
)
export default App;