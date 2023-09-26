import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { getAllTicket, selectAllTickets } from './slices/ticketSlice';
import TicketList from './components/TicketList';
import FooterBtn from './components/FooterBtn';
import './App.css';
import useRandomTicket from './hooks/useRandomTicket';

function App() {
  const dispatch = useDispatch();
  const tickets = useSelector(selectAllTickets);

  const { generateRandomTicket } = useRandomTicket();

  const dispatchAllTickets = useCallback(
    () => dispatch(getAllTicket() as any),
    [dispatch],
  );

  useEffect(() => {
    dispatchAllTickets();
  }, [dispatchAllTickets]);

  return (
    <>
      <Box
        sx={{
          bgcolor: '#fff',
          height: '100vh',
          overflowY: 'scroll',
          border: '1px solid #ddd',
          padding: '10px 20px',
          margin: '5px',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                border: '1px solid #b0e0f6',
                padding: '6px 8px',
                borderRadius: '8px',
                opacity: '.8',
              }}
            >
              <img src="task-list-icon.svg" alt="task-list-icon" />
            </Box>
            <Typography>Timeline</Typography>
          </Stack>
          <TicketList tickets={tickets} />
        </Box>

        <FooterBtn generateRandomTicket={generateRandomTicket} />
      </Box>
    </>
  );
}

export default App;
