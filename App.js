// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Splash from './screens/splash';
import dashboard from './screens/dashboard';
import Login from './screens/login';
import signUp from './screens/signup';
import group_photo from './screens/group_photo';
import background from './screens/background';
import background_processed from './screens/background_processed';
import view_template from './screens/view_template';
import add_template from './screens/add_template';
import celebrity from './screens/celebrity';
import remove_from_group from './screens/remove_from_group';
import extract_photo from './screens/extract_photo';



const Stack = createNativeStackNavigator();

const App = (props) => {


   return (
      <NavigationContainer >
         <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="dashboard" component={dashboard} />
            <Stack.Screen name="group_photo" component={group_photo} />
            <Stack.Screen name="background" component={background} />
            <Stack.Screen name="signUp" component={signUp} />
            <Stack.Screen name="background_processed" component={background_processed} />
            <Stack.Screen name="add_template" component={add_template} />
            <Stack.Screen name="view_template" component={view_template} />
            <Stack.Screen name="celebrity" component={celebrity} />
            <Stack.Screen name="remove_from_group" component={remove_from_group} />
            <Stack.Screen name="extract_photo" component={extract_photo} />

         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
