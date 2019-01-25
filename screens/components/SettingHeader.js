import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HEADER_HEIGHT = height*0.3;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;
const DEFAULT_IMAGE_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/pickupper-47f2b.appspot.com/o/images%2FMcDonald%2F1547679255517%2F1548365479365.jpg?alt=media&token=053e4a9a-7cd4-48ba-808f-8cf5be91787a';

export default SettingHeader = () => {
    return(
        <View style={{
            backgroundColor:'#fff', 
            height:HEADER_HEIGHT, 
            justifyContent:'center', 
            alignItems:'center',
        }}>
            <Image source={{uri:DEFAULT_IMAGE_SOURCE}} style={{
                height:AVATAR_SIZE, 
                width:AVATAR_SIZE, 
                borderRadius: AVATAR_SIZE/2,
                marginBottom:10
            }}/>
            <Text style={{fontSize:25, fontWeight:'bold'}}>User Name</Text>
            <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{Actions.push('profile')}}>
                <Text style={{fontSize:18, color:'#4286f4'}}>Edit</Text>
                <EntypoIcon name='new-message' size={18} style={{marginLeft:5, color:'#4286f4'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                position:'absolute',
                top:20,
                left:20
            }} onPress={()=>{Actions.pop()}}>
                <FeatherIcon name='arrow-left' size={28} />
            </TouchableOpacity>
        </View>
    )
}