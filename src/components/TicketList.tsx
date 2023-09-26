import { ITicket } from '../types/globalTypes';
import TicketItem from './TicketItem';

const TicketList = ({ tickets }: { tickets: ITicket[] }) => {
  return (
    <div>
      {tickets.map((ticket, _i) => {
        return <TicketItem key={ticket._id} {...ticket} index={_i} />;
      })}
    </div>
  );
};

export default TicketList;
