import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/MenuScreen';
import MainStack from './MainStack';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarActiveBackgroundColor: "#ffc107",
            tabBarInactiveBackgroundColor: "#ffc107",
        }}>
            <Tab.Screen name="Dashboard" component={MainStack} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="home" size={size} color={color} />
                ),
                tabBarLabel: "Home"
            }} />
            <Tab.Screen name="Menu" component={MenuScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="fast-food" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}