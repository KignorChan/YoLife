'use strict';

import { AlertIOS } from 'react-native';
import * as TYPES from './types';

// fake user data
let testUser = {
	'name': 'juju',
	'age': '24',
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460'
};

// for skip user 
let skipUser = {
	'name': 'guest',
	'age': 20,
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
};

// login
export function logIn(opt){
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		let url = 'http://192.168.0.10:8080/yolife/users/usersList.html';
		let params = 'email='+opt.name
		let inner_get = fetch(url,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: params,
		    })
			.then((response)=>{
				if (response.ok) {
					console.log('response');
					console.log(response);
					return response.json();
				}
			}).then((resJson)=>{
				console.log('resJson');
				console.log(resJson);
				dispatch({'type': TYPES.LOGGED_IN, user: resJson.rows[0]});
			}).catch((e)=>{
				console.log(e);
				AlertIOS.alert(e.message);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}



// skip login
export function skipLogin(){
	return {
		'type': TYPES.LOGGED_IN,
		'user': skipUser,
	}
}


// logout
export function logOut(){
	return {
		'type': TYPES.LOGGED_OUT
	}
}