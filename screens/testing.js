import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const App = () => {
    const [isAnnotating, setIsAnnotating] = useState(false);
    const [rectangleCoordinates, setRectangleCoordinates] = useState({});

    const handleAnnotatePress = () => {
        // Toggle annotation mode
        setIsAnnotating(!isAnnotating);
    };

    const handleImagePress = (event) => {
        if (isAnnotating) {
            // Get the coordinates of the press event
            const { locationX, locationY } = event.nativeEvent;
            setRectangleCoordinates({ x: locationX, y: locationY });
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handleAnnotatePress}>
                <Text>Annotate</Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/pyramids.jpg')}
                onPress={handleImagePress}
            />
            {isAnnotating && (
                <Svg>
                    <Rect
                        x={rectangleCoordinates.x}
                        y={rectangleCoordinates.y}
                        width={100} // adjust according to your requirement
                        height={100} // adjust according to your requirement
                        fill="transparent"
                        stroke="red"
                        strokeWidth="2"
                    />
                </Svg>
            )}
        </View>
    );
};

export default App;