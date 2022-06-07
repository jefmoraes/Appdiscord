import React, { useState,useEffect } from "react";
import { ImageBackground, Text, View, FlatList, Alert,Share, Platform } from "react-native";
import {Background} from '../../components/Background'; 
import { Header } from "../../components/Header";
import { BorderlessButton } from "react-native-gesture-handler";
import {Fontisto} from "@expo/vector-icons"
import { theme } from "../../global/styles/theme";
import { StatusBarAnimation } from "expo-status-bar";
import BannerImg from '../../assets/banner.png'
import { styles } from "./styles";
import {ListHeader} from '../../components/ListHeader'; 
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useRoute } from "@react-navigation/native";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../Service/api";
import {Load} from "../../components/Load"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
type Params ={
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite:string;
    members: MemberProps[];

}

export function AppointmentDetails() {
    const [widget ,setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const {guildSelected} = route.params as Params

    async function fetchGuildWidget(){

        try{
            const response= await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
            setWidget(response.data);
            setLoading(false);

        } catch{
            Alert.alert("Verifique as confingurações do servidor. Será que o widget está habilitado?")

        }finally{
            setLoading(false)
        }
    }

    function handleShareInvitation(){
        

        if(widget.instant_invite !== null){

            const massage = Platform.OS === 'ios' ?
            `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invite ;

            Share.share({
                massage,
                url: widget.instant_invite
            });
        }
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite)
    }
        

    useEffect(() =>{
        fetchGuildWidget();
    },[]);

    return(
        <Background>
            <Header
                title="Detalhes"
                action ={
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style ={styles.title}> 
                        {guildSelected.guild.name}
                    </Text>

                    <Text style = {styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>


            </ImageBackground>
            {
                loading? <Load/> :
                <>
                    <ListHeader
                    title="Jogadores" 
                        subtitle={`Total ${widget.members.length} `}
                    />
                    <FlatList
                        data={widget.members}
                        keyExtractor= {item => item.id}
                        renderItem={({item}) => (
                        <Member data ={item}/>    
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        style={styles.members}

                    />
                </>
            }
            <View style={styles.footer}>
            <ButtonIcon 
                title="Entrar na Partida"
                onPress={handleOpenGuild}
            
            />
            </View>

        </Background>
    );
}