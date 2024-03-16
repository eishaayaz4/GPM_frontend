import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const UserListScreen = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', age: 25, image: null },
        { id: 2, name: 'Jane Doe', age: 30, image: null },
        // Add more users as needed
    ]);

    const handleUpload = async () => {
        try {
            for (const user of users) {
                const formData = new FormData();
                formData.append('name', user.name);
                formData.append('age', user.age.toString());
                formData.append('image', {
                    uri: user.image.uri,
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                });

                await axios.post('YOUR_API_ENDPOINT', formData);
            }

            alert('Upload successful');
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const handleImagePicker = (userId) => {
        ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
            if (!response.didCancel) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, image: response } : user
                    )
                );
            }
        });
    };

    return (
        <View>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{`Name: ${item.name}, Age: ${item.age}`}</Text>
                        {item.image && (
                            <Image source={{ uri: item.image.uri }} style={{ width: 100, height: 100 }} />
                        )}
                        <TouchableOpacity onPress={() => handleImagePicker(item.id)}>
                            <Text>Choose Image</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Button title="Upload All" onPress={handleUpload} />
        </View>
    );
};

export default UserListScreen;
