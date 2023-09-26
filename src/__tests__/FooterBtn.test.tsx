import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FooterBtn from '../components/FooterBtn';
import Wrapper from '../mockStore';

describe('Footer Button', () => {
  const generateRandomTicket = jest.fn();

  render(<FooterBtn generateRandomTicket={generateRandomTicket} />, {
    wrapper: Wrapper,
  });

  const showFormBtn = screen.getByTestId('show-form');

  it('should render a form after button is clicked and fire change event as user types in', async () => {
    userEvent.click(showFormBtn);

    const createFormElement = await screen.findByTestId('form');

    expect(createFormElement).toBeInTheDocument();

    const client = await screen.findByLabelText('Client');
    const issue = await screen.findByLabelText('Issue');

    fireEvent.change(client, { target: { value: 'TEST' } });
    expect(client).toHaveValue('TEST');

    fireEvent.change(issue, { target: { value: 'A new issue' } });
    expect(issue).toHaveValue('A new issue');
  });
});
