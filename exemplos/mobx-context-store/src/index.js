import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CarsScene from "./cars/CarsScene";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/cars" element={<CarsScene/>}/>
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
