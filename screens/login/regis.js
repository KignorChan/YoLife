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
  Alert
} from 'react-native';
import * as _ from 'lodash';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Isao,Fumi } from 'react-native-textinput-effects';
import {
  Button,
  Text,
  Left,
  Body,
  Right,
  Container,
  Content,
  Header,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import DataUtil from  '../../utils/DataUtil';
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
    } else {
      this.setState({ message: 'Loading...', loading: true, confirmed: true });
      FireBase.signup(this.state.username, this.state.password)
        .then(result => {
          FireBase.updateUserType(result.uid, this.state.dropdownText);
          //if(result.emailVerified){
            FireBase.login(false, {
              email: this.state.username,
              password: this.state.password,
            })
              .then(r1 => {
                FireBase.getDatabase().ref('users/'+result.uid).on('value',snapshot=>{
                  var user = snapshot.val();
                  Authentication.saveItem('userId', result.uid);
                  Authentication.saveItem('userEmail', this.state.username);
                  FireBase.currentUser.userType = user.userType;
                });
  
                Actions.push('mainPage');
              })
              .catch(e => {
                console.log(e.message);
                this.setState({ message: e.message, loading: false });
              });
          // }else{
          //   Actions.push('emailVerification',{from:'registerView'})
          // }
          
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          this.setState({ message: error.message, loading: false });
        });
    }
  };

  componentDidMount() {
    this.debouncedSetState = _.debounce(this.setState, 300);
  }

  renderUserTypeSelection(){
    Alert.alert(
      'Account Type',
      'Please choose an account type:',
      [
        {text: 'customer', onPress: () => this.setState({dropdownText: 'customer'})},
        {text: 'business', onPress: () => this.setState({dropdownText: 'business'})},
        {text: 'Cancel', onPress: () => console.log('cancel pressed!')},
      ],
      { cancelable: false }
    )

    // return (
    //   <DropdownMenu
    //     style={{flex: 1}}
    //     bgColor={'white'}
    //     tintColor={'#666666'}
    //     activityTintColor={'green'}
    //     // arrowImg={}      
    //     // checkImage={}   
    //     // optionTextStyle={{color: '#333333'}}
    //     // titleStyle={{color: '#333333'}} 
    //     maxHeight={300} 
    //     handler={(selection, row) => this.setState({dropdownText: this.state.userType[selection][row]})}
    //     data={this.state.userType}
    //   >
    //   </DropdownMenu>
    // );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" style={{ color: 'black' }} />
            </Button>
          </Left>
          <Body>
            <Text>Register</Text>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
            <Fumi
              label="Email"
              iconClass={FontAwesomeIcon}
              iconName={'envelope'}
              iconColor={'#f95a25'}
              iconSize={20}
              onChangeText={value =>
                this.debouncedSetState({ username: value })
              }
              
            />
            <Fumi
              label="Password"
              iconClass={FontAwesomeIcon}
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
              iconClass={FontAwesomeIcon}
              iconName={'key'}
              iconColor={'#f95a25'}
              iconSize={20}
              secureTextEntry
              onChangeText={value =>
                this.debouncedSetState({ passwordConfirm: value })
              }
             
            />

            <Fumi
                iconClass={FontAwesomeIcon}
                iconName={'phone'}
                iconColor={'#f95a25'}
                iconSize={20}
                label="Mobile"
                onChangeText={value =>
                  this.debouncedSetState({ mobile: value })
                }
            />

              {/* <TouchableOpacity onPress={this.renderUserTypeSelection.bind(this)}>
              <View style={{flex: 1, paddingTop:20, flexDirection:'row'}}>
  
                <Text style={{fontSize:16, fontWeight:'bold'}}>Sign up as:</Text>
                <Text style={{fontSize:16, marginLeft:20}}>{this.state.dropdownText}</Text>
                </View>

              </TouchableOpacity> */}


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
        </Content>
      </Container>
    );
  }
}
