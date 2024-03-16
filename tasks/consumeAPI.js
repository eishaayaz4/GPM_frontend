
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, Button } from 'react-native';



export default App = () => {
    const [department, setDepartment] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [DepartmentName, setDepartmentName] = useState('')


    const postNewDepartment = () => {
        //let DepartmentName="test"
        try {
            console.log('Post Called')
            fetch('http://192.168.137.14/APIDemo/api/Department/post', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    name: DepartmentName,


                }),
            });
            console.log("posted...")
            getAllDepartments()
        }
        catch (error) {
            console.error(error);
        }


    }

    function test() {
        //todo
    }

    const getAllDepartments = async () => {
        try {
            const response = await fetch('http://192.168.137.14/APIDemo/api/Department/get');
            const json = await response.json();
            setDepartment(json)
            setLoading(false);
            console.log(json)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {


        getAllDepartments();

    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <Text>Department Name:</Text>
            <TextInput onChangeText={(value) => setDepartmentName(value)} style={{ borderWidth: 2, borderColor: 'black' }} />
            <Button title='Add Department' onPress={() => postNewDepartment()} />
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={department}
                    keyExtractor={({ ID }, index) => ID}
                    renderItem={({ item }) => (
                        <Text style={{ fontSize: 20, backgroundColor: 'blue', color: 'white' }}>{item.name}</Text>
                    )}
                />
            )}
        </View>
    );
};