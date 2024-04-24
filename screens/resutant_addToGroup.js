import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function App(props) {
    const navigattion = useNavigation();
    const { selected } = props.route.params;
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
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
    return (
        <View>
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
})