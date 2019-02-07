import { Dimensions } from 'react-native';
import React from 'react';
import firebase from 'firebase';
import { CONSTANT_API } from '../constants/Constants';
import * as _ from 'lodash';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default class DataUtil{

    static parseTimeStamp(timestamp){
        date = new Date(timestamp);
        datevalues = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];
        var formattedTime = datevalues[0]+'/'+datevalues[1]+'/'+datevalues[2]+' '+datevalues[3]+':'+datevalues[4]+':'+datevalues[5];

        return formattedTime;
    }

    static check_email_format(email){
        var reg = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/;
        if(email != '')
        {
            if(reg.test(email))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

    static check_phone_format(phoneNumber){
        var reg = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        if(phoneNumber != '')
        {
            if(reg.test(phoneNumber))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

    static async uploadPhoto(uri, uid) {
        return new Promise(async function(resolve, reject){
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                  console.log(e);
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
              });
            
              const ref = firebase
                .storage()
                .ref()
                .child('/images/avatar/'+uid+'.jpg');
              let snapshot = await ref.put(blob);
              let url = await snapshot.ref.getDownloadURL();
              // We're done with the blob, close and release it
              blob.close();
            
              return resolve(url);
        })
      }

      static getAutocompleteResult(address) {
        return new Promise((resolve, reject) => {
          const addressParameter = `input=${_.replace(
            address,
            new RegExp(' ', 'g'),
            '+'
          )}`;
          const apiParameter = `&key=${CONSTANT_API.GOOGLE_PLACES_API_KEY}`;
        //   const countryLimitParameter = '&components=country:us|country:ca';
          const countryLimitParameter = '&components=country:ca';
          const sessionTokenParameter = `&sessiontoken=1234567890`;
          axios
            .get(
              `https://maps.googleapis.com/maps/api/place/autocomplete/json?${addressParameter}${apiParameter}${countryLimitParameter}${sessionTokenParameter}`
            )
            .then(responseJson => {
              if (responseJson.status == 'ZERO RESULTS') {
                reject('Invalid address');
              } else {
                resolve(responseJson.data.predictions);
              }
            })
            .catch(e => reject(e));
        });
      }

      static getAddressFromCoord(lat, lon) {
        return new Promise((resolve, reject) => {
          const latLonParameter = `latlng=${lat},${lon}`;
          const apiParameter = `&key=${CONSTANT_API.GOOGLE_GEOCODE_API_KEY}`;
          const filterParameter = `&result_type=street_address`;
      
          axios
            .get(
              'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&key='+CONSTANT_API.GOOGLE_GEOCODE_API_KEY
            )
            .then(responseJson => {              
              if (responseJson.status == 'ZERO RESULTS') {
                reject('Invalid address');
              } else {
                const selectedAddress = responseJson.data.results[0];
                const latDelta = Math.abs(
                  selectedAddress.geometry.viewport.northeast.lat -
                    selectedAddress.geometry.viewport.southwest.lat
                );
                const lngDelta = latDelta * ASPECT_RATIO;
                // const fullAddress = selectedAddress.formatted_address.substring(
                //   0,
                //   selectedAddress.formatted_address.indexOf(',')
                // );
                const fullAddress = selectedAddress.formatted_address;
                const additionalAddressInfo = selectedAddress.formatted_address.substring(
                  selectedAddress.formatted_address.indexOf(',') + 1
                );
                const addressDetails = {
                  markerPosition: {
                    latitude: selectedAddress.geometry.location.lat,
                    longitude: selectedAddress.geometry.location.lng,
                  },
                  fullAddress,
                  latitudeDelta: latDelta,
                  longitudeDelta: lngDelta,
                  additionalAddressInfo,
                };
                resolve(addressDetails);
              }
            })
            .catch(e => {
              console.log("errorAAA"+JSON.stringify(e));
      
              reject(e);
            });
        });
      }
}