import React, { Component } from 'react';
import {StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ScrollView,
    Button,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    TextInput,
    Dimensions
} 
from 'react-native';
import DataUtil from '../../utils/DataUtil';
import {Theme, NavigationPage, ListRow, Overlay, Label, Checkbox,Select,Toast} from 'teaset';
import { Switch, Card, CardItem, Container, Header, Content, Thumbnail, Body, Title, Left, Right, Separator } from 'native-base'



const { width, height } = Dimensions.get('window')

class OrderBelongUser extends Component{
    
    constructor(props){
        super(props);
        
        this.rejectReasons = [
            '食材不足',
            '其他原因',
          ];

        this.state = {
            
        }
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <View>
                
            </View>
        )
    }

    _renderOrdersItemView(){
       
        
    }

    _showOrderList(index){
       
    }

    _submitFeedback(){
    
        
    }
    _clearFeedback(){
        
    }

    _toComment(item){
        
    }

    _renderItemView(item){
        
    }

    openOrderDetail(orderDetail){
        
    }

    renderModal(){
    
    }

}

const styles = StyleSheet.create({
    buttonContainer: {
        flex:1,
        justifyContent:'space-around',
        flexDirection: 'row',
        backgroundColor:'#99caff',
        marginTop:10
    },
    buttonLeft: {
        alignItems: 'flex-start', 

    },
    buttonRight: {
        alignItems: 'flex-end', 

    },
    orders: {
        marginBottom: 20,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    orderstext: {
        marginBottom: 20,
        flexDirection:'row',
    },
     buttonStyle: {
      borderColor: '#000',
      backgroundColor: '#fff',
      borderWidth: 2,
      borderRadius: 0,
      width: 140,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
  },
})

export default OrderBelongUser;