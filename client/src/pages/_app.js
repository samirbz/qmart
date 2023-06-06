import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Nav from '@/components/Nav';
import { StyledEngineProvider } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <Nav />
          <Component {...pageProps} />
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  )
}
