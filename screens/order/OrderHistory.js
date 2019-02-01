import React, { Component } from 'react';
import { Image, TouchableOpacity, View, AsyncStorage,Dimensions,StyleSheet } from 'react-native';
import { Container, Item, Input, Title, Tab, Tabs, Label, Form, Header, Content, Text, Icon, Left, Body, Right, Button } from 'native-base';
import OrderBelongUser from './OrderBelongUser';
import OrderBelongUserHis from './OrderBelongUserHis';


var {width, height} = Dimensions.get('window');

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: {},
      orderDetails: {},
      isCurrent:true,
    };
    this.filterStores(props.stores);
  }

  _changeTOCurrentTab(){
      this.setState({isCurrent:true,});
      this.forceUpdate();
  }

  _changeTOHisTab(){
    this.setState({isCurrent:false,});
    this.forceUpdate();
  }

  filterStores = stores => {
    
  };
  componentDidMount(){
      
  }

  render() {
      return(

        <View style={{flex:1,backgroundColor:'#fff',}}>
            <View style={{
                    height:60, 
                    width:width, 
                }}>
            </View>
            <View style={{  
                    marginLeft:20,
                    flexDirection:'row',
                    marginBottom:25,
                    marginTop:5,
                }}>
                <TouchableOpacity  style={[styles.tab,{backgroundColor: this.state.isCurrent?'#000':'#F0E7EC'}]} onPress={() => this._changeTOCurrentTab()}>
                    <Text style={styles.text}>当前订单</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.tab,{backgroundColor: this.state.isCurrent?'#F0E7EC':'#000'}]} onPress={() => {
                                                      this.setState({isCurrent:false});
                                                      
                                                  }}>
                    <Text style={styles.text}>历史订单</Text>
                </TouchableOpacity>
            </View>

          <View style={{flex:1, marginBottom:30,marginLeft:20,marginRight:20}}>
              {
                this.state.isCurrent ? 
                    <View  style={{flex:1,backgroundColor:'#F5EDED',}}>
                        <OrderBelongUser orderStatus={"customerprogressing"} userId={this.state.userId} businessName={this.state.business_name}/>
                    </View>
                    :
                    <View  style={{flex:1,backgroundColor:'#F5EDED',}}>
                        <OrderBelongUserHis orderStatus={"rejected,completed"} userId={this.state.userId} businessName={this.state.business_name}/>
                    </View>
              }
          </View>

    </View>

      )             
    
  }
}

const styles = StyleSheet.create({
  tab: {
      width: 110,
      height:40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {
      fontSize:20,
      color:'white',
  },
})
