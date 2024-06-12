import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Image, Dimensions, ImageBackground, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import url from '../api_url';
export default function App(props) {
    const navigattion = useNavigation();
    const { selected, user_id } = props.route.params;
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const description = "Person removed from a group photo"
    useEffect(() => {
        if (selected) {
            Image.getSize(selected, (width, height) => {
                const screenWidth = Dimensions.get('window').width;
                const aspectRatio = width / height;
                const calculatedHeight = screenWidth / aspectRatio;
                setImageWidth(screenWidth);
                setImageHeight(calculatedHeight);
                console.log('Image dimensions:', width, height);

            }, (error) => {
                console.log('Error getting image dimensions:', error);
            });
        }
    }, [selected]);

    const handleInsert = async () => {
        try {
            console.log(user_id)
            const formData = new FormData();
            let base64String = selected.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
            while (base64String.length % 4 !== 0) {
                base64String += '=';
            }
            formData.append('image', base64String);
            formData.append('user_id', user_id);
            formData.append('description', description);

            const response = await fetch(url + 'addProcessedImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            console.log('Response:', response);

            if (response.ok) {
                const result = await response.json();
                console.log(result);
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    const handleDownload = () => {
        if (user_id && user_id != 0) {
            downloadImage(selected)
            handleInsert()
        } else {
            downloadImage(selected)
        }
    }


    const downloadImage = async () => {
        try {
            const timestamp = new Date().getTime();

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to your storage to download photos.',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Strip the data URL prefix if present
                const base64Data = selected.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
                const imagePath = RNFetchBlob.fs.dirs.DownloadDir + '/image' + timestamp + '.jpg'; // Change the file name and extension if needed
                RNFetchBlob.fs.writeFile(imagePath, base64Data, 'base64');
                console.log(imagePath)
                Alert.alert('Image Downloaded Successfully');
                navigattion.navigate('dashboard', { user_id: user_id })
            } else {
                Alert.alert('Storage Permission Denied');
            }
        } catch (error) {
            console.error('Error downloading image:', error);
            Alert.alert('Error downloading image');
        }
    };


    return (
        <View style={{ justifyContent: 'space-between' }}>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={styles.background}
            >
            </ImageBackground>


            {selected && selected.startsWith('data:image/jpeg;base64,') ? (
                <Image
                    style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: selected }}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: selected }}
                    resizeMode="contain"
                />
            )}
            <View style={{
                alignItems: 'center',
                margintop: 80,
            }}>
                <TouchableOpacity onPress={() => handleDownload()} style={styles.button}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Download</Text>
                </TouchableOpacity>
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
    button: {
        backgroundColor: '#ac326a',
        width: '50%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 40,
    }
})