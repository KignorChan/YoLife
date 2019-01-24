import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import {Toast} from 'teaset';

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
      email:'',
      tel:'',
    };
  }

  render() {
    return (

      <View>
        <View style={styles.container}>
          <Text>User Name:</Text>
          <TextInput 
              ref="register_name" 
              placeholder='email' 
              style={styles.loginInput} 
              onChangeText={this.onChangeEmail}
              value={this.state.email}
          />
        </View>
        <View style={styles.container}>
          <Text>Password:</Text>
          <TextInput 
              ref="password" 
              placeholder='password' 
              style={styles.loginInput} 
              onChangeText={this.onChangePass}
              value={this.state.password}
          />
        </View>
        <View style={styles.container}>
          <Text>Confirm Password:</Text>
          <TextInput 
              ref="passwordConfirm" 
              placeholder='comfirm password' 
              style={styles.loginInput} 
              onChangeText={this.onChangeConfirmPass}
              value={this.state.passwordConfirm}
          />
        </View>
        <View style={styles.container}>
            <Text>Tel Number:</Text>
            <TextInput 
                ref="tel" 
                placeholder='tel number' 
                style={styles.loginInput} 
                onChangeText={this.onChangeTel}
                value={this.state.tel}
            />
        </View>
      </View>
      
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
  },
  loginInput: {
    height: 30,
    borderColor: '#000',
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor:'#000',
  },
})