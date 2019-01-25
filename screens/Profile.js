import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, Platform, StatusBar, SafeAreaView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';

import DeviceSetting from '../utils/DeviceSetting';


var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HEADER_HEIGHT = height*0.25;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;
const DEFAULT_IMAGE_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/pickupper-47f2b.appspot.com/o/images%2FMcDonald%2F1547679255517%2F1548365479365.jpg?alt=media&token=053e4a9a-7cd4-48ba-808f-8cf5be91787a';

 class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName:'John',
            lastName:'Doe',
            phoneNumber:'6478576465',
            email:'pickupper.work@gmail.com',
            avatarUrl:'',
        }
    }
  render() {
    return (
      <SafeAreaView style={{
          flex:1,
          paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
        }}>
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
            <TouchableOpacity style={{
                position:'absolute',
                top:20,
                left:20
            }} onPress={()=>{Actions.pop()}}>
                <FeatherIcon name='arrow-left' size={28} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <View style={{
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                paddingLeft:20,
                paddingTop:20,
                paddingBottom:10,
                marginTop:2
            }}>
                <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.firstName+': '}</Text>
                <TextInput style={{fontSize:20}}>{this.state.firstName}</TextInput>
            </View>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:2
            }}>
                <Text>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.lastName+': '}</Text>
                <TextInput>{this.state.lastName}</TextInput>
            </View>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:2
            }}>
                <Text>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.telephoneNumber+': '}</Text>
                <TextInput>{this.state.phoneNumber}</TextInput>
            </View>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:2
            }}>
                <Text>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.email+': '}</Text>
                <TextInput>{this.state.email}</TextInput>
            </View>

            <TouchableOpacity style={{
                flexDirection:'row', 
                justifyContent:'center', 
                backgroundColor:'#fff',
                padding:20,
                marginTop:20
            }}>
                <TextInput>Change password</TextInput>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default Profile;
