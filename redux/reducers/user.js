'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	isLoggedIn: false,
	user: {},
	account:{},
	status: null,
	location:{}
};

export default function user(state=initialState, action){

	switch(action.type){
		case TYPES.LOGGED_DOING:
			return {
				...state,
				status: 'doing'
			};

		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: 'error'
			};
		case TYPES.SAVE_ACCOUNT:
			return {
				...state,
				account:action.account,
				status: 'done'
			};
		case TYPES.SAVE_LOCATION:
			return {
				...state,
				location:action.location,
				status: 'done'
			};
		case TYPES.SAVE_USER:
			return {
				...state,
				user:action.user,
				status: 'done'
			};

		default: 
			return state;
	}

}