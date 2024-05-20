import React, { useEffect, useState } from 'react'
import url from '../api_url';
import {
    Text, View, StyleSheet, Pressable, TextInput, ImageBackground, Image, Platform,
    PermissionsAndroid,
    Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [category, setCategory] = useState('');
    const [type, setType] = useState(); // Placeholder for dynamic values from the database
    const [dynamicCategory, setdynamicCategory] = useState([]); // Placeholder for dynamic values from the database
    const [dynamicType, setDynamicType] = useState([]);
    const [image, setImage] = useState('')

    useEffect(() => {
        handleCategory()
        handleType()
    }, []);

    const handleInsert = async () => {
        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('type', type);
            formData.append('category', category);
            formData.append('image', image)

            const response = await fetch(`${url}AddTemplate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                body: formData,
            });
            console.log(formData.name)
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                Alert.alert("Template added successfully.")
            } else {
                const error = await response.json();
                console.error('Error:', error);
                // Handle error, show an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle other types of errors
        }
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

            } else {
                alert('No image selected');
            }
        });
    };

    function handleCategory() {
        //using static values
        const staticValues = ['Cricketer', 'Mountains', 'Lakes', 'History', 'Actress'];
        setdynamicCategory(staticValues);
    }

    function handleType() {
        // using static values
        const staticValues = ['Background', 'Celebrity'];
        setDynamicType(staticValues);
    }
    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >

            </ImageBackground>
            <View style={style.container}>

                <View style={{ marginTop: 22 }}>


                    <Text style={style.label}>Name</Text>
                    <View style={style.textContainer}>

                        <TextInput placeholder='Name' placeholderTextColor={'#9A9FA3'} onChangeText={(val) => setName(val)}
                            style={{ flex: 1, borderBottomWidth: 0, borderBottomColor: 'transparent', marginLeft: 15, fontSize: 16, fontFamily: 'poppins', color: '#4C4B49' }} ></TextInput>

                    </View>

                    <Text style={style.label}>Category</Text>
                    <View style={style.textContainer}>
                        <Picker
                            selectedValue={category}
                            style={{ height: 50, flex: 1, color: '#4C4B49' }}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                        >
                            <Picker.Item label="Select Category" value="" />
                            {dynamicCategory.map((value, index) => (
                                <Picker.Item key={index} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={style.label}>Type</Text>
                    <View style={style.textContainer}>
                        <Picker
                            selectedValue={type}
                            style={{ height: 50, flex: 1, color: '#4C4B49' }}
                            onValueChange={(itemValue) => setType(itemValue)}
                        >
                            <Picker.Item label="Select Type" value="" />
                            {dynamicType.map((value, index) => (
                                <Picker.Item key={index} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>




                    <View>
                        <Pressable style={style.upload} onPress={() => chooseFile('photo')} >
                            <Text style={{ color: '#ac326a', fontSize: 15, fontFamily: 'Poppins Bold', fontWeight: 'bold', alignSelf: 'center' }}>
                                UPLOAD
                            </Text>
                            <Image
                                source={require('../assets/upload.png')}
                                style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 100 }}
                            />
                        </Pressable>
                    </View>


                    <View >
                        <Pressable onPress={handleInsert} style={{ backgroundColor: '#AC326A', padding: 10, margin: 25, marginHorizontal: 110, borderRadius: 35 }} >
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, color: 'white' }}>Add</Text></Pressable>
                    </View>

                </View>

            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {

        paddingHorizontal: 20,
        paddingVertical: 60,
        backgroundColor: "transparent"

    },
    textContainer: {
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#E1EDF9',
        paddingVertical: 3,
        borderRadius: 10,
        marginHorizontal: 30,
        elevation: 3

    },

    background: {
        height: 900,
        width: 500,
        resizeMode: 'cover',
        flex: 1
    },
    label: {
        fontSize: 17,
        paddingHorizontal: 10,
        marginBottom: 7,
        fontWeight: 'bold'
    },
    upload: {
        backgroundColor: '#E1EDF9',
        paddingHorizontal: 70,
        paddingVertical: 13,
        margin: 30,
        borderRadius: 15,
        marginTop: 35,
        elevation: 3,
        flexDirection: 'row'
    },
})