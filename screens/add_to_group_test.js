import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import url from '../api_url';
const App = (props) => {
    const [loading, setLoading] = useState(false)
    const { selectedGroup, selectedIndividual, user_id } = props.route.params;
    const navigation = useNavigation()
    const [point, setPoint] = useState({ x: null, y: null });
    const [imageHeight, setImageHeight] = useState(null);
    const [actualImageSize, setActualImageSize] = useState({ actualWidth: null, actualHeight: null })

    useEffect(() => {
        console.log("Selected  group Image ======", selectedGroup.uri)
        console.log("Selected  individual Image ====== ", selectedIndividual.uri)
        console.log("user id", user_id)

        Image.getSize(selectedGroup.uri,
            (width, height) => {
                setActualImageSize({ actualWidth: width, actualHeight: height })
                height = ((Dimensions.get('window').width) / (width)) * height
                setImageHeight(height);
            },
            (error) => {
                console.error('Error getting image size:', error);
            }

        );
    }, []);

    const handleImagePress = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        console.log("Marked Points ======", locationX, locationY)
        setPoint({ x: locationX, y: locationY });
    };
    const handleMerge = () => {
        setLoading(true);
        console.log("Selected points ======", actualImageSize.actualHeight, actualImageSize.actualWidth, imageHeight, Dimensions.get('window').width, point.x, point.y)

        const formData = new FormData();
        formData.append('groupImage', {
            uri: selectedGroup.uri,
            name: selectedGroup.name,
            type: selectedGroup.type,
        });
        formData.append('individualImage', {
            uri: selectedIndividual.uri,
            name: selectedIndividual.name,
            type: selectedIndividual.type,
        });
        formData.append('x', point.x);
        formData.append('y', point.y);
        formData.append('imageWidth', Dimensions.get('window').width);
        formData.append('imageHeight', imageHeight);
        formData.append('actualImageWidth', actualImageSize.actualWidth);
        formData.append('actualImageHeight', actualImageSize.actualHeight);

        fetch( url  + 'addToGroup', {
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
                navigation.navigate('resutant_addToGroup', {
                    selected: `data:image/png;base64,${data.result_image_base64}`, x: point.x, y: point.y,
                    prev_imageWidth: Dimensions.get('window').width, prev_imageHeight: imageHeight,
                    actualImageWidth: actualImageSize.actualWidth, actualImageHeight: actualImageSize.actualHeight, selectedGroup, selectedIndividual, user_id: user_id
                });
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error sending image to API:', error);
            });
    };


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={styles.background}
            >
            </ImageBackground>
            <View style={{ flex: 1 }}>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ width: Dimensions.get('window').width, height: imageHeight, resizeMode: 'contain' }}
                        source={{ uri: selectedGroup.uri }}
                        onTouchEnd={handleImagePress}
                        onLayout={(event) => {
                            const { width, height } = event.nativeEvent.layout;
                            
                        }}
                    />
                    {point.x !== null && point.y !== null && (
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                left: point.x - 5,
                                top: point.y - 5
                            }}
                        />
                    )}
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <TouchableOpacity onPress={() => handleMerge()} style={styles.button}>
                            <Text style={{ color: '#fff' }}>Merge</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

    imageContainer: {
        flex: 5,
        position: 'relative',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#ac326a',
        width: '90%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
});

export default App;