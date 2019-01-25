import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, Animated, ScrollView, RefreshControl, Platform, StatusBar, Easing, PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Header, Body, Left, Right } from 'native-base';

import HomeHeader from './components/HomeHeader';
import ClassificationSection from './components/ClassificationSection';
import DeviceSetting from '../utils/DeviceSetting';

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const STATUSBAR_HEIGHT = Platform.OS==='android'?StatusBar.currentHeight:0;
const HEADER_HEIGHT = height*0.11;
const ADVERTIS_IMAGE_HEIGHT = height*0.23;
const CLASSIFICATION_POSITION_INITIAL = HEADER_HEIGHT+ADVERTIS_IMAGE_HEIGHT;
const TABBAR_HEIGHT = height*0.08;
const BODY_HEIGHT = height-HEADER_HEIGHT-ADVERTIS_IMAGE_HEIGHT-TABBAR_HEIGHT;
const BODY_HEIGHT_AFTER_SCROLL = height-HEADER_HEIGHT-TABBAR_HEIGHT;



class Home extends React.Component {

    constructor(props){
        super(props);

        const searchPosition = new Animated.ValueXY();
        const typePosition = new Animated.ValueXY();
        const classificationSectionPosition = new Animated.Value(0);
        const bodyHeight = new Animated.Value(BODY_HEIGHT)

        this.state={
            searching:false,
            uniqueValue: 1,
            searchPosition,
            typePosition,
            refreshing: false,
            classificationSectionPosition,
            bodyHeight
        }
    }

    _onScroll = event => {    
        if(event.nativeEvent.contentOffset.y > 0){
            if(this.state.searchPosition.y._value==0){
                this.moveComponents();
            }
        }
        if(event.nativeEvent.contentOffset.y < -55){
            if(this.state.searchPosition.y._value==-70){
                this.resetComponentPosition();
            }
        }
    }

    _onRefresh = () => {
        if(Platform.OS==='android'){
            this.resetComponentPosition();
        }
        setTimeout(()=>{
            this.setState({refreshing: true});
            //this.getLocation();
            this.fetchData();

        },1000);      
    }

    fetchData(){
        this.forceRemount();
        this.setState({refreshing: false});
    }

    forceRemount(){
        this.setState(({ uniqueValue }) => ({
          uniqueValue: uniqueValue + 1
        }));

    }

    _onScroll = event => {    
        console.log(event.nativeEvent.contentOffset.y)
        if(event.nativeEvent.contentOffset.y > 0){
            if(this.state.searchPosition.y._value==0){
                this.moveComponents();
            }
        }
        if(event.nativeEvent.contentOffset.y < -55){
            if(this.state.searchPosition.y._value==-70){
                this.resetComponentPosition();
            }
        }
    }

    resetComponentPosition(){
        Animated.timing(this.state.classificationSectionPosition,{
            toValue:0,
            duration:250,
            easing: Easing.linear
        }).start(()=>{
            Animated.timing(this.state.bodyHeight,{
                toValue:BODY_HEIGHT,
                duration:250,
            }).start();
        });



        Animated.timing(this.state.searchPosition,{
            toValue:{x:0, y:0},
            duration:250
        }).start();
        Animated.timing(this.state.typePosition,{
            toValue:{x:0, y:0},
            duration:250
        }).start();
    }

    moveComponents(){
        this.state.bodyHeight.setValue(BODY_HEIGHT_AFTER_SCROLL);

        Animated.timing(this.state.classificationSectionPosition,{
            toValue:-ADVERTIS_IMAGE_HEIGHT,
            duration:250,
            easing: Easing.linear
        }).start();

        Animated.timing(this.state.searchPosition,{
            toValue:{x:0, y:-70},
            duration:250
        }).start();
        Animated.timing(this.state.typePosition,{
            toValue:{x:0, y:-width*0.468},
            duration:250
        }).start();
    }


    render(){
        const {
           container 
        } = styles;

        //calculate body height:
        let bodyHeight = 0.00;
        if(height===896){
            bodyHeight = 847;
        }else if(height===812){
            bodyHeight = 750;
        }else{
            bodyHeight = height;
        }
        bodyHeight = bodyHeight-HEADER_HEIGHT-TABBAR_HEIGHT;

        return(
            <View style={container}>
                <HomeHeader style={{height:HEADER_HEIGHT}}/>
                <ImageBackground source={require('../assets/images/homeHead.jpg')} style={{
                    width:width,
                    height:ADVERTIS_IMAGE_HEIGHT,
                    alignItems:'center',
                    paddingTop:12
                }}
                    resizeMode='cover'
                >
   
                </ImageBackground>

                <Animated.View style={{height:Platform.OS==='ios'?bodyHeight:this.state.bodyHeight, backgroundColor:'#FFFFFE', marginTop: this.state.classificationSectionPosition,}}> 
                    <ClassificationSection/>
                    <ScrollView style={{flex:1}} 
                        key={this.state.uniqueValue}
                        refreshControl={
                            <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            overScrollMode='always'
                            />
                        }
                        onScroll={this._onScroll}
                        scrollEventThrottle={16}
                    >



                    </ScrollView>
                </Animated.View>
            </View>
        )
    }
}

const styles = {
    container:{
        flex:1, 
        backgroundColor:'#ddd',
        paddingTop: STATUSBAR_HEIGHT,
    }
}

// function select(store){
//     return {

//     }
// }

//export default connect(select)(Home);
export default Home;