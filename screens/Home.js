import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


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