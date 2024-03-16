import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, ImageBackground, Image } from 'react-native'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

export default function App() {

    const [individualImage, setIndividualImage] = useState('')
    const [groupImage, setGroupImage] = useState('')
    const [filePath, setFilePath] = useState()



    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );

                // If WRITE_EXTERNAL_STORAGE Permission is granted or denied
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission granted
                    return true;
                } else {
                    // Permission denied or not prompted
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return true;
        }

    };

    const chooseFile = (type) => {
        requestExternalWritePermission()
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true
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
                        {!groupImage ? (
                            <View>
<Image
                            source={require('../assets/upload.png')}
                            style={style.image}
                                />
                                <Text style={style.label}>GROUP PICTURE</Text>
                            </View>
                        )    
                            : (
                                <Image
                                    source={{uri:groupImage.uri}}
                                    style={style.box}
                                />    
                    )}
                        
                    </Pressable>
                </View>


            </View>



        </View>

    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 30,
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
    uploadBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 30,
        // marginVertical: 200,
        elevation: 5,
        width: 180,
        height: 210,

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