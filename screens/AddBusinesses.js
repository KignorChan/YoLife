import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, Platform, StatusBar, SafeAreaView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';

import DeviceSetting from '../utils/DeviceSetting';

const { width, height } = Dimensions.get('window');


var ScrollableTabView = require('react-native-scrollable-tab-view');

class AddBusinesses extends Component{

    _renderInformationSection(){
        return (
            <View>
                <ScrollView horizontal={true}>
                    <Image source={require('../assets/images/addImage.png')} style={{width:width, height:height*0.75}} />
                    <Image source={require('../assets/images/addImage.png')} style={{width:width, height:height*0.75}} />

                </ScrollView>
            </View>
        )
    }

    render(){
        const {
            container,
            scrollableView,
        } = styles;

        return(
            <View style={container}>
                <ScrollableTabView style={scrollableView}>
                    <View tabLabel={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.information}>
                        {this._renderInformationSection()}
                    </View>
                    <View tabLabel={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.items}>
                    
                    </View>
                    <View tabLabel={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.contact}>
                    
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = {
    container:{
        flex:1,
    },
    scrollableView:{
        backgroundColor:'#fff'
    }
}

export default AddBusinesses;