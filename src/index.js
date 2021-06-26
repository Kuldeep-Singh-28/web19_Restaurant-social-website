import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './HotelX/Auth'
import Hotel from './HotelX/Hotel'
import HomePageCorusel from './HotelX/HomePageCorusel'
ReactDOM.render(
  <React.StrictMode>
    <Hotel/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
