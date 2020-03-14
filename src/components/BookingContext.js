import React, { useReducer } from 'react'

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null
}

function reducer(state, action) {
    switch (action.type) {
        case "begin-booking-process": {
            return {
                ...state,
                status: action.status,
                price: action.price,
                selectedSeatId: action.selectedSeatId
            }
        }

        case "cancel-booking-process": {
            return initialState;
        }
        
        case "purchase-ticket-request": {
            return {
                ...state,
                status: action.status
            }
        }

        case "purchase-ticket-failure": {
            return {
                ...state,
                status: action.status,
                error: action.error
            }
        }

        case "purchase-ticket-success": {
            return {
                ...initialState,
                status: action.status
            }
        }

        default:
            throw new Error("Unauthorized action!");
            break;
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const beginBookingProcess = data => {
        dispatch ({
            type: "begin-booking-process",
            ...data
        });
    };

    const cancelBookingProcess = data => {
        dispatch ({
            type: "cancel-booking-process",
            ...data
        });
    };

    const purchaseTicketRequest = data => {
        dispatch ({
            type: "purchase-ticket-request",
            ...data
        });
    };

    const purchaseTicketFailure = data => {
        dispatch ({
            type: "purchase-ticket-failure",
            ...data
        });
    };

    const purchaseTicketSuccess = data => {
        dispatch ({
            type: "purchase-ticket-success",
            ...data
        });
    };

    return (
        <BookingContext.Provider value={{state, 
            actions: {beginBookingProcess, 
                cancelBookingProcess, 
                purchaseTicketRequest,
                purchaseTicketFailure,
                purchaseTicketSuccess
                }}}>
            {children}
        </BookingContext.Provider>
    )
};

export default BookingContext;