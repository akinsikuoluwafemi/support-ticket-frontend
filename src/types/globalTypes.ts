export enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}

export interface ITicket {
  client: string;
  issue: string;
  status: Status | string;
  deadline: string;
  _id: string;
}
