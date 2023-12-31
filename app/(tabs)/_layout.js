import { Tabs } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="home"
                options={{
                    tabBarLabel: "Home",
                    tabBarStyle: { color: "#7CB9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5 name="tasks" size={24} color="#7CB9E8" />
                        ): (
                            <FontAwesome5 name="tasks" size={24} color="black" />
                        )
                }}
            />
            <Tabs.Screen name="calendar"
                options={{
                    tabBarLabel: "Calendar",
                    tabBarStyle: { color: "#7CB9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <EvilIcons name="calendar" size={24} color="#7CB9E8" />
                        ): (
                            <EvilIcons name="calendar" size={24} color="black" />
                        )
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarStyle: { color: "#7CB9E8" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="account-details-outline" size={24} color="#7CB9E8" />
                        ): (
                            <MaterialCommunityIcons name="account-details-outline" size={24} color="black" />
                        )
                }}
            />
        </Tabs>
    )
}