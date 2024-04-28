import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, ImageBackground, Pressable } from 'react-native';
import url from '../api_url';
import { useNavigation } from '@react-navigation/native';

const App = (props) => {

    const navigation = useNavigation();
    const { selected } = props.route.params;

    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [processedImageUrl, setProcessedImageUrl] = useState();

    useEffect(() => {
        if (selected) {
            Image.getSize(selected.uri, (width, height) => {
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
    }, [selected]);


    const handlePress = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCoordinates({ x: locationX, y: locationY });
        console.log('Coordinates:', locationX, locationY);
    };

    const handleInsert = async () => {
        try {
            const formData = new FormData();
            formData.append('image_path', {
                uri: selected.uri,
                name: selected.name,
                type: selected.type,
            });
            formData.append('x', coordinates.x);
            formData.append('y', coordinates.y);

            const response = await fetch(`${url}RemoveFromGroupPhoto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            
            if (response.ok) {
                const result = await response.json();
              
                const { result_image_base64 } = result;
                setProcessedImageUrl(`data:image/png;base64,${result_image_base64}`)
                navigation.navigate('remove_from_group_test', { selected: processedImageUrl })
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
                        source={{ uri: selected.uri }}
                        onError={(error) => console.log('Image error:', error)}
                    />
                    <View style={[styles.dot, { left: coordinates.x - 5, top: coordinates.y - 5 }]} />
                </TouchableOpacity>
                <Pressable onPress={handleInsert}
                    style={{ alignItems: 'center', backgroundColor: '#AC326A', padding: 15, width: '40%', marginVertical: 30, borderRadius: 30 }}>
                    <Text style={{ color: 'white', fontWeight: '800' }}>Extract</Text>
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
        backgroundColor: 'yellow',
        elevation: 5,
        borderRadius: 10,
        position: 'absolute',
    },
});
