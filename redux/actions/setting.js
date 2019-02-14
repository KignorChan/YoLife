'use strict';

import { AlertIOS } from 'react-native';
import * as TYPES from './types';


export function languageSetting(language){
	return {
		'type': TYPES.LANGUAGE_SETTING,
		'language': language
	}
}