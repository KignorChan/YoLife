import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Header, Body, Left, Right } from 'native-base';

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const HEADER_HEIGHT = height*0.1;



export default HomeHeader = ({style={height:HEADER_HEIGHT}}) => {
    
    return (
        <Header style={[{backgroundColor:'#FFFFFE', paddingTop:40, paddingBottom:20, height:HEADER_HEIGHT},style]}>
            <Left style={{flex:1}}/>
            <Body style={{flex: 5, alignItems:'center'}}>
                <Image source={require('../../assets/images/headerLogo.png')} style={{
                    height:width*0.24/227*130,
                    width:width*0.24,
                    borderColor:'#000',
                }}/>
            </Body>
            <Right style={{flex:1}}/>
        </Header>
    )
}