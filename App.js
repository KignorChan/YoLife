import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Root from './Root';
import DeviceSetting from './utils/DeviceSetting';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      prepareLanguageComplete:false,
    }
  }

  componentDidMount(){
    DeviceSetting.setLanguagePackage().then(result=>{
      if(result==='complete'){
        this.setState({prepareLanguageComplete:true});
      }
    })
  }

  render() {

    if(this.state.prepareLanguageComplete){
      return (
        <Root/>
      );
    }

    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

