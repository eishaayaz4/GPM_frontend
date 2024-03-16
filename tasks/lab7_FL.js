import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';

export default function App() {
    const emp = [
        { "id": 1, "name": "Eisha", "Age": 22, "salary": 20000 },
        { "id": 2, "name": "Rafia", "Age": 22, "salary": 20000 },
        { "id": 3, "name": "Anam", "Age": 22, "salary": 20000 },
        { "id": 4, "name": "Asma", "Age": 22, "salary": 20000 },
        { "id": 5, "name": "Zubair", "Age": 22, "salary": 20000 },
        { "id": 6, "name": "Zahid", "Age": 22, "salary": 20000 },
        { "id": 7, "name": "Eisha", "Age": 22, "salary": 20000 },
        { "id": 8, "name": "Rafia", "Age": 22, "salary": 20000 },
        { "id": 9, "name": "Anam", "Age": 22, "salary": 20000 },
        { "id": 10, "name": "Asma", "Age": 22, "salary": 20000 },
        { "id": 51, "name": "Zubair", "Age": 22, "salary": 20000 },
        { "id": 61, "name": "Zahid", "Age": 22, "salary": 20000 },
        { "id": 11, "name": "Eisha", "Age": 22, "salary": 20000 },
        { "id": 21, "name": "Rafia", "Age": 22, "salary": 20000 },
        { "id": 31, "name": "Anam", "Age": 22, "salary": 20000 },
        { "id": 44, "name": "Asma", "Age": 22, "salary": 20000 },
        { "id": 54, "name": "Zubair", "Age": 22, "salary": 20000 },
        { "id": 67, "name": "Zahid", "Age": 22, "salary": 20000 },

    ]

    const renderEmp = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 5 }}> {item.id}</Text>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 40 }}>{item.name}</Text>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 50, }}> {item.Age}</Text>
                <Text style={{ fontSize: 15, padding: 4, marginLeft: 50, }}> {item.salary}</Text>
                <Pressable onPress={() => Alert.alert("Delete" + item.name + " ?")} style={{ marginLeft: 30, marginRight: 20, backgroundColor: 'skyblue', borderWidth: 1, borderColor: 'skyblue' }}><Text>Delete</Text></Pressable>
            </View>
        );
    }

    return (
        <View>
            <View>
                <View>
                    <Text style={{ padding: 20, fontWeight: 'bold', fontFamily: 'poppins', backgroundColor: 'yellow', fontSize: 20 }}>Employees</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{ padding: 4, marginLeft: 10, marginRight: 5, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>ID</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Name</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Age</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Salary</Text>
                    <Text style={{ padding: 4, marginLeft: 55, fontWeight: 'bold', fontFamily: 'poppins', fontSize: 18 }}>Action</Text>


                </View>

            </View>

            <View style={styles.container}>

                <FlatList
                    data={emp}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderEmp}
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
