import React from "react";
import { createNativeStackNavigator} from  '@react-navigation/native-stack';

import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";
import { theme } from "../global/styles/theme";
import {AppointmentDetails} from "../screens/AppointmentDetails";
import { AppointmentCreate } from "../screens/AppointmentCreate";

export type RootStackParams={
    Home:undefined;
    SignIn:undefined;
    AppointmentDetails:undefined;
    AppointmentCreate:undefined;

}

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator
            screenOptions={{
                headerShown: false ,
                contentStyle :{
                backgroundColor: theme.colors.secondary100,
                }
            }}
        >
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            <Screen
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
        
    )

}