import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Hideo, Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { } from '../redux/actions/user';

import DeviceSetting from '../utils/DeviceSetting';
import DataUtil from  '../utils/DataUtil';
import ModalDropdown from './common/ModalDropdown';


class AddressInputView extends Component {

    constructor(props){
        super(props);

        this.state = {
            addressSuggestions:[],
            searching:false,
            showModalDropdown:false,
            addressSugessts:[],
            address:''
        }
    }

    componentDidMount(){
        console.log('AAAA'+JSON.stringify(this.props.location))
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
        //console.log(label);
        this.setState({
            showModalDropdown:false,
            address:label
        })
    }

    renderCurrentLocation(){
        return(
            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#fff', marginTop:10, padding:10}}
            onPress={()=>alert('pressed!')}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <FontAwesomeIcon name={'map-marker'} size={25} style={{color:'#f2a59d'}}/>
                </View>
                <View style={{flex:7, justifyContent:'space-around'}}>
                    <Text style={{fontWeight:'bold', color:'#999'}}>
                        Current location:
                    </Text>
                    <Text style={{fontSize:18}}>
                        115 Omni drive
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

  render() {
    //console.log(JSON.stringify(this.state.addressSugessts));

    return (
      <View style={{flex:1}}>
        {/*<Hoshi
        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}
        borderColor={'#b76c94'}
        onChangeText={this.handleAddressInput}
        />*/}
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
            :this.renderCurrentLocation()
        }

        
      </View>
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
