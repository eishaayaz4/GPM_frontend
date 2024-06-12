import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Alert, FlatList, Pressable, TextInput, ImageBackground, PermissionsAndroid, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import url from '../api_url';
import {
    launchImageLibrary
} from 'react-native-image-picker';


export default function App(props) {
    const { user_id } = props.route.params;
    const navigation = useNavigation()
    const [result, setResult] = useState([])
    const [backgroundIndex, setBackgroundIndex] = useState([]);
    const [backgrounds, setBackgrounds] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [image, setImage] = useState('')
    const [filePath, setFilePath] = useState()
    const [selectedBackground, setSelectedBackground] = useState()
    const [selectedHeight, setSelectedHeight] = useState()
    const [selectedWidth, setSelectedWidth] = useState()
    const [selectedId, setSelectedId] = useState()
    const [loading, setLoading] = useState()
    useEffect(() => {
        GetAllBackgrounds();
        console.log("-------------", selectedBackground)
    }, [])

    const MAX_RETRIES = 10;
    const RETRY_DELAY = 1000;

    const GetAllBackgrounds = async () => {
        let retries = 0;
        while (retries < MAX_RETRIES) {
            try {
                const res = await fetch(`${url}getAllBackgrounds`);
                if (!res.ok) {
                    throw new Error('Failed to fetch backgrounds');
                }
                const data = await res.json();
                console.log(data);

                setBackgrounds(data);
                return; // Exit function if successful
            } catch (error) {
                console.log("Error while getting backgrounds:", error);
                retries++;
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
        console.log("Max retries reached. Unable to fetch backgrounds.");
    }


    const GetSearchItems = async (text) => {
        try {
            const response = await fetch(url + `getBackgroundBySearch/${text}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                console.log('No item found', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }


    const renderBackgroundItem = ({ item, index }) => (
        <Pressable onPress={() => { setSelectedBackground(item.image), setSelectedHeight(item.height), setSelectedWidth(item.width), setSelectedId(item.id) }} style={style.box}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={style.image} />

        </Pressable>
    );


    const renderSearch = ({ item, index }) => (
        <Pressable onPress={() => {
            setSelectedBackground(item.image)
        }} style={style.box}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={style.image} />

        </Pressable>
    );



    const chooseFile = (type) => {

        let options = {
            mediaType: type,
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


    function addAsset() {

        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('image', {
            uri: image.uri,
            name: image.name,
            type: image.type,
        });

        const response = fetch(url + 'AddAsset', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (!response.ok) {
            console.log("couldnot add to asset")
        }

        else {
            console.log("asset added")
        }
        return response
    }




    const handleMergeButtonClick = () => {
        if (user_id && user_id != 0) {
            addAsset()
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('background_id', selectedId);
        formData.append('image', {
            uri: image.uri,
            name: image.name,
            type: image.type,
        });

        fetch(url + 'ChangeBackground', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1];
                    navigation.navigate('resultant_background', {
                        selected: `data:image/png;base64,${base64data}`,
                        user_id: user_id
                    });
                    setLoading(false);
                };
                reader.readAsDataURL(blob);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error sending image to API:', error);
            });
    };



    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >
            </ImageBackground>

            <View style={style.container}>
                <Pressable style={style.upload} onPress={() => chooseFile('photo')}>
                    <Text style={{ color: '#ac326a', fontSize: 18, fontFamily: 'Poppins Bold', fontWeight: 'bold' }}>
                        UPLOAD
                    </Text>
                    <Image
                        source={require('../assets/upload.png')}
                        style={{ height: 30, width: 30, resizeMode: 'contain', marginLeft: 150 }}
                    />
                </Pressable>

                <View style={style.search}>
                    <TextInput placeholder='Search' onChangeText={(text) => {
                        setIsSearching(!!text); // Set isSearching to true if text is not empty
                        GetSearchItems(text);
                    }} style={{ color: '#7F7F7F', fontSize: 16 }} />
                </View>

                {isSearching ? (
                    <FlatList
                        data={result}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSearch}
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / 150);
                            setSearchIndex(newIndex);
                        }}
                    />
                ) : (
                    <>
                        <FlatList
                            data={backgrounds}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderBackgroundItem}
                            onMomentumScrollEnd={(event) => {
                                const newIndex = Math.round(event.nativeEvent.contentOffset.x / 150);
                                setBackgroundIndex(newIndex);
                            }}
                        />
                    </>
                )}

                {selectedBackground && image &&
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 80, marginLeft: 20 }}>

                        <Pressable onPress={() => { handleMergeButtonClick() }} style={{ backgroundColor: '#FFF', padding: 15, marginHorizontal: 300, marginVertical: 50, borderRadius: 150, marginRight: 10 }} >
                            <Image source={require('../assets/right.png')} style={{ height: 30, width: 30 }}></Image>
                        </Pressable>
                    </View>
                }
                {selectedBackground && image &&

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>

                        <View style={style.SelectBox}>

                            <Image
                                source={{ uri: `data:image/jpeg;base64,${selectedBackground}` }}
                                style={style.SelectImage}
                            />
                        </View>

                        <View style={style.SelectBox}>

                            <Image
                                source={{ uri: image.uri }}
                                style={style.SelectImage}
                            />
                        </View>
                    </View>
                }
            </View>

        </View >

    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 20,
        elevation: 3,
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upload: {
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 50,
        paddingVertical: 20,
        margin: 20,
        borderRadius: 15,
        marginTop: 50,
        elevation: 3,
        flexDirection: 'row'
    },
    search: {
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 35,
        paddingVertical: 3,
        marginHorizontal: 30,
        marginVertical: 30,
        marginTop: 40,
        borderRadius: 30,
        elevation: 3,
        justifyContent: 'center',
    },
    box: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 6,
        marginVertical: 8,
        elevation: 3,
        width: 150,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 25,
        marginLeft: 43,
        elevation: 3,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        opacity: 0.8
    },
    image: {
        width: 140,
        height: 190,
        borderRadius: 12
    },
    SelectBox: {
        backgroundColor: '#FCFCFC',
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 30,
        elevation: 3,
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SelectImage: {
        width: 100,
        height: 100,
        borderRadius: 10,

    },
    SelectImage: {
        width: 100,
        height: 100,
        borderRadius: 10,

    },
}
)