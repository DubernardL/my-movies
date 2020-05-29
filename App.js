import * as React from 'react';
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Store from './store/configureStore'
import { persistStore } from 'redux-persist'

export default function App() {
  let persistor = persistStore(Store)
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
