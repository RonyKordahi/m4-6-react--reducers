import React, { useContext } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import { SeatContext } from "./SeatContext";
import Seat from "./Seat";
import PurchaseModal from "./PurchaseModal";

const TicketWidget = () => {

  const {state: {numOfRows, seatsPerRow, hasLoaded, seats}} = useContext(SeatContext);
  
  return (<>
    {!hasLoaded ? <CircularProgress color="secondary" /> : 
    
    <Wrapper>
      <PurchaseModal />
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const { price, isBooked } = seats[seatId];

              return (
                <SeatWrapper key={seatId}>
                  <Seat isBooked={isBooked} rowName={rowName} seatIndex={seatIndex} price={price} seatId={seatId} />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>}
    </>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  margin: auto;
`;

export default TicketWidget;