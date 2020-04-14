import React, { useContext } from 'react';
import styled from "styled-components";
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import seatsSrc from "../assets/seat-available.svg";
import { BookingContext } from "./BookingContext";

function Seat({ isBooked, price, rowName, seatIndex, seatId }) {

    const {actions: {beginBookingProcess}} = useContext(BookingContext);

    return (
        <Tippy content={`Row: ${rowName} Seat: ${seatIndex + 1} Price: ${price}$`} enabled={!isBooked}>
            <StyledButton
                disabled={isBooked}
                onClick={() => {
                    beginBookingProcess({price: price, status: "seat-selected", selectedSeatId: seatId})
                }} >
                    <img src={seatsSrc} alt="seats" style={{filter: isBooked && "grayscale(100%)"}}/>
            </StyledButton>
        </Tippy>
    )
}

export default Seat;

const StyledButton = styled.button `
    border: transparent;
    outline: none;
`