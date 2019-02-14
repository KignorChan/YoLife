import React from 'react';
import { View, ImageBackground, Dimensions, StatusBar, Animated, ActivityIndicator, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { Button, Text } from 'native-base';
import { Font, AppLoading } from "expo";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


const { width, height } = Dimensions.get('screen');

class SignupSuccessScreen extends React.Component {

    constructor(props){
        super(props);

        const textMarginTop = new Animated.Value(0)

        this.state={
            textMarginTop,
            loading: true,
        }
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

    componentDidMount(){
        Animated.spring(this.state.textMarginTop,{
            toValue:300,
        }).start();
    }

    render(){
        if(this.state.loading){
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

        return(
            <ImageBackground source={require('../assets/images/foodPic3.jpg')} style={{width:width, height:height}}>
            <StatusBar hidden />
            <Animated.View style={{marginTop:this.state.textMarginTop, alignItems: 'center', borderColor:'#fff', borderWidth: 1,}}>
                <Text style={{fontSize:25, color:'#fff', fontWeight:'bold'}}>Sign up sucessfully!</Text>
                <TouchableOpacity style={{
                    backgroundColor:'#E69E46', 
                    padding:15, 
                    borderRadius:5, 
                    marginTop:40}}
                    onPress={()=>{Actions.reset('tabs')}}>
                    <Text style={{color:'#fff'}}>{this.props.language.next}</Text>
                </TouchableOpacity>
            </Animated.View>
            </ImageBackground>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignupSuccessScreen);
  