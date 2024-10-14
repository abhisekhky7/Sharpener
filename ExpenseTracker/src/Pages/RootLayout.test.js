import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]); 


beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    const portalRoot = document.getElementById('portal');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

describe('HomePage Component', () => {
    
  test('shows login prompt when user is not logged in', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: false,
        token: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
        <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Please Login First')).toBeInTheDocument();
  });

  test('shows homepage content when user is logged in', () => {
    const store = mockStore({
      auth: {
        isLoggedIn: true,
        token: 'fake-token',
      },
    });

    render(
        <Provider store={store}>
        <MemoryRouter>
        <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Add Expense')).toBeInTheDocument();
  });
});
