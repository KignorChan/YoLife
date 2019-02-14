'use strict';

import * as TYPES from '../actions/types';
import { LANGUAGES } from '../../constants/Languages';

const initialState = {
    language: LANGUAGES.ENGLISH
}

export default function setting(state=initialState, action){
    switch(action.type){
        case TYPES.LANGUAGE_SETTING:
        return {
            ...state,
            language: action.language
        }

        default: 
            return state;
    }
}