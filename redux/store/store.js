// configureStore.js

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native' // defaults to localStorage for web and AsyncStorage for react-native

import reducers from '../reducers'

const persistConfig = {
  key: 'yolife',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore = () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}