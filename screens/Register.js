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
  ActivityIndicator
} from 'react-native';
import { Font, AppLoading } from "expo";
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
import * as firebase from 'firebase';
import DataUtil from  '../utils/DataUtil';
import {Toast} from 'teaset';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { connect } from 'react-redux';
import { saveAccount } from '../redux/actions/user';
import Firebase from '../backend/Firebase';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      message: '',
      confirmed: true,
      loading: true,
      userType:'',
      dropdownText: 'customer',
      mobile:'',
    };
  }

  async componentWillMount() {
    try{
      await Font.loadAsync({
        Arial: require("../assets/fontFamily/Arial.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
      });
      this.setState({ loading: false });
    }catch(e){
      console.log('Fail to load fonts!')
    }

  }

  register = () => {
    if(this.state.email===''){
        Toast.sad("Please enter your email!");
        return;
    }

    if(this.state.password===''){
        Toast.sad("Please enter your password!");
        return;
    }

    if(!DataUtil.check_email_format(this.state.email)){
      Toast.sad("The email format is not right!");
      return;
    }
    if(!DataUtil.check_phone_format(this.state.mobile)){
      Toast.sad("The mobile format is not right!");
      return;
    }
    if (this.state.password != '' && this.state.password != null){
        if(this.state.password.length<6 || this.state.password.length > 14 ){
            Toast.sad("The password length is between 6 and 14!");
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

      const phoneNumber = parsePhoneNumberFromString(this.state.mobile, 'CA');

      if(phoneNumber){
          if(!phoneNumber.isValid()){
              Toast.sad("The phone number is not valid!");
              return;
          }
      }

      Firebase.createUserWithEmailAndPassword(this.state.email, this.state.password).then(account=>{
          console.log('TIMESTAMP: '+ Date.parse(account.user.metadata.lastSignInTime))
          var user = {
            uid: account.user.uid,
            email:account.user.email,
            phoneNumber:account.user.phoneNumber,
            lastLoginAt:Date.parse(account.user.metadata.lastSignInTime),
            createdAt: Date.parse(account.user.metadata.creationTime),
            photoURL:account.user.photoURL,
          }
          this.props.saveAccount(user);
          this.setState({loading:false});
          Actions.push('emailverification');
      }).catch(e=>{
          console.log(JSON.stringify(e))
          alert('Something error!')
          this.setState({loading:false});
      })


      // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(account=>{
      //   console.log('TIMESTAMP: '+ Date.parse(account.user.metadata.lastSignInTime))
      //   var user = {
      //     uid: account.user.uid,
      //     email:account.user.email,
      //     phoneNumber:account.user.phoneNumber,
      //     lastLoginAt:Date.parse(account.user.metadata.lastSignInTime),
      //     createdAt: Date.parse(account.user.metadata.creationTime),
      //     photoURL:account.user.photoURL,
      //   }
      //   this.props.saveAccount(user);
      //   this.setState({loading:false});
      //   Actions.push('emailverification');
      // }).catch(e=>{
      //   console.log(JSON.stringify(e))
      //   alert('Something error!')
      //   this.setState({loading:false});
      // })
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
    if(this.state.loading){
      return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      )
    }
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
            <Fumi
              label={this.props.language.email}
              iconClass={FontAwesomeIcon}
              iconName={'envelope'}
              iconColor={'#f95a25'}
              iconSize={20}
              onChangeText={value =>
                this.debouncedSetState({ email: value })
              }
              keyboardType='email-address'
            />
            <Fumi
              label={this.props.language.password}
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
              label={this.props.language.confirmPassword}
              iconClass={FontAwesomeIcon}
              iconName={'key'}
              iconColor={'#f95a25'}
              iconSize={20}
              secureTextEntry
              onChangeText={value =>
                this.debouncedSetState({ passwordConfirm: value })
              }
             
            />

            {/*<Fumi
                iconClass={FontAwesomeIcon}
                iconName={'phone'}
                iconColor={'#f95a25'}
                iconSize={20}
                label={this.props.language.phoneNumber}
                onChangeText={value =>
                  this.debouncedSetState({ mobile: value })
                }
                keyboardType='numeric'
              />*/}

              {/* <TouchableOpacity onPress={this.renderUserTypeSelection.bind(this)}>
              <View style={{flex: 1, paddingTop:20, flexDirection:'row'}}>
  
                <Text style={{fontSize:16, fontWeight:'bold'}}>Sign up as:</Text>
                <Text style={{fontSize:16, marginLeft:20}}>{this.state.dropdownText}</Text>
                </View>

              </TouchableOpacity> */}


            {/*this.state.message.length > 0 ? (
              <Text>{this.state.message}</Text>
            ) : null*/}
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
              <Text style={{ color: 'white' }}>{this.props.language.register}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(store){
  return {
    language: store.setting.language,
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveAccount(account){
        dispatch(saveAccount(account));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)