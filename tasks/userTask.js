import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput, TouchableOpacity, Image, Modal, Button, FlatList } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
const db = openDatabase({
    name: 'user'
})

export default function App() {
    useEffect(() => {
        createTable()

    }, []);

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
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        }
        else {
            return true
        };
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            console.log('Response Assets = ', response.assets[0].uri);


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
            console.log('Response again.. = ', response);
            console.log('base64 -> ', response.assets[0].base64);
            console.log('uri -> ', response.assets[0].uri);
            console.log('width -> ', response.assets[0].width);
            console.log('height -> ', response.assets[0].height);
            console.log('fileSize -> ', response.assets[0].fileSize);
            console.log('type -> ', response.assets[0].type);
            console.log('fileName -> ', response.assets[0].fileName);

            setFileType(response.assets[0].type);
            setImageStr(response.assets[0].base64);
        });
    };

    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), imageStr TEXT, fileType TEXT)`
                , [],
                (sqltxn, res) => {
                    console.log("Table created successfully...")
                },
                error => {
                    console.log("error on creating table")
                },
            );
        });
    }
    function insertUser() {
        if (name && email && imageStr && fileType) {
            db.transaction(txn => {
                txn.executeSql(
                    `INSERT INTO userData (name, email, imageStr, fileType) VALUES (?, ?, ?, ?)`,
                    [name, email, imageStr, fileType],
                    (sqltxn, res) => {
                        console.log("Successfully inserted");
                        setName('')
                        setEmail('')
                        setImageStr('')
                    },
                    error => {
                        console.log("Error in insertion", error);
                    },
                );
            });
        } else {
            console.log("Please fill in all the details");
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: 10 }}>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
                <Image
                    source={{
                        uri: `data:${item.fileType};base64,${item.imageStr}`
                    }}
                    style={{ height: 100, width: 100 }}
                />
                <Pressable onPress={() => deleteRecord(item.id)} style={{ marginTop: 10, backgroundColor: 'red', padding: 10 }}>
                    <Text style={{ color: 'white' }}>Delete</Text>
                </Pressable>
            </View>
        );
    };

    function fetchUser() {
        db.transaction(txn => {
            txn.executeSql(
                `select * from userData`, [],
                (sqltxn, res) => {
                    console.log("records retrieved");
                    let len = res.rows.length;
                    let list = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i)
                            list.push({ id: item.id, name: item.name, email: item.email, imageStr: item.imageStr, fileType: item.fileType })
                        }
                    }
                    setUserList(list);
                },
                error => {
                    console.log("error in fetching records")
                }
            )
        })
    }
    const openModal = () => {
        fetchUser()
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    function deleteRecord(id) {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM userData WHERE id = ?`,
                [id],
                (sqltxn, res) => {
                    console.log("Record deleted successfully");
                    fetchUser(); // Refresh the list after deletion
                },
                error => {
                    console.log("Error in deletion", error);
                },
            );
        });
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [imageStr, setImageStr] = useState('')
    const [fileType, setFileType] = useState('')
    const [userList, setUserList] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginRight: 250 }}>
                Name:
            </Text>
            <TextInput onChangeText={(text) => setName(text)} placeholder='Enter name' style={{ borderWidth: 1, paddingRight: 200, margin: 10 }} />
            <Text style={{ marginRight: 250 }}>
                Email:
            </Text>
            <TextInput onChangeText={(text) => setEmail(text)} placeholder='e.g @gmail.com' keyboardType='email-address' style={{ borderWidth: 1, paddingRight: 170, margin: 10 }} />
            <TouchableOpacity
                activeOpacity={0.5}

                onPress={() => chooseFile('photo')}>
                <Text >Choose Image</Text>
            </TouchableOpacity>
            <View>
                <Image
                    source={{
                        uri: `data:${fileType};base64,${imageStr}`
                    }}
                    style={{ height: 200, width: 200, alignItems: 'center' }}
                />
            </View>
            <Pressable onPress={insertUser} style={{ marginTop: 20, backgroundColor: 'skyblue', padding: 15 }}>
                <Text>Save</Text>
            </Pressable>

            <Pressable onPress={openModal} style={{ marginTop: 20, backgroundColor: 'skyblue', padding: 15 }}>
                <Text>Move to List
                </Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <FlatList
                            data={userList}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}
