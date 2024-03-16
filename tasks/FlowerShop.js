import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function FlowerShop() {

    const navigation = useNavigation();
const addFlower=()=>{
    navigation.navigate('Addflower')
}
const viewFlower=()=>{
    navigation.navigate('Viewflower')
}
    return (
        <View style={{ flex: 2 }}>
            <View style={{margin: 10,borderWidth:2 }}>
                <Button onPress={addFlower} title='Add Flower'/>

            </View>
            <View style={{margin: 10,borderWidth:2 }}>
            <Button onPress={viewFlower} title='View Flower'/>
                 </View>
        </View>
    );
}
