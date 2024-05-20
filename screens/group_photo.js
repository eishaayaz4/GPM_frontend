import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, ImageBackground, PermissionsAndroid, Image } from 'react-native'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';

export default function App(props) {

    const navigation = useNavigation();
    const { user_id } = props.route.params
    const [individualImage, setIndividualImage] = useState('')
    const [groupImage, setGroupImage] = useState('')
    const [filePath, setFilePath] = useState('')
    useEffect(() => {
        console.log("---------", user_id)
    }, [])

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }

            if (response.assets && response.assets.length > 0) {
                const selectedImage = {
                    'uri': response.assets[0]?.uri || '',
                    'name': response.assets[0]?.fileName || '',
                    'type': response.assets[0]?.type || ''
                };

                if (type === 'individual') {
                    setIndividualImage(selectedImage);
                } else if (type === 'group') {
                    setGroupImage(selectedImage);
                }

                setFilePath(response.assets[0] || {});
            } else {
                alert('No image selected');
            }
        });
    };


    const handleExtractButtonClick = () => {
        // Navigate to the next screen and pass the 'image' state as a parameter
        navigation.navigate('add_to_group_test', { selectedGroup: groupImage, selectedIndividual: individualImage, user_id: user_id });
    };

    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >
            </ImageBackground>
            <View style={style.container}>
                <View style={{ marginTop: 200, paddingHorizontal: 30 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins Bold', color: 'white' }}>UPLOAD PICTURES</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { chooseFile('individual') }} style={style.box}>
                        <Image
                            source={require('../assets/upload.png')}
                            style={style.image}
                        />
                        <Text style={style.label}>INDIVIDUAL</Text>
                    </Pressable>

                    <Pressable onPress={() => { chooseFile('group') }} style={[style.box, {}]}>

                        <Image
                            source={require('../assets/upload.png')}
                            style={style.image}
                        />
                        <Text style={style.label}>GROUP PICTURE</Text>

                    </Pressable>
                </View>
                {groupImage && individualImage &&
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 80, marginLeft: 20 }}>

                        <Pressable onPress={handleExtractButtonClick} style={{ backgroundColor: '#FFF', padding: 15, margin: 20, marginHorizontal: 300, borderRadius: 150, marginRight: 10, marginTop: 120}} >
                            <Image source={require('../assets/right.png')} style={{ height: 30, width: 30 }}></Image>
                        </Pressable>
                    </View>
                }
                {groupImage && individualImage &&

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 80, }}>

                        <View style={style.SelectBox}>

                            <Image
                                source={{ uri: individualImage.uri }}
                                style={style.SelectImage}
                            />
                        </View>

                        <View style={style.SelectBox}>

                            <Image
                                source={{ uri: groupImage.uri }}
                                style={style.SelectImage}
                            />
                        </View>
                    </View>
                }
            </View>
        </View>

    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 20,
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },
    label: {
        fontSize: 15,
        color: '#AC326A',
        textAlign: 'center',
        fontFamily: 'Poppins Regular'
    },
    image: {
        width: 40,
        height: 40,
        marginBottom: 10,

    },
    SelectImage: {
        width: 100,
        height: 100,
        borderRadius: 10,

    },
    uploadBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 30,
        // marginVertical: 200,
        elevation: 5,
        width: 180,
        height: 210,

    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 20,
        elevation: 3,
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginTop: 30,
        marginLeft: 25,
        elevation: 3,
        width: '40%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
}
)