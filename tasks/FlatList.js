import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';

export default function App() {
    const fruit = [
        { "id": 1, "name": "Banana", "season": "Spring" },
        { "id": 2, "name": "Apple", "season": "All      " },
        { "id": 3, "name": "Orange", "season": "Winter" },
        { "id": 4, "name": "Peach", "season": "Winter" },
        { "id": 5, "name": "Banana", "season": "Spring" },
        { "id": 6, "name": "Apple", "season": "All      " },
        { "id": 7, "name": "Orange", "season": "Winter" },
        { "id": 8, "name": "Peach", "season": "Winter" },
        { "id": 9, "name": "Banana", "season": "Spring" },
        { "id": 10, "name": "Apple", "season": "All      " },
        { "id": 11, "name": "Orange", "season": "Winter" },
        { "id": 12, "name": "Peach", "season": "Winter" },
        { "id": 13, "name": "Banana", "season": "Spring" },
        { "id": 14, "name": "Apple", "season": "All      " },
        { "id": 15, "name": "Orange", "season": "Winter" },
        { "id": 16, "name": "Peach", "season": "Winter" },

    ];

    const renderFruit = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 5 }}> {item.id}</Text>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 40 }}>{item.name}</Text>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 50, }}> {item.season}</Text>
                <Pressable style={{ marginLeft: 30, marginRight: 20 }}><Text>Delete</Text></Pressable>
            </View>
        );
    }

    return (
        <View>
            <View>
                <View>
                    <Text style={{ padding: 20, fontWeight: 'bold', fontFamily: 'poppins', backgroundColor: 'yellow', fontSize: 20 }}>Fruits With Seasons</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{ padding: 4, marginLeft: 10, marginRight: 5, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>ID</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Name</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Season</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Action</Text>

                </View>

            </View>

            <View style={styles.container}>

                <FlatList
                    data={fruit}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFruit}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        fontWeight: 'bold',
        borderRadius: 23,

    },
    row: {

        flexDirection: 'row',
        backgroundColor: '#d2d8d9'
    }
});
