import React from 'react';
import { View, Text } from 'react-native';
import DeviceSetting from '../utils/DeviceSetting';

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
        </View>
    )
}