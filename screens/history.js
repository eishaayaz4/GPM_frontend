import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Pressable, PermissionsAndroid, Modal, Text, ActivityIndicator, ScrollView, Alert } from 'react-native';
import url from '../api_url';
import RNFetchBlob from 'rn-fetch-blob';

const ImageItem = ({ item, onPressDetails, onDownload }) => (
    <View style={{ marginTop: 20 }} key={item.id}>
        <Text style={{ marginLeft: 30, fontSize: 16, fontFamily: 'Poppins', color: '#000' }}>{item.date}</Text>
        <View style={styles.imageContainer}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.thumbnail} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={styles.detailsButton} onPress={() => onPressDetails(item)}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins', fontWeight: 'bold' }}>Details</Text>
                </Pressable>
                <Pressable onPress={() => onDownload(item.image)}>
                    <Image source={require('../assets/download.png')} style={styles.icon} />
                </Pressable>
            </View>
        </View>
    </View>
);

const downloadImage = async (base64Image) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message: 'App needs access to your storage to download photos.',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Strip the data URL prefix if present
            const base64Data = base64Image.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
            const imagePath = RNFetchBlob.fs.dirs.DownloadDir + '/image.jpg'; 
            await RNFetchBlob.fs.writeFile(imagePath, base64Data, 'base64');
            console.log(imagePath)
            Alert.alert('Image Downloaded Successfully');
        } else {
            Alert.alert('Storage Permission Denied');
        }
    } catch (error) {
        console.error('Error downloading image:', error);
        Alert.alert('Error downloading image');
    }
};

const ModalContent = ({ visible, item, onClose }) => (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
            {item && (
                <>
                    <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.modalImage} />
                    <Text style={styles.modalText}>{item.description}</Text>
                </>
            )}
            <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontWeight: 'bold' }}>Close</Text>
            </Pressable>
        </View>
    </Modal>
);

export default function App(props) {
    const [history, setHistory] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true); // New state for loading indicator
    const { user_id } = props.route.params;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true); // Start loading
            const response = await fetch(`${url}GetUserProcessedImages/${user_id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setHistory(data);
            } else {
                throw new Error('Failed to fetch history');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleDetailsPress = (item) => {
        setSelectedImage(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const handleDownload = (image) => {
        downloadImage(image);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground source={require('../assets/Imagebg.png')} style={styles.background}>
                {loading ? (
                    <ActivityIndicator size="large" color="#ac326a" style={styles.activityIndicator} />
                ) : history.length > 0 && user_id !== 0 ? (
                    history.map(item => (
                        <ImageItem key={item.id} item={item} onPressDetails={handleDetailsPress} onDownload={handleDownload} />
                    ))
                ) : (
                    <View style={styles.noHistoryContainer}>
                        <Text style={styles.noHistoryText}>No history to show</Text>
                    </View>
                )}
            </ImageBackground>
            <ModalContent visible={modalVisible} item={selectedImage} onClose={handleCloseModal} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    imageContainer: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        margin: 30,
        marginTop: 20,
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    detailsButton: {
        width: 100,
        height: 50,
        backgroundColor: '#ac326a',
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
    modalText: {
        color: 'white',
        fontFamily: 'Poppins',
        fontSize: 18,
        marginVertical: 20,
    },
    closeButton: {
        backgroundColor: '#ac326a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        margin: 18,
    },
    noHistoryContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noHistoryText: {
        fontSize: 18,
        color: '#2b3048',
        opacity: 0.8,
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        zIndex: 1,
    },
});
