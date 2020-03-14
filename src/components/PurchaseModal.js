import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/TableRow';
import styled from "styled-components";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

function PurchaseModal() {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [creditCard, setCreditCard] = React.useState('');
    const [expiration, setExpiration] = React.useState('');

    let selectedSeat;
    let rowName;
    let seatNumber;

    const {actions: {markSeatAsPurchased}} = useContext(SeatContext);

    const {state: {price, selectedSeatId, error, status}, 
    actions: {cancelBookingProcess, 
        purchaseTicketRequest,
        purchaseTicketFailure,
        purchaseTicketSuccess}} = useContext(BookingContext);
        
    const handleClose = () => {
        cancelBookingProcess();
    };

    if(selectedSeatId){
        selectedSeat = selectedSeatId.split("-");
        rowName = selectedSeat[0];
        seatNumber = selectedSeat[1];
    };
    
    return (
        <div>
            <StyledDialog open={selectedSeatId !== null}>
                <h1>Purchase Ticket</h1>
                <p>You are purchasing 1 ticket for the price of {price}$.</p>
                <StyledTable>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Row</TableCell>
                                <TableCell>Seat</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{rowName}</TableCell>
                                <TableCell>{seatNumber}</TableCell>
                                <TableCell>${price}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </StyledTable>
                <StyledDiv>
                    <form label="purchase" 
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                        <StyledInput type="text" placeholder="Credit Card" name="credit card" 
                        onChange={(event) => {
                            setCreditCard(event.target.value)
                        }}/>
                        <StyledInput type="text" placeholder="Expiration Date" name="expiration"
                        onChange={(event) => {
                            setExpiration(event.target.value)
                        }}/>
                        <Button variant="contained" color="primary" type="submit"
                        onClick={() => {
                            purchaseTicketRequest({status: "awaiting-response"});

                            const data = {
                                creditCard: creditCard,
                                expiration: expiration,
                                seatId: selectedSeatId
                            }

                            fetch("/api/book-seat", {
                                method: "POST",
                                body: JSON.stringify(data),
                                headers: {
                                    'Accept': 'application/json',
                                    "Content-Type": "application/json"
                                }
                            })
                            .then(res => res.json())
                            .then(data => {
                                if (data.success) {
                                    markSeatAsPurchased({seatId: selectedSeatId});
                                    purchaseTicketSuccess({status: "purchased"});
                                }
                                else {
                                    purchaseTicketFailure({status: "error", error: data.message});
                                }
                            })
                        }}>
                            Purchase
                            </Button>
                    </form>
                    <StyledParagraph>{error}</StyledParagraph>
                </StyledDiv>
                <Button onClick={() => handleClose()}>Close</Button>
            </StyledDialog>
            <Snackbar open={status === "purchased"}>
                <Alert severity="success">
                    <StyledSnack>
                        Successfully purchased ticket! Enjoy the show.
                        <Button
                        style={{
                        backgroundColor: '#4CAF50',
                        color: "white", 
                        padding: "0px"}}
                        type="submit"
                        onClick={() => handleClose()}>
                            X
                        </Button>
                    </StyledSnack>
                </Alert>
            </Snackbar>
        </div>
    );
};

const StyledSnack = styled.div `
    display: flex;
`

const StyledDialog = styled(Dialog) `
    background-color: transparent;
    text-align: center;
    color: black;
    margin: auto;
`;

const StyledTable = styled.div `
    margin: auto;
`

const StyledDiv = styled.div `
    margin-top: 15px;
    background-color: lightgray;
    padding: 20px;
    border: none;
`

const StyledInput = styled.input `
    border-radius: 5px;
    border: 1px solid black;
    margin: 5px 10px;
    padding: 15px 20px;
`;

const StyledParagraph = styled.p `
    color: crimson;
    margin-top: 10px;
`

export default PurchaseModal;