import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import DeviceSetting from '../utils/DeviceSetting';

class Home extends React.Component {
    render(){
        return(
            <View style={{flex:1, backgroundColor:'#ddd'}}>
                <TouchableOpacity style={{padding:30, borderWidth:2, borderColor:'#aaa', justifyContent:'center', alignItems:'center'}}
                    onPress={()=>{DeviceSetting.setAppLanguage("CHINESE")}}
                >
                    <Text>Chinese</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:30, borderWidth:2, borderColor:'#aaa', justifyContent:'center', alignItems:'center'}}
                    onPress={()=>{DeviceSetting.setAppLanguage("ENGLISH")}}
                >
                    <Text>English</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home;