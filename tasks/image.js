import React from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from "./MainPage";
import userAlbum from "./userAlbum";
function Image() {
    const Stack = createStackNavigator();
    return (

        <NavigationContainer><Stack.Navigator>
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="userAlbum" component={userAlbum} />
        </Stack.Navigator></NavigationContainer>
    )
}
export default Image