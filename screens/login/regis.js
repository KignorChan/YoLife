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
    };
  }

  render() {
    return (

      <View>
        <View>
          <Text>User Name:</Text>
          <TextInput 
              ref="register_name" 
              placeholder='email' 
              style={styles.loginInput} 
              onChangeText={this.onChangeEmail}
              value={email}
          />
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput 
              ref="password" 
              placeholder='password' 
              style={styles.loginInput} 
              onChangeText={this.onChangePass}
              value={password}
          />
        </View>
        <View>
          <Text>Confirm Password:</Text>
          <TextInput 
              ref="passwordConfirm" 
              placeholder='comfirm password' 
              style={styles.loginInput} 
              onChangeText={this.onChangeConfirmPass}
              value={passwordConfirm}
          />
        </View>
        <View>
        <Text>Tel Number:</Text>
          <TextInput 
              ref="tel" 
              placeholder='tel number' 
              style={styles.loginInput} 
              onChangeText={this.onChangeTel}
              value={tel}
          />
        </View>
      </View>
      
    );
  }
}
var styles = StyleSheet.create({

  loginInput: {
    height: 30,
    borderColor: '#000',
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
  },
})