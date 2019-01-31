import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DeviceSetting from '../utils/DeviceSetting';
import { Actions } from 'react-native-router-flux';


export default ContactUs = () => {
    return (
        <View style={{flex:1}}>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:2
            }}>
                <Text>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.telephoneNumber+': '}</Text>
                <Text>6477565465</Text>
            </View>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:2
            }}>
                <Text>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.email+': '}</Text>
                <Text>pickupper.work@gmail.com</Text>
            </View>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:2
            }}>
                <Text>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.wechat+': '}</Text>
                <Text>6477565465</Text>
            </View>

            <TouchableOpacity style={{
                flexDirection:'row', 
                justifyContent:'center', 
                alignItems:'center',
                backgroundColor:'#fff',
                padding:20,
                marginTop:20
            }}
                onPress={()=>{Actions.push('feedback')}}
            >
                <Text style={{fontSize:20, fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.feedback}</Text>
            </TouchableOpacity>
        </View>
    )
}