import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SpeechProvider } from '@speechly/react-client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SpeechProvider appId="94a4c73e-fa1a-4bc4-80d3-8dcf6fc175de" language="en-US"><App /></SpeechProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
