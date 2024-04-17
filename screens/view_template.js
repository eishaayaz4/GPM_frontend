import React, { useEffect, useState } from 'react'
import { Text, Alert, View, FlatList, StyleSheet, Pressable, TextInput, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import url from '../api_url';


export default function App(props) {

    const [showIcon, setShowIcon] = useState('')
    const navigation = useNavigation()
    const [backgrounds, setBackgrounds] = useState([]);
    const [celebrities, setCelebrities] = useState([]);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [celebrityIndex, setCelebrityIndex] = useState(0);
    const [result, setResult] = useState([])
    const [searchIndex, setSearchIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        GetAllBackgrounds();
        GetAllCelebrities();
    }, [])

    const GetAllBackgrounds = async () => {
        try {
            const response = await fetch(`${url}GetAllBackgrounds`);
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                setBackgrounds(data);
                console.log("bg", data)
            } else {
                throw new Error('Failed to fetch backgrounds.');
            }
        } catch (error) {
            console.log(error)
        }

    }

    const GetAllCelebrities = async () => {
        try {
            const response = await fetch(`${url}GetAllCelebrities`);
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                setCelebrities(data);

            } else {
                throw new Error('Failed to fetch celeberities.');
            }
        } catch (error) {
            console.log(error)
        }

    }

    const GetSearchItems = async (text) => {
        try {
            const response = await fetch(url + `GetTemplateBySearch/${text}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data); // Assuming you have a state variable 'results' to store search results
            } else {
                console.error('No item found', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const renderBackgroundItem = ({ item, index }) => (
        <Pressable onLongPress={() => {
            setShowIcon(item)
        }} style={style.box}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={style.image} />


            {showIcon === item &&
                <Pressable onPress={() => {
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you want to delete this template?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: () => deleteTemplate(item.id),
                            },
                        ]
                    )
                }} style={{ backgroundColor: '#fcfcfc', opacity: 0.8, position: 'absolute', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, }}>
                    <Image
                        source={require('../assets/remove.png')}
                        style={{ height: 20, width: 20, tintColor: 'red', }}
                    />
                </Pressable>
            }

            {showIcon === item &&
                <Pressable onPress={() =>
                    navigation.navigate('editTemplate', { id: item.id, name: item.name, category: item.category, type: item.type, image: item.image })
                }
                    style={{ backgroundColor: '#fcfcfc', opacity: 0.8, position: 'absolute', borderRadius: 20, width: 40, height: 40, marginLeft: 7, marginRight: 4 }}>
                    <Image
                        source={require('../assets/edit.png')}
                        style={{ height: 20, width: 20, tintColor: 'red', }}
                    />
                </Pressable>
            }
        </Pressable>
    );

    const deleteTemplate = async (id) => {
        try {
            const response = await fetch(url + `DeleteTemplate/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Alert.alert('Success', 'Template deleted successfully.');
                getAllBackgrounds();
                GetAllCelebrities();
            } else {
                console.error('deletion failed:');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const renderCelebrityItem = ({ item, index }) => (

        <Pressable onLongPress={() => { setShowIcon(item) }} style={style.box}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={style.image} />
            {showIcon === item &&
                <Pressable onPress={() => {
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you want to delete this template?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: () => deleteTemplate(item.id),
                            },
                        ]
                    )
                }} style={{ backgroundColor: '#fcfcfc', opacity: 0.8, position: 'absolute', borderRadius: 20, justifyContent: 'center', width: 40, height: 40, marginLeft: 20, marginRight: 10 }}>
                    <Image
                        source={require('../assets/remove.png')}
                        style={{ height: 20, width: 20, tintColor: 'red', }}
                    />
                </Pressable>


            }

            {showIcon === item &&
                <Pressable onPress={() =>
                    navigation.navigate('edit_template', { id: item.id, name: item.name, category: item.category, type: item.type, image: item.image })
                }
                    style={{ backgroundColor: '#fcfcfc', opacity: 0.8, position: 'absolute', borderRadius: 20, width: 40, height: 40, marginLeft: 7, marginRight: 20, justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/edit.png')}
                        style={{ height: 20, width: 20, tintColor: 'red', }}
                    />
                </Pressable>
            }
        </Pressable>






    );



    const renderSearch = ({ item, index }) => (
        <Pressable onLongPress={() => { setShowIcon(item) }} style={style.box}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={style.image} />
            {showIcon === item &&
                <Pressable onPress={() => {
                    Alert.alert(
                        'Confirmation',
                        'Are you sure you want to delete this template?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: () => deleteTemplate(item.id),
                            },
                        ]
                    )
                }} style={{ backgroundColor: '#fcfcfc', opacity: 0.8, position: 'absolute', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, }}>
                    <Image
                        source={require('../assets/remove.png')}
                        style={{ height: 20, width: 20, tintColor: 'red', }}
                    />
                </Pressable>
            }
        </Pressable>
    );

    return (
        <View>
            <ImageBackground
                source={require('../assets/Imagebg.png')}
                style={style.background}
            >
            </ImageBackground>
            <View style={style.container}>
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

                        <FlatList
                            data={celebrities}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderCelebrityItem}
                            onMomentumScrollEnd={(event) => {
                                const newIndex = Math.round(event.nativeEvent.contentOffset.x / 150);
                                setCelebrityIndex(newIndex);
                            }}
                        />
                    </>
                )}
                {/* Upload Button */}
                <View>
                    <Pressable
                        style={style.upload}
                        onPress={() => { navigation.navigate('add_template') }}>
                        <Text style={{ color: '#ac326a', fontSize: 15, fontFamily: 'Poppins Bold', fontWeight: 'bold', alignSelf: 'center' }}>
                            ADD NEW TEMPLATE
                        </Text>
                        <Image
                            source={require('../assets/upload.png')}
                            style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 30 }}
                        />
                    </Pressable>
                </View>
            </View>

        </View >

    )
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    background: {
        height: 900,
        width: 500,
        flex: 1
    },
    upload: {
        backgroundColor: '#FCFCFC',
        paddingHorizontal: 50,
        paddingVertical: 13,
        margin: 35,
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
})