import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Pressable, Modal, Text, FlatList, Dimensions, ActivityIndicator, Alert } from 'react-native';
import url from '../api_url';

const { width } = Dimensions.get('window');
const numColumns = 2;
const imageSize = (width - 60) / numColumns; // Adjust according to your padding and margin

const ImageItem = ({ item, onPressDetails }) => (
    <Pressable onPress={() => onPressDetails(item)} style={styles.imageContainer}>
        <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.thumbnail} />
    </Pressable>
);

const ModalContent = ({ visible, item, onClose, onDelete }) => (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
            {item && (
                <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.modalImage} />
            )}
            <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontWeight: 'bold' }}>Close</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onDelete}>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontWeight: 'bold' }}>Delete</Text>
            </Pressable>
        </View>
    </Modal>
);

export default function App(props) {
    const [asset, setAsset] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true); // New state for loading indicator
    const { user_id } = props.route.params;
    const [assetId, setAssetId] = useState(0)

    useEffect(() => {
        getData();

        console.log("======", assetId)
    }, []);

    const deleteAsset = async () => {
        try {
            const formData = new FormData();
            formData.append('asset_id', assetId);
            formData.append('user_id', user_id);
            console.log("+++++", assetId)
            const response = fetch(url + 'RemoveAsset', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (!response.ok) {
                Alert.alert('Success', 'Asset deleted successfully.');
                setModalVisible(false); // Close the modal after deletion
                getData(); // Refresh the data
            } else {
                console.log();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const MAX_RETRIES = 10;
    const RETRY_DELAY = 1000;
    const getData = async () => {
        let retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                const response = await fetch(`${url}GetAsset/${user_id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(assetId);
                    setAsset(data);

                    setLoading(false);
                    return;
                } else {
                    throw new Error('Failed to fetch assets');
                }
            } catch (error) {
                console.log(error);
                retries++;
                if (retries >= MAX_RETRIES) {
                    setLoading(false);  // Set loading to false after all retries are exhausted
                } else {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                }
            }
        }
        console.log("Max retries reached. Unable to fetch backgrounds.");
    };

    const handleDetailsPress = (item) => {
        setSelectedImage(item);
        setModalVisible(true);
        setAssetId(item.id)
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const handleDelete = () => {
        deleteAsset();
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/Imagebg.png')} style={styles.background}>
                {loading ? (
                    <ActivityIndicator size="large" color="#ac326a" style={styles.activityIndicator} />
                ) : asset.length > 0 && user_id !== 0 ? (
                    <FlatList
                        data={asset}
                        renderItem={({ item }) => <ImageItem item={item} onPressDetails={handleDetailsPress} />}
                        keyExtractor={(item) => item.id.toString()}

                        numColumns={numColumns}
                        contentContainerStyle={styles.galleryContainer}
                    />
                ) : (
                    <Text style={styles.noAssetText}>No assets to show</Text>
                )}
            </ImageBackground>
            <ModalContent
                visible={modalVisible}
                item={selectedImage}
                onClose={handleCloseModal}
                onDelete={handleDelete}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    galleryContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 10,
    },
    thumbnail: {
        width: imageSize,
        height: imageSize,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        width: '80%',
        height: 400,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    closeButton: {
        backgroundColor: '#ac326a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: '#ac326a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    noAssetText: {
        fontSize: 18,
        color: '#2b3048',
        alignSelf: 'center',
        opacity: 0.8,
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        zIndex: 1,
    },
});
