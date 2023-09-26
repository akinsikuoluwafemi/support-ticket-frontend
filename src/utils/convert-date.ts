import moment from 'moment';

export const getRandDate = () => {
  //between -2 to +2
  const randomNumber = Math.floor(Math.random() * 5) - 2;
  // Add the random offset to the current date
  const randomDate = moment().add(randomNumber, 'days').format('YYYY-MM-DD');
  return randomDate;
};

export const formatTime = (dateString: string) => {
  return moment(dateString).format('DD/MM/YYYY');
};
