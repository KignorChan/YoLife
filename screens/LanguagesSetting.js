import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';

import DeviceSetting from '../utils/DeviceSetting';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height*0.18;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;


class LanguagesSetting extends React.Component{
    render(){
        const { 
            container, 
            header, 
            avatar,
            headerUsername,
            buttonSection 
        } = styles;

        return(
            <SafeAreaView style={container}>
                <ScrollView style={buttonSection}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{DeviceSetting.setAppLanguage("CHINESE")}}>        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.simplifiedChinese}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{DeviceSetting.setAppLanguage("ENGLISH")}}>        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.english}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView> 
        )
    }
}

const styles = {
    container:{
        flex:1,
        backgroundColor:'#eee',
        paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
        

    },
    header:{
        height:HEADER_HEIGHT,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: width*0.1,
        backgroundColor:'#fff',
    },
    avatar:{
        height:AVATAR_SIZE,
        width:AVATAR_SIZE,
        borderRadius: AVATAR_SIZE/2,
    },
    headerUsername:{
        fontSize: 24,
        marginLeft: 20,
    },
    buttonSection:{
        backgroundColor:'#eee'
    },
    buttonContainer:{
        backgroundColor:'#fff',
        marginTop:2,
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        
    },
    buttonIcon:{
    },
    buttonText:{
        fontSize:18,
        flex:1,
        marginLeft: 20
    },
    buttonArrowIcon:{
        justifyContent:'flex-end',
        color:'rgba(0,0,0,0.3)',
    }
}

export default LanguagesSetting;