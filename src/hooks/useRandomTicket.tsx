import { faker } from '@faker-js/faker';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import {
  createTicket,
  getAllTicket,
  setTicketLoading,
} from '../slices/ticketSlice';
import { getRandDate } from '../utils/convert-date';

const useRandomTicket = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const generateRandomTicket = async () => {
    try {
      const randomDate = getRandDate();

      const ticket = {
        client: faker.company.name().split(',')[0],
        issue: faker.word.words({ count: { min: 5, max: 12 } }),
        date: randomDate,
      };
      dispatch(setTicketLoading(true) as any);
      const result = ticket && (await dispatch(createTicket(ticket) as any));

      if (result.payload.success) {
        enqueueSnackbar(result.payload.message, { variant: 'success' });
      }
      await dispatch(getAllTicket() as any);
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: 'error' });
    } finally {
      dispatch(setTicketLoading(false) as any);
    }
  };

  return {
    generateRandomTicket,
  };
};

export default useRandomTicket;
