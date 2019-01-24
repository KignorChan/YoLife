import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Header, Body, Left, Right } from 'native-base';

import HomeHeader from './components/HomeHeader';
import ClassificationSection from './components/ClassificationSection';


var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import DeviceSetting from '../utils/DeviceSetting';

class Home extends React.Component {
    render(){
        return(
            <View style={{flex:1, backgroundColor:'#ddd'}}>
                <HomeHeader/>
                <ClassificationSection/>
            </View>
        )
    }
}

// function select(store){
//     return {

//     }
// }

//export default connect(select)(Home);
export default Home;