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
import view_template from './screens/view_template';
import add_template from './screens/add_template';
import celebrity from './screens/celebrity';
import remove_from_group from './screens/remove_from_group';
import edit_template from './screens/edit_template';
import history from './screens/history';
import resultant_removeFromGroup from './screens/resultant_removeFromGroup';
import resutant_addToGroup from './screens/resutant_addToGroup';
import remove_from_group_test from './screens/remove_from_group_test';
import add_to_group_test from './screens/add_to_group_test';
import add_with_celebrity_test from './screens/add_with_celebrity_test'
import resultant_addWithCelebrity from './screens/resultant_addWithCelebrity'
import resultant_background from './screens/resultant_background'
import asset from './screens/asset'
const Stack = createNativeStackNavigator();

const App = (props) => {


   return (
      <NavigationContainer independent={true}>
         <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerTitle: "Login" }} />
            <Stack.Screen name="dashboard" component={dashboard} options={{ headerTitle: "Dashboard" }} />
            <Stack.Screen name="group_photo" component={group_photo} options={{ headerTitle: "Group Photo" }} />
            <Stack.Screen name="background" component={background} options={{ headerTitle: "Background" }} />
            <Stack.Screen name="signUp" component={signUp} options={{ headerTitle: "SignUp" }} />
            <Stack.Screen name="add_template" component={add_template} options={{ headerTitle: "Add Template" }} />
            <Stack.Screen name="view_template" component={view_template} options={{ headerTitle: "View Template" }} />
            <Stack.Screen name="celebrity" component={celebrity} options={{ headerTitle: "Celebrity" }} />
            <Stack.Screen name="remove_from_group" component={remove_from_group} options={{ headerTitle: "Remove From Group" }} />
            <Stack.Screen name="edit_template" component={edit_template} options={{ headerTitle: "Edit Template" }} />
            <Stack.Screen name="history" component={history} options={{ headerTitle: "History" }} />
            <Stack.Screen name="resultant_removeFromGroup" component={resultant_removeFromGroup} options={{ headerTitle: "Remove From Group" }} />
            <Stack.Screen name="resutant_addToGroup" component={resutant_addToGroup} options={{ headerTitle: "Add To Group" }} />
            <Stack.Screen name="remove_from_group_test" component={remove_from_group_test} options={{ headerTitle: "Remove from group" }} />
            <Stack.Screen name="add_to_group_test" component={add_to_group_test} options={{ headerTitle: "Add to group" }} />
            <Stack.Screen name="add_with_celebrity_test" component={add_with_celebrity_test} options={{ headerTitle: "Add with celebrity" }} />
            <Stack.Screen name="resultant_addWithCelebrity" component={resultant_addWithCelebrity} options={{ headerTitle: "Add with celebrity" }} />
            <Stack.Screen name="resultant_background" component={resultant_background} options={{ headerTitle: "Background" }} />
            <Stack.Screen name="asset" component={asset} options={{ headerTitle: "Asset" }} />

         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;
