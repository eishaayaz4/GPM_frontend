import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Pressable, Modal, Text } from 'react-native';
import url from '../api_url';

const ImageItem = ({ item, onPressDetails }) => (
    <View style={{ marginTop: 20, }} key={item.id}>
        <Text style={{ marginLeft: 30, fontSize: 16, fontFamily: 'Poppins', color: '#000', }}>{item.date}</Text>
        <View style={styles.imageContainer}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.thumbnail} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={styles.detailsButton} onPress={() => onPressDetails(item)}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins', fontWeight: 'bold' }}>Details</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('dashboard')}>
                    <Image source={require('../assets/download.png')} style={styles.icon} />
                </Pressable>
            </View>

        </View>
    </View>
);

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

export default function App() {
    const [history, setHistory] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${url}GetUserProcessedImages/2`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            } else {
                throw new Error('Failed to fetch history');
            }
        } catch (error) {
            console.log(error);
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

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={styles.background}
            />
            {history.map(item => (
                <ImageItem key={item.id} item={item} onPressDetails={handleDetailsPress} />
            ))}
            <ModalContent visible={modalVisible} item={selectedImage} onClose={handleCloseModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 1,
        paddingVertical: 3,
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
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
        justifyContent: "center",
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
});
