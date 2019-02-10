import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Hideo, Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { } from '../redux/actions/user';

import DeviceSetting from '../utils/DeviceSetting';
import DataUtil from  '../utils/DataUtil';
import ModalDropdown from './common/ModalDropdown';


class AddressInputView extends Component {
    static defaultProps = {
        location:{
            coords:{
                latitude: 0.000,
                longitude: 0.000
            }
        }
    }

    constructor(props){
        super(props);

        this.state = {
            addressSuggestions:[],
            searching:false,
            showModalDropdown:false,
            addressSugessts:[],
            address:this.props.address,
            currentAddress:'',
            currentAddressError:'',
        }
    }

    componentDidMount(){
        //console.log('AAAA'+JSON.stringify(this.props.location));

        if(this.props.location.coords!==undefined){
            DataUtil.getAddressFromCoord(this.props.location.coords.latitude,this.props.location.coords.longitude).then(result=>{
                this.setState({currentAddress: result.fullAddress})
            })
        }else{
            this.setState({currentAddressError: 'Can not find your location. Please check your GPS is on!'})
        }
    }
    
    handleAddressInput = async address => {
        this.setState({ showModalDropdown: true, address });
        try {
            if (address.length > 0) {
                const addressSuggestions = await DataUtil.getAutocompleteResult(address);
                var addressSugessts = [];
                // addressSuggestions.map(addressSuggest=>{
                //     addressSugessts.push(addressSuggest.description);
                // })
                this.setState({ addressSuggestions });
                //console.log(JSON.stringify(addressSuggestions));
            }
        }catch(e){
            console.log(e);
        }
    };

    handleAddressSelect(label, idx){
        this.setState({
            showModalDropdown:false,
            address:label
        })
        this.search.blur();
    }

    renderCurrentLocation(){
        return(
            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', marginTop:10, padding:10}}
            onPress={()=>{
                this.setState({address:this.state.currentAddress});
                this.search.blur();
            }}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <FontAwesomeIcon name={'map-marker'} size={25} style={{color:'#f2a59d'}}/>
                </View>
                <View style={{flex:7, justifyContent:'space-around'}}>
                    <Text style={{fontWeight:'bold', color:'#999'}}>
                        Current location:
                    </Text>
                    <Text style={{fontSize:16, color:'#555'}}>
                        {this.state.currentAddress}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderCurrentLocationError(){
        return(
            <View style={{flexDirection:'row', backgroundColor:'#fff', marginTop:10, padding:10}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <FontAwesomeIcon name={'map-marker'} size={25} style={{color:'#f2a59d'}}/>
                </View>
                <View style={{flex:7, justifyContent:'space-around'}}>
                    <Text style={{fontWeight:'bold', color:'#999'}}>
                        Current location:
                    </Text>
                    <Text style={{fontSize:16, color:'#555'}}>
                        {this.state.currentAddressError}
                    </Text>
                </View>
            </View>
        )
    }

    _handleSubmit(){
        this.props._getAddress(this.state.address)
        Actions.pop()
    }

  render() {
    //console.log(JSON.stringify(this.state.addressSugessts));

    return (
      <SafeAreaView style={{flex:1, paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0, backgroundColor:'#fff'}}>
        {/*<Hoshi
        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}
        borderColor={'#b76c94'}
        onChangeText={this.handleAddressInput}
        />*/}
        <View style={{height:50, flexDirection:'row', alignItems:'center', backgroundColor:'#fff'}}>
        <View style={{flex:1, paddingLeft:20}}>
            <TouchableOpacity onPress={()=>{Actions.pop()}}>
                <FeatherIcon name='arrow-left' size={28} />
            </TouchableOpacity>
        </View>
        <View style={{flex:3, alignItems:'center'}}>
            <Text style={{fontSize:18}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}</Text>
        </View>
        <View style={{flex:1, paddingRight:20, alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=>{this._handleSubmit()}}>
                <FeatherIcon name='check-circle' size={28} />
            </TouchableOpacity>
        </View>
        </View>
        <View style={{height:51, flexDirection:'row', backgroundColor:'#fff', alignItems:'center', paddingRight:10}}>
            <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'map-marker'}
            iconColor={'white'}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={'#f2a59d'}
            inputStyle={{ color: '#464949' }}
            onChangeText={this.handleAddressInput}
            value={this.state.address}
            ref={search => this.search = search}
            multiline={Platform.OS==='android'?true:false}
            inputStyle={{fontSize:16}}
            />
            {
                this.state.address !== ''?
                <TouchableWithoutFeedback onPress={()=>{this.setState({address:'', }); this.search.blur()}}>
                    <Ionicons name={'ios-close-circle'} size={25} style={{color:'#f2a59d'}}/>
                </TouchableWithoutFeedback>:null
            }

        </View>


        {this.state.showModalDropdown && this.state.address !== '' ?
            <ModalDropdown
              labels={this.state.addressSuggestions.map(
                suggestion => suggestion.description
              )}
              handlePress={this.handleAddressSelect.bind(this)}
            />
            :this.state.currentAddress?
            this.renderCurrentLocation():this.renderCurrentLocationError()
        }

        
      </SafeAreaView>
    )
  }
}

  function mapStateToProps(store){
    return {
        location: store.userStore.location,
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
      saveLocation(location){
        dispatch(saveLocation(location));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddressInputView);
