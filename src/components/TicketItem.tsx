import React, { FC, useEffect, useState } from 'react';
import { Box, Stack } from '@mui/system';
import moment from 'moment';
import Switch from '@mui/material/Switch';
import { green, red, yellow } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { editTicket, getAllTicket } from '../slices/ticketSlice';
import { formatTime } from '../utils/convert-date';

interface TicketItemProps {
  client: string;
  issue: string;
  status: string;
  deadline: string;
  _id: string;
  index: number;
}

const Slider = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));

const TicketItem: FC<TicketItemProps> = ({
  client,
  issue,
  status,
  deadline,
  index,
  _id,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const today = moment().format();

  const [checked, setChecked] = useState(true);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    let ticket = {
      _id,
      client,
      issue,
      status: event.target.checked ? 'open' : 'closed',
      deadline: moment(deadline).format('YYYY-MM-DD'),
    };
    const result = await dispatch(editTicket(ticket) as any);
    if (result.payload.success) {
      enqueueSnackbar(result.payload.message, { variant: 'success' });
    }

    await dispatch(getAllTicket() as any);
  };

  const checkStatusColor = () => {
    if (status === 'open' && today > deadline) {
      return 'red';
    } else if (status === 'open' && today < deadline) {
      return 'yellow';
    } else if (status === 'closed') {
      return 'green';
    }
  };

  useEffect(() => {
    if (status === 'open') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [status]);

  const renderColor = () => {
    if (checkStatusColor() === 'green') {
      return green[600];
    } else if (checkStatusColor() === 'yellow') {
      return yellow[600];
    } else if (checkStatusColor() === 'red') {
      return red[600];
    }
  };

  return (
    <Box
      sx={{
        margin: '15px 0px',
        width: '550px',
        height: 'auto',
        padding: '10px',
        borderRadius: '10px',
        background: '#b0e0f6',
      }}
    >
      <Stack direction="column" spacing={2}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ flex: '1' }}>
            {index + 1}. &nbsp; {client.toUpperCase()}
          </Box>
          <Box sx={{ flex: '1' }}>{formatTime(deadline)}</Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: '1',
              justifyContent: 'flex-end',
            }}
          >
            <Slider
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                transform: 'rotate(180deg)',
              }}
            />
            <Box
              sx={{
                height: '20px',
                width: '20px',
                border: `2px solid ${renderColor()}`,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  height: '13px',
                  width: '13px',
                  background: `${renderColor()}`,
                  borderRadius: '50%',
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: '#fff',
            borderRadius: '10px',
            padding: '10px 15px',
            color: '#aaa',
            fontWeight: 'bold',
            opacity: '.8',
            height: '70px',
            overflow: 'scroll',
          }}
        >
          {issue}
        </Box>
      </Stack>
    </Box>
  );
};

export default TicketItem;
