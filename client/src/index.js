import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
    </Provider>
   </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
);

// root.render(
//   // <ThemeProvider theme={theme}>
//   // <CssBaseline />
//   <PersistGate persistor={persistor}>
//     <Provider store={store}>
//     <BrowserRouter>
//       <App />
//       <ToastContainer />
//     </BrowserRouter>
//     </Provider>
//    </PersistGate>
//   //  </ThemeProvider> 
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
