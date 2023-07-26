import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import setupStore from './redux/store';

const store = setupStore();

// const initialState = {

//   user: {
//     loading: false,

//   },
// };

describe('Navbar', () => {
  test('renders all navigation links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    const linkTexts = ['doctors', 'Appointments form', 'My appointments', 'Add doctor', 'Delete doctor', 'Register'];

    linkTexts.forEach((text) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
    });
  });

  test('calls logoutAsync and navigates to "/" when logout button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    const logoutButton = screen.getByText('logout');
    fireEvent.click(logoutButton);

    const status = store.getState().user.isAuthenticated;
    expect(status).toBeFalsy();
  });
});
