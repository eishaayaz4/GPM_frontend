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
import edit_template from './screens/edit_template';
import history from './screens/history';
import resultant_removeFromGroup from './screens/resultant_removeFromGroup';
import add_to_group from './screens/add_to_group';
import resultant_addToGroup from './screens/resutant_addToGroup';


const Stack = createNativeStackNavigator();

const App = (props) => {


   return (
      <NavigationContainer >
         <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
            <Stack.Screen name="Login" component={Login} options={{ headerTitle: "Login" }} />
            <Stack.Screen name="dashboard" component={dashboard} options={{headerTitle:"Dashboard"}}/>
            <Stack.Screen name="group_photo" component={group_photo} options={{ headerTitle: "Group Photo" }} />
            <Stack.Screen name="background" component={background} options={{ headerTitle: "Background" }} />
            <Stack.Screen name="signUp" component={signUp} options={{ headerTitle: "SignUp" }} />
            <Stack.Screen name="background_processed" component={background_processed} options={{ headerTitle: "Background" }} />
            <Stack.Screen name="add_template" component={add_template} options={{ headerTitle: "Add Template" }} />
            <Stack.Screen name="view_template" component={view_template} options={{ headerTitle: "View Template" }} />
            <Stack.Screen name="celebrity" component={celebrity} options={{ headerTitle: "Celebrity" }} />
            <Stack.Screen name="remove_from_group" component={remove_from_group} options={{ headerTitle: "Remove From Group" }} />
            <Stack.Screen name="extract_photo" component={extract_photo} options={{ headerTitle: "Extract Person" }} />
            <Stack.Screen name="edit_template" component={edit_template} options={{ headerTitle: "Edit Template" }} />
            <Stack.Screen name="history" component={history} options={{ headerTitle: "History" }} />
            <Stack.Screen name="resultant_removeFromGroup" component={resultant_removeFromGroup} options={{ headerTitle: "Remove From Group" }} />
            <Stack.Screen name="add_to_group" component={add_to_group} options={{ headerTitle: "Add To Group" }} />
            <Stack.Screen name="resultant_addToGroup" component={resultant_addToGroup} options={{ headerTitle: "Add To Group" }} />

            
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
