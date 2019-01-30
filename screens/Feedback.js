import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Button, Linking } from 'react-native';
import { connect } from 'react-redux';
import email from 'react-native-email'
import Icon from 'react-native-vector-icons/FontAwesome';

import DeviceSetting from '../utils/DeviceSetting';

const { width, height } = Dimensions.get('window');
const TO_EMAIL = 'laplace.developer@gmail.com'

class Feedback extends React.Component {

    constructor(props){
        super(props);

        this.state={
            body:''
        }
    }

    async handleEmail(){
        const to = [TO_EMAIL] 

        let url = `mailto:${TO_EMAIL}`;

        const canOpen = await Linking.canOpenURL(url);

        if(this.state.body===''){
            alert('Please do not send empty message!')
            return;
        }
    
        if (!canOpen) {
            alert('Cannot find email server in your phone!');
        }else{
            try{
                email(to, {
                    subject: 'YoLife feedback',
                    body: this.state.body
                }).catch(console.error)
            }catch(e){
                alert('Cannot find email server in your phone!')
            }
        }
    }

    render(){
        const {
            textAreaContainer,
            textArea,
            buttonContainer
        }=styles;

        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={textAreaContainer}>
                    <TextInput
                        style={textArea}
                        underlineColorAndroid="transparent"
                        placeholder={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.feedbackMessage}
                        placeholderTextColor="grey"
                        numberOfLines={15}
                        multiline={true}
                        onChangeText={text=>{this.setState({body:text})}}
                        value={this.state.body}
                    />           
                </View>
                <View style={{alignItems:'flex-end', paddingTop:10, paddingRight:10}}>
                    <View style={buttonContainer}>
                        <Button
                        onPress={this.handleEmail.bind(this)}
                        title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.sendFeedback}
                        color="#841584"
                        />                
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    textAreaContainer: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 5,
    },
    textArea: {
        height: height*0.3,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        fontSize: 18,

    },
    buttonContainer:{
        width:width*0.4,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
    }
}

function mapState2Props(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
    }
}

function mapDispatch2Props(dispatch){
    return {
        gotoLogout(){
            dispatch(logOut());
        }
    }
}


export default connect(mapState2Props,mapDispatch2Props)(Feedback);