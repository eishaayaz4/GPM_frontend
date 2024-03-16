import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, FlatList ,Image} from 'react-native';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
global.baseUrl = "http://192.168.18.68/APIDemo/"

export default function AddFlower() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState('')
  const [filePath, setFilePath] = useState({});
  const navigation = useNavigation();
  const savebtn = () => {
    postflower()
    navigation.navigate('FlowerShop')
  }
  const postNewflower = () => {
    try {
      alert(JSON.stringify(img))
      console.log(JSON.stringify(img))
      console.log('Post Called')
      
      fetch(global.baseUrl+'flower/Post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:name,
          category:category,
          quantity:quantity,
          price:price,
          
        }),
      });
      console.log("posted...")
    }
    catch (error) {
      console.error(error);
    }


  }
   const postflower=async()=>{
    console.log(JSON.stringify(img))
    let data = new FormData()
    data.append('img',img)
    data.append('name',name)
    data.append('category',category)
    data.append('price',price)
    data.append('quantity',quantity)

    let response = await fetch(global.baseUrl+'api/flower/uploadImage',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type' : 'multipart/form-data'
      },
      body:data
    })
    let json = await response.json()
    console.log(json)
  }
  
 const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64:true
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
      console.log('base64 -> ', response.assets[0].base64);
   
      setImg({
        'uri' : response.assets[0].uri,
        'name' : response.assets[0].fileName,
        'type' : response.assets[0].type
      })
      setFilePath(response.assets[0]);
    });
  };
  

  
  return (
    <View style={{ flex: 2 }}>
      <Text style={{ color: 'black',marginLeft:10,marginTop:10,fontSize:20}}>Enter Name</Text>
      <View style={{ margin: 10, borderWidth: 2, width: 350}}>
      <TextInput
        style={{ color: 'black', borderColor: 'black', borderWidth: 1 }}
        placeholder='Enter Name'
        onChangeText={(value) => { setName(value) }}
      />
      </View>
      <Text style={{ color: 'black',marginLeft:10,marginTop:10,fontSize:20}}>Enter Category</Text>
      <View style={{ margin: 10, borderWidth: 2, width: 350 }}>
        <TextInput
         style={{ color: 'black', borderColor: 'black', borderWidth: 1 }}
         onChangeText={(value) => { setCategory(value) }} />
      </View>
      <Text style={{ color: 'black',marginLeft:10,marginTop:10,fontSize:20}}>Enter Price</Text>
      <View style={{ margin: 10, borderWidth: 2, width: 350 }}>
        <TextInput 
         style={{ color: 'black', borderColor: 'black', borderWidth: 1 }}
         onChangeText={(value) => { setPrice(value) }} />
      </View>
      <Text style={{ color: 'black',marginLeft:10,marginTop:10,fontSize:20}}>Enter Quantity</Text>
      <View style={{ margin: 10, borderWidth: 2, width: 350 }}>
        <TextInput  style={{ color: 'black', borderColor: 'black', borderWidth: 1 }}
        onChangeText={(value) => { setQuantity(value) }} />
      </View>
      
      <Image
        source={{ uri: filePath.uri }}
        style={{ margin: 10, borderWidth: 2, width: 150,height:150 }}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={{borderWidth:1,width:150,marginLeft:120,height:50,alignItems:'center',justifyContent:'center'}}
        onPress={() => chooseFile('photo')} >

        <Text style={{color:'black'}}>Choose Image</Text>
      </TouchableOpacity>

      <View style={{ margin: 10, borderWidth: 2,borderColor:'black' }}>
        <Button onPress={savebtn} title='Save' />
      </View>
    </View >
  );
}
