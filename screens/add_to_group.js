import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, ImageBackground, Pressable } from 'react-native';
import url from '../api_url';
import { useNavigation } from '@react-navigation/native';

const App = (props) => {

    const navigation = useNavigation();
    const { selectedGroup, selectedIndividual } = props.route.params;

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [processedImageUrl, setProcessedImageUrl] = useState();

    useEffect(() => {
        if (selectedIndividual && selectedGroup) {
            Image.getSize(selectedGroup.uri, (width, height) => {
                const screenWidth = Dimensions.get('window').width;
                const aspectRatio = width / height;
                const calculatedHeight = screenWidth / aspectRatio;
                setImageWidth(screenWidth);
                setImageHeight(calculatedHeight);
                //console.log('Image dimensions:', width, height);
            }, (error) => {
                console.log('Error getting image dimensions:', error);
            });
        }
    }, [selectedGroup]);


    const handlePress = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCoordinates({ x: locationX, y: locationY });
        console.log('Coordinates:', locationX, locationY);
    };

    const handleMerge = async () => {
        try {

            console.log("x,y", coordinates.x, coordinates.y)
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
            formData.append('x', coordinates.x);
            formData.append('y', coordinates.y);

            const response = await fetch(`${url}addToGroup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                console.log(response)
                const result = await response.json();
                console.log(result);

                navigation.navigate('resultant_removeFromGroup', { selected: `data:image/png;base64,${result.result_image_base64}` })
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={styles.background}
            >
            </ImageBackground>

            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={handlePress} style={[styles.imageContainer, { height: imageHeight }]}>
                    <Image
                        style={{ width: imageWidth, height: imageHeight }}
                        source={{ uri: selectedGroup.uri }}
                        onError={(error) => console.log('Image error:', error)}
                    />
                    <View style={[styles.dot, { left: coordinates.x - 5, top: coordinates.y - 5 }]} />
                </TouchableOpacity>
                <Pressable onPress={handleMerge}
                    style={{ alignItems: 'center', backgroundColor: '#AC326A', padding: 15, width: '40%', marginVertical: 30, borderRadius: 30 }}>
                    <Text style={{ color: 'white', fontWeight: '800' }}>Merge</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: '#fff',
        position: 'relative',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        elevation: 5,
        borderRadius: 10,
        position: 'absolute',
    },
});
