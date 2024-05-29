import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from '../screens/DetailScreen';
import UserScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
      </Stack.Navigator>
  );
}

