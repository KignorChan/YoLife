
import { combineReducers } from 'redux';
import userReducer from './user';
import settingReducer from './setting';

export default combineReducers({
	userStore: userReducer,
	setting: settingReducer,
});
