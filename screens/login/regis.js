import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Isao,Fumi } from 'react-native-textinput-effects';
import { Actions } from 'react-native-router-flux';
import DataUtil from '../../utils/DataUtil';
import {Toast} from 'teaset';

export default class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      message: '',
      confirmed: true,
      loading: false,
      userType:'',
      dropdownText: 'customer',
      mobile:'',
    };
  }

  register = () => {
    if(!DataUtil.check_email_format(this.state.username)){
      Toast.sad("the email format is not right!");
      return;
    }
    if(!DataUtil.check_phone_format(this.state.mobile)){
      Toast.sad("the mobile format is not right!");
      return;
    }
    if (this.state.password != '' && this.state.password != null){
        if(this.state.password.length<6 || this.state.password.length > 14 ){
            Toast.sad("the password length is between 6 and 14!");
            //this.setState({ message: 'the password length is between 6 and 14!', confirmed: false });
            return;
        }
    }
    if (this.state.password !== this.state.passwordConfirm) {
      //this.setState({ message: 'Password does not match', confirmed: false });
      Toast.sad('Password does not match');
      return ;
    } 
  };

  componentDidMount() {
    this.debouncedSetState = _.debounce(this.setState, 300);
  }

  render() {
    return (
      <View>

          <View style={styles.left}>
            <Button transparent onPress={() => Actions.pop()}>
              
            </Button>
          </View>
          <View style={styles.body}>
            <Text>Register</Text>
          </View>


        <View style={ styles.content }>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
            <Fumi
              label="Email"
              iconClass={Ionicons}
              iconName={'envelope'}
              iconColor={'#f95a25'}
              iconSize={20}
              onChangeText={value =>
                this.debouncedSetState({ username: value })
              }
              
            />
            <Fumi
              label="Password"
              iconClass={Ionicons}
              iconName={'key'}
              iconColor={'#f95a25'}
              iconSize={20}
              secureTextEntry
              onChangeText={value =>
                this.debouncedSetState({ password: value })
              }
              
            />
            <Fumi
              label="Password Confirm"
              iconClass={Ionicons}
              iconName={'key'}
              iconColor={'#f95a25'}
              iconSize={20}
              secureTextEntry
              onChangeText={value =>
                this.debouncedSetState({ passwordConfirm: value })
              }
             
            />

            <Fumi
                iconClass={Ionicons}
                iconName={'phone'}
                iconColor={'#f95a25'}
                iconSize={20}
                label="Mobile"
                onChangeText={value =>
                  this.debouncedSetState({ mobile: value })
                }
            />


            {this.state.message.length > 0 ? (
              <Text>{this.state.message}</Text>
            ) : null}
          </View>
          <View
            style={{
              marginTop: 20,
              marginLeft:50,
              flexDirection: 'row',
            }}
          >
            <Button
              dark
              onPress={() => this.register()}
              disabled={this.state.loading}
            >
              <Text style={{ color: 'white' }}>Register</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  left: {
   
  },
  body: {
   
  },
  content: {
   
  },
})