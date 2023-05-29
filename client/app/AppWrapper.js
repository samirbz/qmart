// src/components/foo-page-wrapper-something.js
'use client';

import { Provider } from 'react-redux';

import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Nav from './components/Nav';

export const AppWrapper = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Nav />
                {children}
            </PersistGate>
        </Provider>
    );
};
