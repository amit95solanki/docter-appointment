import ReactDOM from 'react-dom/client';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
// import axios from 'axios';
// ----------------------------------------------------------------------
// import * as _redux from './sections/auth/_redux';

/**
 *
 * @see https://github.com/axios/axios#interceptors
 */

// _redux.setupAxios(
// axios
// , store
// );

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

// If you want to enable client cache, register instead.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
