import React, { useReducer } from "react";

export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0
}

function reducer(state, action) {
    switch (action.type) {
        case "receive-seat-info-from-server": {
            return {
                ...state,
                hasLoaded: true,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
                seats: action.seats
            }
        }

        case "mark-seat-as-purchased": {
            return {
                ...state,
                seats: {
                    ...state.seats,
                    [action.seatId]: {...state.seats[action.seatId], isBooked: true}
                }
            }
        }

        default: 
        throw new Error("Unauthorized action!");
    }
}

export const SeatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = data => {
        dispatch({
            type: 'receive-seat-info-from-server',
            ...data
        });
    };

    const markSeatAsPurchased = data => {
        dispatch({
            type: "mark-seat-as-purchased",
            ...data
        });
    };

    return (
        <SeatContext.Provider 
        value={{ state, 
        actions: {receiveSeatInfoFromServer, markSeatAsPurchased}}}>
            {children}
        </SeatContext.Provider>
    );
};