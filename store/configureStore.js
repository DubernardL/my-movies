import { createStore } from 'redux';
import toggleFavorite from './reducers/favoritesReducer'
import toggleSeen from './reducers/seenReducer'
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, toggleSeen}))
