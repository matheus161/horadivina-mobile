import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Favorites from "../pages/Favorites";
import InstitutionsList from "../pages/InstitutionsList";
import InstitutionDetail from "../pages/InstitutionDetail";

import CustomTabBar from "../components/CustomTabBar";

import colors from "../themes/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#121212",

        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.appPrimary,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="TabMain"
        component={Main}
        options={{
          tabBarIcon: "home",
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: "star",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: "person",
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InsitutionsList"
        component={InstitutionsList}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="InstitutionDetail"
        component={InstitutionDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
