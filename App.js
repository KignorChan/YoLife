import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
//import * as firebase from 'firebase';
import Firebase from './backend/Firebase';

import Root from './Root';

import configureStore from './redux/store/store';

import Setting from './screens/Setting';

let { store, persistor } = configureStore();

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading:true,
    }
  }

  componentWillMount(){
      // Initialize Firebase
      // var config = {
      //   apiKey: "AIzaSyCqzojrW7szmLKgaITTKSqTG9NFejMRMyU",
      //   authDomain: "yolife-541a7.firebaseapp.com",
      //   databaseURL: "https://yolife-541a7.firebaseio.com",
      //   projectId: "yolife-541a7",
      //   storageBucket: "yolife-541a7.appspot.com",
      //   messagingSenderId: "972980896041"
      // };
      // firebase.initializeApp(config);
      Firebase.initialize();
      this.setState({loading:false});
  }

  render() {

    if(!this.state.loading){
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

export default App;


