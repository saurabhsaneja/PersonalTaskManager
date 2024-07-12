import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Splash from "../screens/Splash";
import Home from "../screens/Home";

const MainStack = () => {
    //variables
    const Stack = createNativeStackNavigator();
    const initialRouteName = 'SPLASH';
    const screenOptions = {
        headerShown: false,
    };
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName={initialRouteName}>
            <Stack.Screen name={'SPLASH'} component={Splash} />
            <Stack.Screen name={'LOGIN'} component={Login} />
            <Stack.Screen name={'SIGNUP'} component={SignUp} />
            <Stack.Screen name={'HOME'} component={Home} />

        </Stack.Navigator>
    );
};

export default MainStack;