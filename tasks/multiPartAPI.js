
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, FlatList, Text, View, TextInput, Button, StyleSheet, TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid
} from 'react-native';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

global.baseUrl = "http://192.168.18.68/APIDemo/"

export default App = () => {
    const [department, setDepartment] = useState('');
    const [isLoading, setLoading] = useState(true)
    const [DepartmentName, setDepartmentName] = useState('')
    const [image, setImage] = useState()
    const [filePath, setFilePath] = useState({});

      
    const postNewEmployee = () => {
        //let DepartmentName="test"
        try {
            console.log('Post Called')
            fetch(global.baseUrl + 'api/Department/post', {
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
            getAllEmployees()
        }
        catch (error) {
            console.error(error);
        }


    }

    const postImage = async () => {
        alert(JSON.stringify(image))
        console.log(JSON.stringify(image))
        let data = new FormData()

        data.append('name', DepartmentName)
        data.append('image', image)
        let response = await fetch(global.baseUrl + 'api/Department/UploadImage', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: data
        })
        let json = await response.json()
        console.log(json)
    }
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );

                // If WRITE_EXTERNAL_STORAGE Permission is granted or denied
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission granted
                    return true;
                } else {
                    // Permission denied or not prompted
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return true;
        }

    };


    const chooseFile = (type) => {
        requestExternalWritePermission()
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }

            if (response.assets && response.assets.length > 0) {
                console.log('base64 -> ', response.assets[0].base64);

                setImage({
                    'uri': response.assets[0]?.uri || '',
                    'name': response.assets[0]?.fileName || '',
                    'type': response.assets[0]?.type || ''
                });
                setFilePath(response.assets[0] || {});
            } else {
                alert('No image selected');
            }
        });
    };


    const getAllEmployees = async () => {
        try {
            const response = await fetch(global.baseUrl + 'api/Department/get');
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

        //postNewEmployee();
        getAllEmployees();

    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <Text>Department Name:</Text>
            <TextInput onChangeText={(value) => setDepartmentName(value)} style={{ borderWidth: 2, borderColor: 'black' }} />
            <Image
                source={{ uri: filePath.uri }}
                style={styles.imageStyle}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={() => chooseFile('photo')} >

                <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>

            <Button title='Add Department' onPress={() => postImage()} />
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={department}
                    keyExtractor={({ ID }, index) => ID}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{ fontSize: 20, backgroundColor: 'blue', color: 'white' }}>{item.name}</Text>
                            <Image
                                source={{
                                    uri: global.baseUrl + "Images/" + item.image
                                }}
                                style={styles.imageStyle}
                            />
                        </>
                    )}
                />
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
    },
});
