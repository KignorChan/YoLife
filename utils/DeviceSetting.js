import React from 'react-native';
import { Localization } from 'expo-localization';

import DeviceStorage from './DeviceStorage';
import { LANGUAGES } from '../constants/Languages';
import { Result } from 'expo-background-fetch';


class DeviceSetting{
    //Default setting for app
    static setting = {
        APP_LANGUAGE: "ENGLISH",
        APP_LANGUAGE_PACKAGE: LANGUAGES.ENGLISH,
    }

    /**
     * @param language: enum[CHINESE, ENGLISH]
     */
    static setAppLanguage(languang){
        this.getPreSetAppLanguage().then(result=>{
            if(result){
                this.updateAppLanguage(languang);
            }else{
                DeviceStorage.save("APP_LANGUAGE", languang);
            }
        })

        switch(languang){
            case "CHINESE":
                this.setting.APP_LANGUAGE_PACKAGE = LANGUAGES.CHINESE;
                break;
            case "ENGLISH":
                this.setting.APP_LANGUAGE_PACKAGE = LANGUAGES.ENGLISH;
                break;
            default:
                this.setting.APP_LANGUAGE_PACKAGE = LANGUAGES.ENGLISH;
        }
    }

    /**
     * @returns Previous setting of language in Json
     */
    static getPreSetAppLanguage(){
        return DeviceStorage.get("APP_LANGUAGE");
    }

    /**
     * @param language: enum[CHINESE, ENGLISH]
     * @@returns {Promise<T>|Promise.<TResult>}
     */
    static updateAppLanguage(languang){
        return DeviceStorage.update("APP_LANGUAGE", languang);
    }

    /**
     * TODO: prepare app's language to use
     */
    static setLanguagePackage(){
        return new Promise((resolve, reject)=>{
            this.getPreSetAppLanguage().then(result=>{
                if(result==="CHINESE"){
                    this.setting.APP_LANGUAGE_PACKAGE = LANGUAGES.CHINESE;
                }else if(result==="ENGLISH"){
                    this.setting.APP_LANGUAGE_PACKAGE = LANGUAGES.ENGLISH;
                }else{
                    this.setting.APP_LANGUAGE_PACKAGE = LANGUAGES.ENGLISH;
                }
                return resolve('complete');
            })
        })
    }
}

export default DeviceSetting;