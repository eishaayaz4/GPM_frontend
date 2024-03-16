import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const App = () => {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const handlePress = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCoordinates({ x: locationX, y: locationY });
        console.log('Coordinates:', locationX, locationY);
    };

    const handleImageLoad = (event) => {
        const { width, height } = event.nativeEvent.source;
        const screenWidth = Dimensions.get('window').width;
        const aspectRatio = width / height;
        const calculatedHeight = screenWidth / aspectRatio;
        setImageWidth(screenWidth);
        setImageHeight(calculatedHeight);
    };

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>Remove Person from Group</Text>
            </View>
            <TouchableOpacity onPress={handlePress} style={[styles.imageContainer, { height: imageHeight }]}>
                <Image
                    style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: 'https://images.unsplash.com/photo-1709596046137-8f2d90fc973d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D' }}
                    onError={(error) => console.log('Image error:', error)}
                    onLoad={handleImageLoad}
                />
                <View style={[styles.dot, { left: coordinates.x - 5, top: coordinates.y - 5 }]} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', backgroundColor: 'pink', padding: 15, width: '40%', marginVertical: 30, borderRadius: 30 }}>
                <Text style={{ color: '#000', fontWeight: '800' }}>Annotate</Text>
            </View>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    heading: {
        backgroundColor: 'skyblue',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 3,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#fff',
        position: 'relative',
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