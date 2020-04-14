import React, { useContext, useEffect } from 'react';

import GlobalStyle from './GlobalStyles';
import TicketWidget from "./TicketWidget";
import { SeatContext } from "./SeatContext";

function App() {
  const {state: {numOfRows}, actions: { receiveSeatInfoFromServer }} = useContext(SeatContext);
  
  useEffect(() => {
    fetch("/api/seat-availability")
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data))
  },[]);

  return (
    <>
      <GlobalStyle />
      <TicketWidget />
      This venue has {numOfRows} rows!
    </>
  );
}

export default App;