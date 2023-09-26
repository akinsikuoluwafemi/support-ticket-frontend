import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Calendar from 'react-calendar';
import moment from 'moment';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';

import Modal from '@mui/material/Modal';
import {
  createTicket,
  getAllTicket,
  setTicketLoading,
} from '../slices/ticketSlice';
import { validationSchema } from '../utils/validators';

import { debounce } from '../utils/debounce';

const FooterBtn = ({
  generateRandomTicket,
}: {
  generateRandomTicket: () => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deadLine, setDeadline] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: { issue: string; client: string }) => {
    try {
      const twoDaysAgo = moment().subtract(3, 'days').toDate();
      const date = moment(deadLine).format('YYYY-MM-DD');
      if (deadLine < twoDaysAgo) {
        alert('Deadline must be at least 2 days in the past');
        return;
      }
      const ticket = {
        client: data.client,
        issue: data.issue,
        date,
      };
      dispatch(setTicketLoading(true) as any);

      const result = await dispatch(createTicket(ticket) as any);
      if (result.payload.success) {
        enqueueSnackbar(result.payload.message, { variant: 'success' });
      }

      await dispatch(getAllTicket() as any);

      reset();
      setDeadline(new Date());
      handleClose();
    } catch (error: any) {
      // use toast here
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      dispatch(setTicketLoading(false) as any);
    }
  };

  let debouncedGenerateRandTicket = debounce(generateRandomTicket, 1000);

  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
      }}
      direction="row"
      spacing={2}
    >
      <Button
        data-testid="rand-ticket-btn"
        onClick={debouncedGenerateRandTicket}
        variant="contained"
      >
        Create Randomly &nbsp; &nbsp;{' '}
        <span style={{ fontSize: '20px' }}>&gt;</span>
      </Button>

      <Button onClick={handleOpen} variant="contained" data-testid="show-form">
        Create New &nbsp; &nbsp; <span style={{ fontSize: '20px' }}>&gt;</span>
      </Button>

      {/*  */}

      <Modal
        data-testid="form"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            sx={{
              mb: '30px',
            }}
            fullWidth
            id="outlined-basic"
            label="Client"
            error={errors.client as undefined}
            variant="outlined"
            placeholder="Client name"
            helperText={errors && errors?.client?.message}
            {...register('client')}
          />

          <TextField
            sx={{
              mb: '30px',
            }}
            error={errors.issue as undefined}
            fullWidth
            {...register('issue')}
            id="outlined-multiline-static"
            label="Issue"
            multiline
            helperText={errors && errors?.issue?.message}
            rows={4}
            placeholder="Enter an Issue"
          />
          <Typography
            sx={{
              mb: '20px',
            }}
          >
            Set Deadline :{' '}
          </Typography>

          <Calendar
            onClickDay={(e) => {
              setDeadline(e);
            }}
            onChange={() => setDeadline}
            value={deadLine}
            data-testid="deadline"
          />
          <Button
            sx={{
              mt: '20px',
              textAlign: 'right',
            }}
            variant="contained"
            color="success"
            type="submit"
            data-testid="submit"
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/*  */}
    </Stack>
  );
};

export default FooterBtn;
