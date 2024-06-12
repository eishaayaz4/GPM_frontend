import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, PermissionsAndroid, ImageBackground, Image } from 'react-native'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import url from '../api_url';

export default function App(props) {
    const { user_id } = props.route.params
    const navigation = useNavigation()
    const [image, setImage] = useState('')
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
            quality: 1,
            includeBase64: true
        };

        launchImageLibrary(options, (response) => {


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


                setImage({
                    'uri': response.assets[0]?.uri || '',
                    'name': response.assets[0]?.fileName || '',
                    'type': response.assets[0]?.type || ''
                });

                setFilePath(response.assets[0] || {});
            } else {
                alert('No image selected');
            }
        });
    };

    function addAsset() {

        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('image', {
            uri: image.uri,
            name: image.name,
            type: image.type,
        });

        const response = fetch(url + 'AddAsset', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.ok) {
            console.log(" add to asset")
        }

        else {
            console.log("adding asset failed")
        }
        return response
    }


    const handleExtractButtonClick = () => {
        if (user_id && user_id != 0) {
            addAsset()
        }
        navigation.navigate('remove_from_group_test', { selected: image, user_id: user_id });
    };

    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >
            </ImageBackground>
            <View style={style.container}>
                <View style={{ marginTop: 70, paddingHorizontal: 30 }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Poppins Bold', color: 'white' }}>UPLOAD PICTURE</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => { chooseFile('photo') }} style={style.box}>
                        <Image
                            source={require('../assets/upload.png')}
                            style={style.image}
                        />

                    </Pressable>


                </View>

                {image &&
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 80, }}>

                        <Pressable onPress={handleExtractButtonClick} style={{ backgroundColor: '#FFF', padding: 15, margin: 25, marginHorizontal: 250, borderRadius: 150, marginRight: 40, marginTop: 112 }} >
                            <Image source={require('../assets/right.png')} style={{ height: 30, width: 30 }}></Image>
                        </Pressable>
                    </View>
                }
                {image &&

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 80, }}>

                        <View style={style.SelectBox}>

                            <Image
                                source={{ uri: image.uri }}
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
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },

    image: {
        width: 60,
        height: 60,
        marginBottom: 10,

    },
    SelectImage: {
        width: 100,
        height: 100,
        borderRadius: 10,

    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        elevation: 3,
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: '#FCFCFC',
        borderRadius: 25,
        marginTop: 30,
        marginLeft: 25,
        elevation: 5,
        width: '80%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
}
)