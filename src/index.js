import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { SeatProvider } from "./components/SeatContext";
import { BookingProvider } from "./components/BookingContext";

const rootElement = document.getElementById('root');

ReactDOM.render(
    <SeatProvider>
        <BookingProvider>
            <App />
        </BookingProvider>
    </SeatProvider>, rootElement);
