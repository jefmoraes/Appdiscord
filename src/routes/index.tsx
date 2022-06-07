import React from "react";
import{NavigationContainer} from '@react-navigation/native'
import {Background} from '../components/Background'

import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes"; 
import { UseAuth } from "../hooks/auth";

export function Routes(){
    const {user} = UseAuth();
    return(
        <NavigationContainer>
           {user.id ? <AppRoutes/> : <SignIn/>}
        </NavigationContainer>
    )
}