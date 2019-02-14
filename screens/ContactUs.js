import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


class ContactUs extends React.Component{

    render(){
        return (
            <View style={{flex:1}}>
                <View style={{
                    flexDirection:'row', 
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    padding:20,
                    marginTop:2
                }}>
                    <Text>{this.props.language.telephoneNumber+': '}</Text>
                    <Text>6477565465</Text>
                </View>
                <View style={{
                    flexDirection:'row', 
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    padding:20,
                    marginTop:2
                }}>
                    <Text>{this.props.language.email+': '}</Text>
                    <Text>pickupper.work@gmail.com</Text>
                </View>
                <View style={{
                    flexDirection:'row', 
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    padding:20,
                    marginTop:2
                }}>
                    <Text>{this.props.language.wechat+': '}</Text>
                    <Text>6477565465</Text>
                </View>

                <TouchableOpacity style={{
                    flexDirection:'row', 
                    justifyContent:'center', 
                    alignItems:'center',
                    backgroundColor:'#fff',
                    padding:20,
                    marginTop:20
                }}
                    onPress={()=>{Actions.push('feedback')}}
                >
                    <Text style={{fontSize:20, fontWeight:'bold'}}>{this.props.language.feedback}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(store){
    return {
      language: store.setting.language,
      isLoggedIn: store.userStore.isLoggedIn
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
      saveLocation(location){
        dispatch(saveLocation(location));
      },
      languageSetting(language){
        dispatch(languageSetting(language))
      },
      logout(){
        dispatch(logOut());
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);