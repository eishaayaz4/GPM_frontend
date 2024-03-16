import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, Text, View, FlatList } from 'react-native';

export default function Viewflower() {
  const [flower, setFlower] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAllFlower = async () => {
    try {
      const response = await fetch('http://192.168.18.68/APIDemo/api/flower/Get');
      console.log('Response Status Code:', response.status);

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setFlower(json);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllFlower();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={flower}
            keyExtractor={({ ID ,index}) => ID}
            renderItem={({ item }) => (
              <View style={{ marginTop: 10, borderWidth: 2, padding: 10 }}>
                <Text style={{ fontSize: 20, color: 'black' }}>Name: {item.name}</Text>
                <Text style={{ fontSize: 20, color: 'black' }}>Price: {item.price}</Text>
                <Text style={{ fontSize: 20, color: 'black' }}>Quantity: {item.quantity}</Text>
                <Text style={{ fontSize: 20, color: 'black' }}>Category: {item.category}</Text>
                <Image
                  source={{ uri: 'http://192.168.18.68/APIDemo/Images/${item.img}' }}
                  style={{ width: 150, height: 150, margin: 5 }}
                  onError={(error) => console.error('Image loading error:', error)}
                />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
