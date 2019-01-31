import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import * as firebase from 'firebase';

import Root from './Root';
import DeviceSetting from './utils/DeviceSetting';

import configureStore from './redux/store/store';

import Setting from './screens/Setting';

let { store, persistor } = configureStore();

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      prepareLanguageComplete:false,
    }
  }

  componentWillMount(){
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCqzojrW7szmLKgaITTKSqTG9NFejMRMyU",
        authDomain: "yolife-541a7.firebaseapp.com",
        databaseURL: "https://yolife-541a7.firebaseio.com",
        projectId: "yolife-541a7",
        storageBucket: "yolife-541a7.appspot.com",
        messagingSenderId: "972980896041"
      };
      firebase.initializeApp(config);
  }

  componentDidMount(){
    DeviceSetting.setLanguagePackage().then(result=>{
      if(result==='complete'){
        this.setState({prepareLanguageComplete:true});
      }
    })

    //console.log(JSON.stringify(store))
  }

  render() {

    if(this.state.prepareLanguageComplete){
      return (
        <Provider store={store}>
          <PersistGate 
            loading={<ActivityIndicator size="large" color="#0000ff" />}
            persistor={persistor}>
              <Root/>
          </PersistGate>
        </Provider>
      );
    }

    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

