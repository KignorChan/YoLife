// configureStore.js

import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native' // defaults to localStorage for web and AsyncStorage for react-native
import reducers from '../reducers'

const logger = store => next => action => {
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

let middlewares = [
	logger,
	thunk
];

const persistConfig = {
  key: 'yolife',
  storage: AsyncStorage
}

let createAppStore = applyMiddleware(...middlewares)(createStore);

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore = () => {
  let store = createAppStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}