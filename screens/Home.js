import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Header, Body } from 'native-base';


var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import DeviceSetting from '../utils/DeviceSetting';

class Home extends React.Component {
    render(){
        return(
            <View style={{flex:1, backgroundColor:'#ddd'}}>
                
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