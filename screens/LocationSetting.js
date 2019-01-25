import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, Platform, StatusBar, SafeAreaView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';


import DeviceSetting from '../utils/DeviceSetting';


var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


 class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }
  render() {
    const {
        container,
        cardContainer,
        labelText,
        addressText,
        arrowIcon
    } = styles;

    return (
      <SafeAreaView style={container}>
            <TouchableOpacity style={cardContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', flex:1, paddingRight:20}}>
                    <Text style={labelText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.homeAddress+': '}</Text>
                    <Text style={addressText}>{'4580 Dufferin street'}</Text>
                </View>
                <Icon 
                    name={'ios-arrow-forward'}
                    size={18}
                    style={arrowIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={cardContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', flex:1, paddingRight:20}}>
                    <Text style={labelText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.workAddress+': '}</Text>
                    <Text style={addressText}>{'4580 Dufferin street'}</Text>
                </View>
                <Icon 
                    name={'ios-arrow-forward'}
                    size={18}
                    style={arrowIcon}
                />
            </TouchableOpacity>
            <View style={cardContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between', flex:1, paddingRight:20}}>
                    <Text style={labelText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.previousAddress+': '}</Text>
                </View>
            </View>




            {/*<View style={{
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                paddingLeft:20,
                paddingRight:20,
                paddingTop:10,
                paddingBottom:10,
                marginTop:2,
                flexDirection:'row'
            }}>
                <Text style={{fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.workAddress+': '}</Text>
                <TextInput style={{}}>{this.state.lastName}</TextInput>
            </View>
            <View style={{
                justifyContent:'space-between', 
                backgroundColor:'#fff',
                paddingLeft:20,
                paddingRight:20,
                paddingTop:10,
                paddingBottom:10,
                marginTop:2,
                flexDirection:'row'
            }}>
                <Text style={{fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.previousAddress+': '}</Text>
        </View>*/}
            <ScrollView>
                <TouchableOpacity style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:30,
                    paddingRight:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                    flexDirection:'row'
                }}>
                    <Text>{'4580 Dufferin street'}</Text>
                </TouchableOpacity>
            </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = {
    container:{
        flex:1,
    },
    cardContainer:{
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
        paddingBottom:20,
        marginTop:2,
        flexDirection:'row',
    },
    labelText:{
        fontWeight:'bold'
    },
    addressText:{

    },
    arrowIcon:{
        color:'rgba(0,0,0,0.3)'
    }
}

export default Profile;
