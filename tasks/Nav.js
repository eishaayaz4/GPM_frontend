// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Addflower from './Addflower';
import Viewflower from './Viewflower';
import FlowerShop from './FlowerShop';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlowerShop">
      <Stack.Screen name="FlowerShop" component={FlowerShop} />
        <Stack.Screen name="Addflower" component={Addflower} />
        <Stack.Screen name="Viewflower" component={Viewflower} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
