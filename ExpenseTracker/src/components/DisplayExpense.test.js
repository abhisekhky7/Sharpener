import { render, screen } from '@testing-library/react';
import DisplayExpense from '../components/DisplayExpense';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('DisplayExpense', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        expenses: [
          { id: '1', amount: '100', desc: 'Food', category: 'Food', fireId: 'fire1' }
        ],
        totalAmount: 100,
      },
    });
  });

  test('renders expenses list', () => {
    render(
      <Provider store={store}>
        <DisplayExpense />
      </Provider>
    );

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('100rs')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });
});
