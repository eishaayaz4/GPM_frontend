import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, Alert, ActivityIndicator, PermissionsAndroid, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import url from '../api_url';
export default function App(props) {
    const navigation = useNavigation();
    let { selected, x, y, prev_imageWidth, prev_imageHeight, actualImageWidth, actualImageHeight, selectedCelebrity, image, user_id, id } = props.route.params;
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [loading, setLoading] = useState(false);
    const description = "Person added with a celebrity"
    useEffect(() => {
        if (selected) {
            console.log("-------", x, y, prev_imageWidth, prev_imageHeight, actualImageWidth, actualImageHeight)
            Image.getSize(selected, (width, height) => {
                const screenWidth = Dimensions.get('window').width;
                const aspectRatio = width / height;
                const calculatedHeight = screenWidth / aspectRatio;
                setImageWidth(screenWidth);
                setImageHeight(calculatedHeight);
                console.log('Image dimensions:', width, height);
                console.log("-------", x, y, prev_imageWidth, prev_imageHeight, actualImageWidth, actualImageHeight)

            }, (error) => {
                console.log('Error getting image dimensions:', error);
            });
        }
    }, [selected]);

    function handleEdit() {
        setLoading(true)
        console.log("-------", user_id, x, y, prev_imageWidth, prev_imageHeight, actualImageWidth, actualImageHeight)

        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', {
            uri: image.uri,
            name: image.name,
            type: image.type,
        });
        formData.append('x', x);
        formData.append('y', y);
        formData.append('imageWidth', prev_imageWidth);
        formData.append('imageHeight', prev_imageHeight);
        formData.append('actualImageWidth', actualImageWidth);
        formData.append('actualImageHeight', actualImageHeight);

        fetch(`${url}MergeWithCelebrity`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Image successfully sent to API:', data);
                navigation.navigate('resultant_addWithCelebrity', {
                    selected: `data:image/png;base64,${data.result_image_base64}`, x: x, y: y,
                    prev_imageWidth: prev_imageWidth, prev_imageHeight: prev_imageHeight, actualImageWidth: actualImageWidth,
                    actualImageHeight: actualImageHeight, selectedCelebrity, image, user_id: user_id, id: id
                });
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error sending image to API:', error);
            });

    }

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
                const imagePath = RNFetchBlob.fs.dirs.DownloadDir + '/image.jpg'; // Change the file name and extension if needed
                RNFetchBlob.fs.writeFile(imagePath, base64Data, 'base64');
                console.log(imagePath)
                Alert.alert('Image Downloaded Successfully');
            } else {
                Alert.alert('Storage Permission Denied');
            }
        } catch (error) {
            console.error('Error downloading image:', error);
            Alert.alert('Error downloading image');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <ImageBackground
                    source={require('../assets/Imagebg.png')}
                    style={styles.background}
                />
            </View>

            <View>
                {selected && (
                    <Image
                        style={{ width: imageWidth, height: imageHeight }}
                        source={{ uri: selected }}
                        resizeMode="contain"
                    />
                )}
            </View>

            <View style={styles.bottomBar}>
                <Pressable onPress={() => x -= 10}>
                    <Image source={require('../assets/moveLeft.png')} style={styles.icon} />
                </Pressable  >
                <Pressable onPress={() => y -= 10} >
                    <Image source={require('../assets/up.png')} style={styles.icon} />
                </Pressable>
                <Pressable onPress={() => y += 10}>
                    <Image source={require('../assets/down.png')} style={styles.icon} />
                </Pressable>
                <Pressable onPress={() => x += 10}>
                    <Image source={require('../assets/moveRight.png')} style={styles.icon} />
                </Pressable>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity onPress={() => handleEdit()} style={styles.button}>
                        <Text style={{ color: '#fff', paddingHorizontal: 80 }}>Edit</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View>

                <TouchableOpacity onPress={() => handleDownload()} style={styles.button}>
                    <Text style={{ color: '#fff', paddingHorizontal: 62 }}>Download</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        alignItems: 'center',
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // Adjust this value as needed
    },
    background: {
        height: 900,
        width: 500,
        flex: 1,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#eaeaea',
        width: '100%',

    },
    icon: {
        width: 30,
        height: 30,
    },
    button: {
        backgroundColor: '#ac326a',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 80,
    }
});
