import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import App from '../App';
import Wrapper from '../mockStore';

test('renders home app', () => {
  render(<App />, { wrapper: Wrapper });

  expect(screen.getByAltText('task-list-icon')).toBeInTheDocument();
});
