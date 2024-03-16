import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function App(props) {

    const navigation = useNavigation()
    const route = props.route;
    const { selected } = route.params;


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
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >
            </ImageBackground>
            <View style={style.container}>

                <TouchableOpacity onPress={handlePress} style={[style.imageContainer, { height: imageHeight }]}>
                    <Image
                        style={{ width: imageWidth, height: imageHeight }}
                        source={{ uri: selected.uri }}
                        onError={(error) => console.log('Image error:', error)}
                        onLoad={handleImageLoad}
                    />
                    <View style={[style.dot, { left: coordinates.x - 5, top: coordinates.y - 5 }]} />
                </TouchableOpacity>
                <View>
                    <Image source={{ uri: selected.uri }} />
                </View>


            </View>

        </View>

    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
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
}
)