import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Login from '../screens/Login';
import AudioPlayer from '../screens/AudioPlayer';
import ArtistProfile from '../screens/ArtistProfile';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{headerShown: false,
                gestureDirection: 'horizontal-inverted',
                }}>
                    <Stack.Screen name="Splash" component={Splash}/>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name='ArtistProfile' component={ArtistProfile}/>
                    <Stack.Screen name="AudioPlayer" component={AudioPlayer}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;